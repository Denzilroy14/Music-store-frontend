import React, { useState } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests

const SignUp = () => {
  // States to store form inputs and response messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to be sent in the request
    const userData = {
      username,
      email,
      password,
      phone_number,
    };

    try {
      // Send a POST request to the backend '/signup' URL
      const response = await axios.post('http://localhost:5000/signup', userData);

      // If the signup is successful, display the success message
      setMessage(response.data.message);
      setError('');  // Clear any previous error messages
    } catch (err) {
      // Handle errors and display the error message
      setError(err.response?.data?.error || 'An error occurred');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      
      {/* Display success or error messages */}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Sign-up form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

         <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
