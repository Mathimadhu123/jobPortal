import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // adjust this path if needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Clear any old token or user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    try {
      // Send login request
      const response = await axios.post('http://localhost:8000/user/login', {
        email,
        password
      });

      const { token, user } = response.data;

      // ✅ Store new token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Set user context
      setUser(user);

      alert('Login Successful!');
      navigate('/Home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid Credentials!');
    }
  };

  return (
    <div className="container mt-3">

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

    </div>
  );
};

export default Login;
