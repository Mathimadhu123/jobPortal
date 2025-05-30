import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Profile/AuthContext';

const LoginNavbar = () => {
  const navigate = useNavigate(); 
  const { user, setUser } = useContext(AuthContext);
  // console.log(AuthContext);
  // console.log(user);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // This will trigger a re-render
    navigate('/home');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3">
      <Link className="navbar-brand ms-5" to="#">PathFinder</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
        <div className="d-flex w-100 justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link h1" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <Link className="nav-link h1" to="/jobs">Jobs</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link h1' to="/MyApplications">My Applications</Link>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav me-5">
          <li className="nav-item">
            {/* {console.log(user)} */}
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-2"></i>
                  {user.name || user.userName || 'Profile'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/authPage" className="btn btn-outline-primary me-2">
                Login / Register
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LoginNavbar;
