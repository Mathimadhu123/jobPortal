import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Profile/AuthContext';

const EmployerNavbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/main'); // Redirect after logout
  };

  // 🔒 Don't render this navbar if no user or not an employer
  if (!user || user.role !== 'employer') {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <div className="container-fluid">
        <Link to="/employerDashboard" className="navbar-brand fw-bold">
          PathFinder
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#employerNavbarNav"
          aria-controls="employerNavbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="employerNavbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/employerDashboard" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/employerDashboard/PostJobForm" className="nav-link">Post Job</Link>
            </li>
            <li className="nav-item">
              <Link to="/employerDashboard/ViewJobs" className="nav-link">View Jobs</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-outline-danger ms-3">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default EmployerNavbar;
