import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoginUser = () => {
  const [user, setUser] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user);
        setAppliedJobs(response.data.appliedJobs);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mt-4">
      {user ? (
        <>
          <h3>Welcome, {user.name}</h3>
          <p>Email: {user.email}</p>
          <h5>Applied Jobs:</h5>
          <ul>
            {appliedJobs.length === 0 ? (
              <p>No jobs applied yet.</p>
            ) : (
              appliedJobs.map((job, index) => (
                <li key={index}>
                  {job.title} at {job.company} - {job.location}
                </li>
              ))
            )}
          </ul>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default LoginUser;
