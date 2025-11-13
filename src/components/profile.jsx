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
        // Send the token in the Authorization header
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUserDetails(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'An error occurred');
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userDetails.user_name}'Profile</h1>
      <p>product name:{userDetails.product_name}</p>
      <p>product qty:{userDetails.product_quantity}</p>
      <p>Total_amt:{userDetails.product_amount}</p>
    </div>
  );
};

export default Profile;
