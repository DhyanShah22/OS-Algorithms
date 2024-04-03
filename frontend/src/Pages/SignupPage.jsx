import React, { useState } from 'react';
import axios from 'axios';
import '../assets/Login.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signup', {
        email,
        password
      });
      console.log(response.data); // handle successful signup

      // Handle successful signup response
      // For example, store token in local storage and redirect to landing page
      localStorage.setItem('token', response.data.token);
      window.location.href = '/landing'; // Redirect using window.location.href
    } catch (error) {
      setError(error.response.data.error); // handle signup error
      console.error('Error:', error);
    }
  };

  return (
    <div className='new'>
      <h1>Signup</h1>
      <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
    </div>
    
  );
};

export default SignupPage;
