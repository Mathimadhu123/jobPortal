import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log(id)
        const response = await axios.get(`http://localhost:8000/job/getJobById/${id}`);
        setJob(response.data.job);
      } catch (error) {
        setError("Error fetching job details.");
        console.error("Error fetching job details", error);
      }
    };
    fetchDetails();
  }, [id]);

  const handleApply = async () => {
    const token = localStorage.getItem('token');
    const applicantId = localStorage.getItem('applicantId');

    if (!token || !applicantId) {
      alert("You must be logged in to apply for a job.");
      navigate(`/JobApplication/${id}`);
      return;
    }

    const applicationData = {
      jobId: id,
      applicantId: applicantId,
      resumeLink: "https://example.com/resume.pdf", // Replace with actual resume link
      coverLetter: "I am excited to apply for this job.", // You can allow the user to input this
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/application/apply',
        applicationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert(response.data.message);
      setApplied(true);
    } catch (err) {
      console.error("Error applying for job:", err);
      alert("Failed to apply for the job.");
    }
  };

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="fs-4 text-muted">{error}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="fs-4 text-muted">Loading job details...</p>
      </div>
    );
  }

  return (
    <div className="job-details-page bg-light min-vh-100 py-5 px-3">
      <div className="container">
        <div className="card shadow-lg p-4">
          <h2 className="mb-1">{job.title}</h2>
          <h5 className="text-muted">{job.company}</h5>
          <p className="text-secondary mb-3">Posted {job.postedOn || "Recently"}</p>
          
          <hr />
          
          <section className="mb-4">
            <h5 className="fw-bold">Job Highlights</h5>
            <div className="row">
              <div className="col-md-6"><strong>Location:</strong> {job.location}</div>
              <div className="col-md-6"><strong>Salary:</strong> {job.salary}</div>
              <div className="col-md-6"><strong>Job Type:</strong> {job.type}</div>
              <div className="col-md-6"><strong>Experience:</strong> {job.experience || "Not specified"}</div>
            </div>
          </section>
          
          <section className="mb-4">
            <h5 className="fw-bold">Job Description</h5>
            <p>{job.description}</p>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold">Requirements</h5>
            <ul>
              {job.requirements?.map((req, i) => <li key={i}>{req}</li>)}
            </ul>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold">Responsibilities</h5>
            <ul>
              {job.responsibilities?.map((res, i) => <li key={i}>{res}</li>)}
            </ul>
          </section>

          <section className="mb-4">
            <h5 className="fw-bold">About the Company</h5>
            <p><strong>{job.company}</strong></p>
            <p>{job.aboutCompany}</p>
          </section>

          <div className="text-center">
            <button
              className="btn btn-primary px-4"
              onClick={handleApply}
              disabled={applied}
            >
              {applied ? "Applied" : "Apply for this Job"}
            </button>
            {!localStorage.getItem('token') && (
              <p className="mt-2 text-muted">You need to log in to apply</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
