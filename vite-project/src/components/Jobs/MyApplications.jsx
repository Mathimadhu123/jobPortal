import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;  // To avoid setting state if component unmounts early

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');

        // Check if token exists before calling API
        if (!token) {
          if (mounted) setError('You must be logged in to see your applications.');
          return;
        }

        const response = await axios.get('http://localhost:8000/application/my-applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('API Response:', response.data);  // Debug API response

        if (mounted) {
          // Safely set applications or fallback to empty array
          setApplications(response.data.applications || []);
          setError(null); // Clear any previous errors on success
        }
      } catch (err) {
        console.error('API error:', err);
        if (mounted) setError(err.message || 'Failed to load applications');
      }
    };

    fetchApplications();

    // Cleanup function to avoid state update if component unmounts
    return () => {
      mounted = false;
    };
  }, []);

  // Show error if any
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Applications</h2>
      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <div className="row">
          {applications.map((app) => (
            <div key={app._id} className="col-md-6 mb-4">
              <div className="card shadow p-3">
                <h5 className="card-title">{app.jobId?.title || 'Job Title Not Found'}</h5>
                <p className="card-text"><strong>Company:</strong> {app.jobId?.company || 'N/A'}</p>
                <p className="card-text"><strong>Applied At:</strong> {new Date(app.appliedAt).toLocaleString()}</p>
                <p className="card-text"><strong>Cover Letter:</strong> {app.coverLetter || 'None provided'}</p>
                <a
                  href={`http://localhost:8000/uploads/resumes/${app.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  View Resume
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
