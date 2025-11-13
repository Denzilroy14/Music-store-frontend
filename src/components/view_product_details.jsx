import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { prod_id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const navigate= useNavigate(); // For redirection
  const isLoggedIn = localStorage.getItem('token'); // Check if user is logged in

  // Fetch product details and reviews
  useEffect(() => {
    axios
      .get(`http://localhost:5000/view_product_details/${prod_id}`)
      .then((response) => {
        const productData = response.data[0]; // Assuming the response returns an array with one object
        setProduct(productData);
        setReviews(productData.reviews || []);
      })
      .catch((err) => {
        setError('Error fetching product details');
        console.error(err);
      });
  }, [prod_id]);

  // Handle Add to Cart
  const addToCart = () => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      axios
        .post(
          'http://localhost:5000/add_to_cart',
          {
            prod_id: prod_id,
            prod_quan: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the auth token
            },
          }
        )
        .then((response) => {
          alert(response.data.message); // Show success message
        })
        .catch((err) => {
          alert('Error adding product to cart');
          console.error(err);
        });
    }
  };

  if (error) return <div>{error}</div>;

  if (!product) return <div>Loading product details...</div>;

  return (
    <div className="product-details">
      <h1>{product.product_name}</h1>
      <img src={product.prod_img} alt={product.product_name} />
      <p>{product.product_desc}</p>
      <p>Price: ${product.product_amt}</p>
      <p>Stock: {product.product_quan}</p>

      {/* Quantity Input */}
      <input
        type="number"
        value={quantity}
        min="1"
        max={product.product_quan}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={addToCart}>Add to Cart</button>

      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>Rating:</strong> {review.rating}</p>
            <p><strong>Comment:</strong> {review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductDetails;
