import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Include your CSS file for styling
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:8000/api/auth/login'; // Replace with your API URL

    try {
      const response = await axios.post(apiUrl, { userName, passWord });
console.log(response);

      // Set token for everyone
      localStorage.setItem('authToken', response.data.token);
console.log(response.data.token);

      setSuccessMessage('Login successful!');
      alert(response.data.message);

      const userRole = response.data.user.role;

      // Save user-specific details based on role and navigate
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'user') {
        localStorage.setItem('userlogId', response.data.user.id);
        navigate('/user-home');
      } else if (userRole === 'doctor') {
        localStorage.setItem('doctorlogId', response.data.user.id);
        navigate('/doctor-home');
      } else if(userRole=='shop'){
        localStorage.setItem('shoplogId', response.data.user.id);
        navigate('/shophome')
      }else if(userRole=='labStaff'){
       
        navigate('/labhome')
        localStorage.setItem('lablogId',response.data.user.id)
        
      }  else if(userRole=='deliveryboy'){
        localStorage.setItem('lablogId',response.data.user.id)
        navigate('/deliveryboy')
      }
      else if(userRole=='companion'){
        localStorage.setItem('complogId',response.data.user.id)
        navigate('/requests')
      }
      
      else {
        // Handle any additional roles or default behavior
        navigate('/');
      }
    } catch (error) {
      // alert(error.response.data.message);
      setErrorMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-card">
          <div className="logo-section">
          <img
              src="data:image/png;base64,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"
              alt="Logo"
              className="logo-image"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="userName">Username:</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <div className="register-link">
              <p>
                Don't have an account? <Link to="/user">Register here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

