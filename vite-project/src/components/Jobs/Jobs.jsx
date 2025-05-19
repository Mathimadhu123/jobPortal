import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const Job = () => {
  const [jobs, setJobs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Read search term from URL initially
  const searchParams = new URLSearchParams(location.search);
  const initialSearchTerm = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(initialSearchTerm); // input box value
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);    // actual search applied

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/job/getAllJobs");
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = () => {
    setSearchTerm(searchInput); // Apply the search only when clicking button
    navigate(`/jobs?search=${searchInput}`); // Update the URL
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Available Jobs</h2>

      {/* Search Bar */}
      <div className="input-group mb-5 shadow-sm">
        <input
          type="text"
          className="form-control py-2"
          placeholder="Search jobs by title or company..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn btn-primary fw-semibold" onClick={handleSearch}>
          <i className="bi bi-search me-2"></i>Search
        </button>
      </div>

      <div className="row g-4">
        {filteredJobs.length === 0 ? (
          <p className="text-center">No matching jobs found.</p>
        ) : (
          filteredJobs.map((job, index) => (
            <div className="col-md-4" key={index}>
              <Link to={`/job/${job._id}`} className="text-decoration-none text-dark">
                <div className="card h-100 border-0 shadow-sm rounded">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{job.title}</h5>
                    <p className="text-muted">
                      <i className="bi bi-building me-1"></i>{job.company}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p><i className="bi bi-geo-alt me-1"></i>{job.location}</p>
                      <p><i className="bi bi-briefcase me-1"></i>{job.experience}</p>
                      <button className="btn btn-primary btn-sm rounded-pill">
                        <i className="bi bi-send-fill me-1"></i>Apply
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Job;
