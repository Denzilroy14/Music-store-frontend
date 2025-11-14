// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'; // For redirecting the user

const Login = () => {
  const [phone_number, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successmessage,setSuccessmessage]=useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        phone_number,
        password,
      });

      // If login is successful, store the JWT token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the profile page
      setSuccessmessage('Login successfull');
      setSuccessmessage('');
      navigate('/');
    } catch (error) {
      // If login fails, display error message
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        setErrorMessage('');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Phone-number</label>
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successmessage && <p style={{ color: 'green' }}>{successmessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
