import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css'


const Main = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: '#f8f9fa' }}>

      {/* Hero Section */}
      <section
  className="d-flex align-items-center"
  style={{
    height: '100vh',
    background: 'linear-gradient(135deg,hwb(240 1% 60%),rgb(0, 0, 0))',
    color: 'white',
    padding: '3rem 1rem',
  }}
>
<div className="container hero-container">
  <div className="row align-items-center">
    {/* Left Content */}
    <div className="col-md-6 text-center text-md-start">
      <h1 className="hero-title">Find Your Dream Job</h1>
      <p className="hero-subtitle">Explore thousands of job openings that match your skills.</p>

      {/* Search Box */}
      <div className="input-group search-box p-1">
        <input
          type="text"
          className="form-control border-0"
          placeholder="Search by job title or keyword"
        />
        <button className="btn search-btn">Search</button>
      </div>
    </div>

    {/* Right Content - Image */}
    <div className="col-md-6 text-center mt-5 mt-md-0">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3403/3403217.png"
        alt="Job search illustration"
        className="hero-img"
      />
    </div>
  </div>
</div>

</section>
      {/* Popular Categories */}
      <section className="container my-5">
        <h2 className="mb-4 text-center">Popular Categories</h2>
        <div className="row g-4">
          {['Design', 'Development', 'Marketing', 'Finance', 'Sales', 'Support'].map((cat, i) => (
            <div className="col-6 col-md-4" key={i}>
              <div
                className="p-4 border rounded text-center shadow-sm bg-white category-box"
                style={{ transition: 'all 0.3s', cursor: 'pointer' }}
              >
                <h5 className="mb-0">{cat}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="container my-5">
        <h2 className="mb-4 text-center">Featured Jobs</h2>
        <div className="row g-4">
          {[
            {
              title: 'Frontend Developer',
              company: 'ABC Tech Pvt Ltd',
              location: 'Remote',
              experience: '1-3 years',
            },
            {
              title: 'UI/UX Designer',
              company: 'Creative Minds',
              location: 'Bangalore',
              experience: '2+ years',
            },
            {
              title: 'Full Stack Developer',
              company: 'Innovatech',
              location: 'Hyderabad',
              experience: '3-5 years',
            },
          ].map((job, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card h-100 shadow-sm job-card"
                style={{ transition: 'all 0.3s ease-in-out' }}
              >
                <div className="card-body">
                  <h5 className="card-title">{job.title}</h5>
                  <p className="card-text text-muted">{job.company}</p>
                  <p className="card-text">📍 {job.location}</p>
                  <p className="card-text">🧰 {job.experience}</p>
                  <a href="#" className="btn btn-outline-primary mt-2">
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container text-center my-5">
        <h2 className="mb-4">Why Choose PathFinder?</h2>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h5>✅ Trusted Employers</h5>
              <p className="text-muted">We verify companies before listing jobs.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h5>⚡ Instant Applications</h5>
              <p className="text-muted">Apply to jobs with one click and track progress.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white rounded shadow-sm">
              <h5>📊 Personalized Dashboard</h5>
              <p className="text-muted">Manage your profile and applications easily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center p-5" style={{ backgroundColor: '#fff3cd' }}>
        <h3 className="mb-3">Ready to take the next step?</h3>
        <p className="mb-4">Sign up now to apply for jobs or post your own!</p>
        <button className="btn btn-success me-3 px-4 py-2 rounded-pill">
          Register as Job Seeker
        </button>
        <button className="btn btn-outline-dark px-4 py-2 rounded-pill">
          Post a Job
        </button>
      </section>
    </div>
  );
};

export default Main;
