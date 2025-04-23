import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Navbar.css'; // 👈 Import your custom CSS here

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light p-3">
      <a className="navbar-brand" href="#">PathFinder</a>

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
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Jobs</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Company</a>
            </li>
          </ul>
        </div>

        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="btn btn-primary px-4 rounded-pill">Login</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
