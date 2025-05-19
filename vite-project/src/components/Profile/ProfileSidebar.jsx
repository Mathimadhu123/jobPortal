// import React from 'react';
// import { useNavigate } from 'react-router-dom';



// const ProfileSidebar = ({ user, setUser }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate('/login'); // Redirect to login after logout
//   };

//   return (
//     <div className="position-absolute top-0 start-0 m-3 p-3 bg-white shadow rounded" style={{ width: '250px' }}>
//       <h5 className="fw-bold mb-3">Welcome, {user.name}</h5>
//       <ul className="list-unstyled">
//         <li className="mb-2"><i className="bi bi-person-circle me-2"></i> My Profile</li>
//         <li className="mb-2"><i className="bi bi-briefcase me-2"></i> My Applications</li>
//         <li className="mb-2" style={{ cursor: 'pointer' }} onClick={handleLogout}>
//           <i className="bi bi-box-arrow-right me-2"></i> Logout
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default ProfileSidebar;
import React from 'react';

const ProfileSidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <p>No user logged in.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome, {user.name}!</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
};

export default ProfileSidebar;
