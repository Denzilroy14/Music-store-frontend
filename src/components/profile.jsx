import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You are not logged in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.data.length === 0) {
          setError('No items in your cart');
        } else {
          setUserDetails(response.data);
        }
      } catch (err) {
        setError(err.response?.data?.message);
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div><h1>{error}</h1></div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userDetails[0]?.username}'s Profile</h1> {/* Assuming the first item will have the username */}
      <h3>Cart details:</h3>
      <img src={userDetails[0]?.product_img} alt="Product_image"/>
      <h3>Product name:{userDetails[0]?.product_name}</h3>
      <h3>Product qty choosen:{userDetails[0]?.product_qty}</h3>
      <h3>Total:{userDetails[0]?.totalamt}</h3>
     </div>
     );
};

export default Profile;
