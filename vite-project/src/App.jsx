import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import { AuthContext } from './components/Profile/AuthContext';

import Navbar from './components/Header/Navbar';
import LoginNavbar from './components/Profile/LoginNavbar';

import Jobs from './components/Jobs/Jobs';
import Home from './components/Home/Home';
import Company from './components/Company/Company';
import AuthPage from './components/Profile/authPage';
import ProfileSidebar from './components/Profile/ProfileSidebar';
import LoginUser from './components/Profile/Login';
import LoginHome from './components/Profile/LoginHome';
import JobDetails from './components/Jobs/jobDetails';
import LoginHomePage from './components/Profile/LoginHomePage';
import JobApplication from './components/Jobs/jobApplication';
import MyApplications from './components/Jobs/MyApplications';
import AuthTab from './components/Profile/AuthTab';
// import EmployerDashboard from './components/employer/employerDashboard';
import ProtectedEmployerDashboard from './components/employer/employerDashboard';
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      {/*  Conditionally show navbar based on login status */}
      {user ? <LoginNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/authPage" element={<AuthPage />} />
        <Route path="/LoginUser" element={<LoginUser />} />
        {/* <Route path="/LoginHome/:id" element={<LoginHome />} /> */}
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/profile" element={<ProfileSidebar />} />
        <Route path="/LoginHomePage/:id" element={<LoginHomePage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/company" element={<Company />} />
        <Route path="/JobApplication/:id" element={<JobApplication />} />
        <Route path="/MyApplications" element={<MyApplications />} />
        <Route path="/AuthTab" element={<AuthTab />} />

        {/* <Route path="/employerDashboard" element={<EmployerDashboard />} /> */}
        <Route path="/ProtectedEmployerDashboard" element={<ProtectedEmployerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
