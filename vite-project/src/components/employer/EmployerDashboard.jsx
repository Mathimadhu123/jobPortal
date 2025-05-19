import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    company: '',
    type: '',
    category: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('http://localhost:8000/job/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Job posted successfully!");
      setFormData({
        title: '',
        description: '',
        salary: '',
        location: '',
        company: '',
        type: '',
        category: ''
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating job");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employer Dashboard</h2>

      <div className="card shadow p-4">
        <h4 className="mb-3">Post a New Job</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {["title", "description", "salary", "location", "company", "type", "category"].map((field, idx) => (
              <div className="mb-3 col-md-6" key={idx}>
                <label className="form-label text-capitalize">{field}</label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProtectedEmployerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'employer') {
      alert('Access denied. Employers only!');
      navigate('/auth'); // redirect to login
    }
  }, [navigate]);

  return <EmployerDashboard />;
};

export default ProtectedEmployerDashboard;
