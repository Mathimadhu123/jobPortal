import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import { AuthContext } from './components/Profile/AuthContext';

import Navbar from './components/Header/Navbar';
import LoginNavbar from './components/Profile/LoginNavbar';
import EmployerNavbar from './components/employer/EmployerNavbar';

import Jobs from './components/Jobs/Jobs';
import Home from './components/Home/Home';
import Company from './components/Company/Company';
import AuthPage from './components/Profile/authPage';
import ProfileSidebar from './components/Profile/ProfileSidebar';
import LoginUser from './components/Profile/Login';
import LoginHome from './components/Profile/LoginHome';
import JobDetails from './components/Jobs/JobDetails';
import LoginHomePage from './components/Profile/LoginHomePage';
import JobApplication from './components/Jobs/JobApplication';
import MyApplications from './components/Jobs/MyApplications';
import EmployerDashboard from './components/employer/EmployerDashboard';
import PostJobForm from './components/employer/PostJobForm';
import PrivateRouteEmployer from './components/employer/PrivateRouteEmployer';
// import AuthTab from './components/Profile/AuthTab';
import ViewJobs from './components/employer/ViewJobs';
import Main from './components/employer/Main';

function App() {
  const { user } = useContext(AuthContext);
  const role = localStorage.getItem("role");


  return (
    <Router>
      {/*  Only one navbar at a time */}
      {role === "employer" ? (
        <EmployerNavbar />
      ) : user ? (
        <LoginNavbar />
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/authPage" element={<AuthPage />} />
        {/* <Route path="/" element={<LoginUser />} />  This was missing */}
        <Route path="/LoginUser" element={<LoginUser />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/profile" element={<ProfileSidebar />} />
        <Route path="/LoginHomePage/:id" element={<LoginHomePage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/company" element={<Company />} />
        <Route path="/JobApplication/:id" element={<JobApplication />} />
        <Route path="/MyApplications" element={<MyApplications />} />
        <Route path="/main" element={<Main/>} />
        {/* <Route path="/AuthTab" element={<AuthTab />} /> */}
        <Route path="/employerDashboard" element={
          <PrivateRouteEmployer>
            <EmployerDashboard />
          </PrivateRouteEmployer>
        } />
        <Route path="/employerDashboard/PostJobForm" element={
          <PrivateRouteEmployer>
            <PostJobForm />
          </PrivateRouteEmployer>
        } />
        <Route path="/employerDashboard/ViewJobs" element={
          <PrivateRouteEmployer>
            <ViewJobs />
          </PrivateRouteEmployer>
        } />
        {/* Default route to handle unknown paths */}
      </Routes>
      

    </Router>
  );
}

export default App;
