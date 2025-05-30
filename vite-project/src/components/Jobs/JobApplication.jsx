import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JobApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/job/getJobById/${id}`);
        setJob(response.data.job);
      } catch {
        setError("Error fetching job details.");
      }
    };
    fetchDetails();
  }, [id]);

  const handleResumeChange = e => setResume(e.target.files[0]);
  const handleCoverLetterChange = e => setCoverLetter(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      return navigate('/login');
    }
    if (!resume) {
      return alert('Please upload your resume.');
    }

    const formData = new FormData();
    formData.append('jobId', id);
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);

    try {
      const res = await axios.post(
        'http://localhost:8000/application/apply',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      alert(res.data.message || "Applied successfully!");
      navigate('/myapplications');
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert(err.response?.data?.message || "Error applying for the job.");
      }
      console.error('Apply error:', err);
    }
  };

  if (error) return <div className="alert alert-danger text-center mt-4">{error}</div>;
  if (!job) return <p className="text-center mt-4">Loading job details...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="card-title">{job.title}</h2>
        <p className="text-muted">{job.company}</p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">

            <div className="input-group mb-3 ">
              <label htmlFor="name" className="input-group-text input-sm">Name:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                aria-describedby="basic-addon2"
              />
            </div>
            <label htmlFor="resume" className="form-label">Upload Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="form-control"
              onChange={handleResumeChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="coverLetter" className="form-label">Cover Letter (Optional)</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              className="form-control"
              value={coverLetter}
              onChange={handleCoverLetterChange}
              rows="5"
              placeholder="Write your cover letter here..."
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Apply</button>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
