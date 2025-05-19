// components/Profile/AuthTab.jsx
import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

const AuthTab = () => {
  const [isLoginTab, setIsLoginTab] = useState(true);

  const switchToRegister = () => setIsLoginTab(false);
  const switchToLogin = () => setIsLoginTab(true);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn ${isLoginTab ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={switchToLogin}
        >
          Login
        </button>
        <button
          className={`btn ${!isLoginTab ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={switchToRegister}
        >
          Register
        </button>
      </div>

      {isLoginTab ? (
        <Login />
      ) : (
        <Register switchToLogin={switchToLogin} /> // ✅ Pass function as prop
      )}
    </div>
  );
};

export default AuthTab;
