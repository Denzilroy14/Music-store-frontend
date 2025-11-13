import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    product_desc: "",
    product_rate: "",
    product_qty: "",
    category:''
  });

  const [product_img, setProductImg] = useState(null);
  const [message, setMessage] = useState("");

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file input
  const handleFileChange = (e) => {
    setProductImg(e.target.files[0]);
  };

  // Submit form data to Flask backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product_img) {
      setMessage("Please upload a product image!");
      return;
    }

    // Prepare FormData for multipart/form-data request
    const form = new FormData();
    form.append("product_name", formData.product_name);
    form.append("product_desc", formData.product_desc);
    form.append("product_rate", formData.product_rate);
    form.append("product_qty", formData.product_qty);
    form.append("product_img", product_img);
    form.append("category", formData.category);

    try {
      const response = await axios.post("http://localhost:5000/add_products", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message);
      setFormData({
        product_name: "",
        product_desc: "",
        product_rate: "",
        product_qty: "",
        category:""
      });
      setProductImg(null);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Error adding product. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          required
        />

        <label>Product Description:</label>
        <textarea
          name="product_desc"
          value={formData.product_desc}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="product_rate"
          value={formData.product_rate}
          onChange={handleChange}
          required
        />

        <label>Quantity:</label>
        <input
          type="number"
          name="product_qty"
          value={formData.product_qty}
          onChange={handleChange}
          required
        />
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label>Product Image:</label>
        <input
          type="file"
          name="product_img"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Admin;