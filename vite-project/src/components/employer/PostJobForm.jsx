import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostJobForm = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    type: '',
    responsibilities: '',
    experience: '',
    requirements: ''
  });

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8000/employer/createjob', jobData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Job posted successfully!');
      setJobData({
        title: '',
        description: '',
        location: '',
        salary: '',
        type: '',
        responsibilities: '',
        experience: '',
        requirements: ''
      });
    } catch (error) {
      console.error(error);
      alert("Error posting job");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 fw-bold text-center">Post a New Job</h3>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light col-md-8 mx-auto">

        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            className="form-control"
            rows={3}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="text"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Responsibilities</label>
          <textarea
            name="responsibilities"
            value={jobData.responsibilities}
            onChange={handleChange}
            className="form-control"
            rows={2}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Experience</label>
          <input
            type="text"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Type</label>
          <input
            type="text"
            name="type"
            value={jobData.type}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Requirements</label>
          <input
            type="text"
            name="requirements"
            value={jobData.requirements}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success px-4">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;
