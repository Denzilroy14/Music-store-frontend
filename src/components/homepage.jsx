import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';  // Import useHistory for redirection

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const[category,setCategory]=useState([]);
  const [error, setError] = useState(null);
  //const [get_category,setGetCategory]=useState([]);
  const [quantity, setQuantity] = useState(1) // State to track product quantity
  const navigate = useNavigate();  // To navigate 
  // Check if user is logged in by checking localStorage for the auth token
  const [isSideBarVisible,setIsSideBarVisible]=useState(false);
  const isLoggedIn = localStorage.getItem('token');
 // const [isSideBarVisible,setSideBarVisible]=useState(false);
  useEffect(()=>{
    axios.get('https://musicalbackend.pythonanywhere.com/get_category')
    .then((res)=>{
      setCategory(res.data.data);
    })
    .catch((err)=>{
      console.error(err);
    })
  },[]);


  useEffect(() => {
    axios.get('https://musicalbackend.pythonanywhere.com/home')
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => {
        setError('Error fetching products');
        console.error(err);
      });
  }, []);

  //toglle function for sidebar
  const toggleSideBar=()=>setIsSideBarVisible(prev=>!prev);

  // Handle Add to Cart button click
  const addToCart = (productId) => {
    if (!isLoggedIn) {
      // If not logged in, redirect to login page
      navigate('/login');
    } else {
      // If logged in, send a POST request to add the product to the cart
      axios.post('https://musicalbackend.pythonanywhere.com/add_to_cart', {
        prod_id: productId,
        prod_quan: quantity
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`  // Pass the auth token
        }
      })
      .then(response => {
        alert(response.data.message);  // Show success message
      })
      .catch(err => {
        alert('Please login to add product to your cart');
        console.error(err);
      });
    }
  };
  return (
    <div className="product-page">
      <button onClick={toggleSideBar} className='Sidebar-toggle-button'>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
        </button>
        {isSideBarVisible &&<div className="sidebar">
        <h2>Filter by Category</h2>
        {category.length === 0 ? (
          <p>No categories available</p>
        ) : (
            category.map((item) => (
              <div className='Categories'>
                <a href={`/display_by_category/${item}`}>{item}</a>
              </div>
            ))
        )}
      </div>}

      <div className="product-list-container">
        <h1>Product List</h1>
        {error && <p>{error}</p>}
        <div className="product-list">
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map(product => (
              <div key={product.id} className="product-item">
                <img src={product.prod_img_name} alt={product.prodname} />
                <h2>{product.prodname}</h2>
                <p>{product.prod_desc}</p>
                <p>Price: ${product.prod_amt}</p>
                <p>Stock: {product.prod_count}</p>

                {/* Input for product quantity */}
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  max={product.prod_count}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button onClick={() => addToCart(product.id)}>Add to Cart</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;