import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployerDashboard = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">Employer Dashboard</h2>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title">Post a Job</h5>
              <p className="card-text text-muted">Create and publish a new job listing.</p>
              <Link to="/employerDashboard/PostJobForm" className="btn btn-primary">
                Go
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title">View My Jobs</h5>
              <p className="card-text text-muted">Manage and update your posted jobs.</p>
              <Link to="/employerDashboard/ViewJobs" className="btn btn-primary">
                Go
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title">View Applicants</h5>
              <p className="card-text text-muted">Check who has applied to your jobs.</p>
              <Link to="/employerDashboard/ViewApplicants" className="btn btn-primary">
                Go
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
