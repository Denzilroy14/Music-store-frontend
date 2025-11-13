import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GetByCategory = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { category } = useParams();  // Get category from URL

  useEffect(() => {
    // Fetch products based on category
    axios.get(`http://localhost:5000/display_by_category/${category}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => {
        setError('Error fetching products');
        console.error(err);
      });
  }, [category]);  // Refetch if category changes

  return (
    <div>
      <h1>Products in {category} Category</h1>
      {error && <p>{error}</p>}
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available in this category.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.prod_img} alt={product.product_name} />
              <h2>{product.product_name}</h2>
              <p>{product.product_desc}</p>
              <p>Price: ${product.product_amt}</p>
              <p>Stock: {product.product_count}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetByCategory;
