import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const Home = () => {
  const [job, setJob] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

 // Get the job ID from the URL parameters

 useEffect(() => {
  const fetchJobs = async () => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:8000/job/getJobById/${id}`);
        console.log(response.data);
        setJob([response.data.job]); // Assuming single job, wrap in array to map over
      } else {
        const response = await axios.get(`http://localhost:8000/job/getAllJobs`);
        setJob(response.data.jobs); // Array of jobs
      }
    } catch (error) {
      console.log("Error in fetching Job", error);
    }
  };
  fetchJobs();
}, [id]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/jobs?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/jobs');
    }
  };

  

  return (
    <div className="bg-light" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Hero Section */}
      <section className="d-flex align-items-center vh-100 text-white" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <h1 className="display-4 fw-bold">Find Your Dream Job</h1>
              <p className="lead mb-4">Explore thousands of job openings that match your skills.</p>
              <div className="input-group shadow rounded overflow-hidden">
                <input
                  type="text"
                  className="form-control py-2 border-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by job title or keyword"
                />
                <button className="btn btn-warning fw-semibold" onClick={handleSearch}>
                  <i className="bi bi-search me-2"></i>Search
                </button>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center mt-4 mt-md-0">
              <div style={{
                width: '450px', height: '300px', borderRadius: '5%',
                overflow: 'hidden', position: 'relative',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                background: 'linear-gradient(145deg, #ffffff, #d1d1d1)'
              }}>
                <img
                  src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?semt=ais_hybrid&w=740"
                  alt="Job search"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="container my-5">
  <h2 className="text-center fw-bold mb-4">Featured Jobs</h2>
  <div className="row g-4">
    {job.length === 0 ? (
      <p className="text-center">No featured jobs available</p>
    ) : (
      job.slice(0, 6).map((job, index) => (
        <div className="col-md-4" key={index}>
          <Link to={`/job/${job._id}`} className="text-decoration-none text-dark">
            <div className="card h-100 border-0 shadow-sm rounded">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{job.title}</h5>
                <p className="text-muted">
                  <i className="bi bi-building me-1"></i>{job.company}
                </p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <small><i className="bi bi-geo-alt me-1"></i>{job.location}</small>
                  <small><i className="bi bi-briefcase me-1"></i>{job.experience}</small>
                </div>
          
              </div>
            </div>
          </Link>
        </div>
      ))
    )}
  </div>
</section>

      {/* Popular Categories */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">Popular Categories</h2>
        <div className="row g-4">
          {[
            { name: 'Design', icon: 'palette' },
            { name: 'Development', icon: 'code-slash' },
            { name: 'Marketing', icon: 'megaphone' },
            { name: 'Finance', icon: 'currency-dollar' },
            { name: 'Sales', icon: 'graph-up' },
            { name: 'Support', icon: 'headset' },
          ].map((cat, i) => (
            <div className="col-6 col-md-4" key={i}>
              <div className="p-4 text-center bg-white shadow-sm rounded">
                <i className={`bi bi-${cat.icon} fs-2 text-primary mb-2`}></i>
                <h5 className="mb-0">{cat.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container text-center my-5">
        <h2 className="fw-bold mb-4">Why Choose PathFinder?</h2>
        <div className="row g-4">
          {[
            { icon: 'shield-check', title: 'Trusted Employers', text: 'We verify companies before listing jobs.' },
            { icon: 'bolt', title: 'Instant Applications', text: 'Apply with one click and track your status easily.' },
            { icon: 'bar-chart-line', title: 'Dashboard', text: 'Manage your profile and applications effortlessly.' },
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div className="bg-white rounded p-4 shadow-sm h-100">
                <i className={`bi bi-${item.icon} fs-2 text-success mb-3`}></i>
                <h5>{item.title}</h5>
                <p className="text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
<section className="bg-dark text-white pt-5 pb-4 mt-5 border-top border-secondary">
  <div className="container">
    <div className="row text-md-start text-center">

      {/* Logo + About */}
      <div className="col-md-4 mb-4">
        <h3 className="text-primary fw-bold">PathFinder</h3>
        <p className="text-light">Your trusted career companion. We help job seekers and companies connect meaningfully for a better future.</p>
        <div className="d-flex gap-3 mt-3">
          <a href="https://facebook.com" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
          <a href="https://twitter.com" className="text-white fs-5"><i className="bi bi-twitter"></i></a>
          <a href="https://linkedin.com" className="text-white fs-5"><i className="bi bi-linkedin"></i></a>
          <a href="mailto:support@pathfinder.com" className="text-white fs-5"><i className="bi bi-envelope-fill"></i></a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="col-md-4 mb-4">
        <h5 className="text-uppercase mb-3">Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="/" className="text-white text-decoration-none d-block mb-2 hover-opacity">Home</a></li>
          <li><a href="/jobs" className="text-white text-decoration-none d-block mb-2 hover-opacity">Jobs</a></li>
          <li><a href="/companies" className="text-white text-decoration-none d-block mb-2 hover-opacity"> Companies</a></li>
          <li><a href="/contact" className="text-white text-decoration-none d-block hover-opacity"> Contact Us</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="col-md-4 mb-4">
        <h5 className="text-uppercase mb-3">Contact Info</h5>
        <p><i className="bi bi-geo-alt-fill me-2"></i> Bangalore, India</p>
        <p><i className="bi bi-telephone-fill me-2"></i> +91 9812345670</p>
        <p><i className="bi bi-envelope-fill me-2"></i> support@pathfinder.com</p>
      </div>

    </div>

    <hr className="border-light" />
    <div className="text-center pt-2">
      <p className="mb-0">&copy; {new Date().getFullYear()} <strong>PathFinder</strong>. Crafted with ❤️ for job seekers.</p>
    </div>
  </div>

  {/* Custom inline styles or place into your CSS */}
  <style>{`
    .hover-opacity:hover {
      opacity: 0.8;
      transition: opacity 0.2s;
    }
  `}</style>
</section>


    </div>
  );
};

export default Home;
