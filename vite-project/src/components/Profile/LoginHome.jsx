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
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const applicantId = localStorage.getItem('applicantId');

    if (!token || !applicantId) {
      // alert("You must be logged in to apply for a job");
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('jobId', id);
    formData.append('applicantId', applicantId);
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);

    try {
      const response = await axios.post('http://localhost:8000/application/apply', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setSuccessMessage('Applied successfully!');
      setTimeout(() => {
        navigate('/MyApplications');
      }, 1500);
    } catch (error) {
      alert("Failed to apply for job. Try again.");
      console.error(error);
    }
  };

  if (error) return <div className="alert alert-danger text-center mt-4">{error}</div>;
  if (!job) return <p className="text-center mt-4">Loading job details...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="card-title">{job.title}</h2>
        <p className="text-muted">{job.company}</p>

        {successMessage && (
          <div className="alert alert-success text-center">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="resume" className="form-label">Upload Resume</label>
            <input 
              type="file" 
              className="form-control"
              id="resume" 
              name="resume" 
              accept=".pdf,.doc,.docx" 
              onChange={handleResumeChange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="coverLetter" className="form-label">Cover Letter (Optional)</label>
            <textarea
              className="form-control"
              id="coverLetter"
              name="coverLetter"
              value={coverLetter}
              onChange={handleCoverLetterChange}
              rows="5"
              placeholder="Write your cover letter here..."
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
