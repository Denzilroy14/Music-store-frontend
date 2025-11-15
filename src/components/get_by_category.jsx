import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate} from 'react-router-dom';

const GetByCategory = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { category } = useParams();  // Get category from URL
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    // Fetch products based on category
    axios.get(`https://musicalbackend.pythonanywhere.com/display_by_category/${category}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => {
        setError('Error fetching products');
        console.error(err);
      });
  }, [category]);  // Refetch if category changes

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
        console.error(err.response.data.message);
        console.error(err);
      });
    }
  };

  return (
    <div>
      <h1>Products in {category} Category</h1>
      {error && <p>{error}</p>}
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          products.map(product => (
            <div key={product.product_id} className="product-item">
              <img src={product.prod_img} alt={product.product_name} />
              <h2>{product.product_name}</h2>
              <p>{product.product_desc}</p>
              <p>Price: ${product.product_amt}</p>
              <p>Stock: {product.product_count}</p>
              <input
                  type="number"
                  value={quantity}
                  min="1"
                  max={product.prod_count}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button onClick={() => addToCart(product.product_id)}>Add to Cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetByCategory;
