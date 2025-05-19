import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login'); // default is login

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <ul className="nav nav-tabs justify-content-center mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </li>
      </ul>

      <div className="shadow p-4 rounded bg-white">
        {activeTab === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default AuthPage;
