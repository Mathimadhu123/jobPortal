import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './navbar.css';
import { NavLink, Link } from 'react-router-dom';
// import ProfileSidebar from '../Profile/ProfileSidebar';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3">
      <a className="navbar-brand ms-5" href="#">PathFinder</a>

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
              <Link className='nav-link h1' to="/company">Company</Link>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item">
            <div className="d-flex">
              <Link to="/authPage" className="btn   btn-Color btn-outline-primary  me-2" >Login / Register</Link>
            </div>
          </li>
          {/* {user && <ProfileSidebar user={user} setUser={setUser} />} */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
