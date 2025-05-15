import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Role from './components/Role';
import FindWork from './components/Freelancer/FindWork';
import Navbar from './components/Freelancer/Navbar/Navbar';
import UserProfile from './components/Freelancer/Profile/UserProfile';
import Chat from './components/Freelancer/Chat/Chat';
import Notification from './components/Freelancer/Chat/Notification';
import JobDetailPage from './components/Freelancer/findwork/JobDetailPage';
import Reports from './components/Freelancer/Reports';
import Setting from './components/Freelancer/Profile/Setting';
import ClientDashboard from './components/ProjectOwner/ClientDashboard';

import Dashboard from './components/ProjectOwner/Dashboard.js';
import FreelancerProfiles from './components/ProjectOwner/FreelancerProfiles.js';
import JobPostings from './components/ProjectOwner/JobPostings.js';
import ActiveProjects from './components/ProjectOwner/ActiveProjects.js';
import PostJob from './components/ProjectOwner/PostJob.js';
import Chatbot from './components/Freelancer/Chat/Chatbot.js';
import WorkHistory from './components/Freelancer/Profile/WorkHistory.js';
import Reviews from './components/Freelancer/Profile/Reviews.js';
import ProposalDetails from './components/Freelancer/findwork/ProposalDetail.js';


// function App() {
//   const jobs = [
//     {
//       id: 1,
//       title: "Front-End Developer",
//       location: "Karachi,Pakistan",
//       datePosted: "5/13/2024, 8:23:10 AM",
//       budget: 90,
//       experienceLevel: "Intermediate",
//       duration: "Long Term",
//       type: "Fixed",
//       description: "We are looking for a talented and passionate Front-End Developer to join our team and help build modern, responsive, and user-friendly web interfaces. The ideal candidate will have experience working with React and Tailwind CSS to create visually appealing designs that enhance the user experience. You will work closely with our design and backend teams to bring concepts to life, ensuring cross-browser compatibility and optimal performance. This is a long-term project, and we value collaboration, creativity, and problem-solving skills.",
//       skills: ["React", "Tailwind CSS", "HTML", "CSS"],
//       proposals: 0,
//       isVerified: true,
//       spent: 0,
//       clientLocation: "Pakistan",
//       clientSince: "5/13/2024",
//     },
//     {
//       id: 2, // Changed id to 2 to fix duplicate key
//       title: "Back-End Developer",
//       location: "Karachi,Pakistan",
//       datePosted: "5/13/2024, 8:23:10 AM",
//       budget: 90,
//       experienceLevel: "Intermediate",
//       duration: "Long Term",
//       type: "Fixed",
//       description: "987",
//       skills: ["React", "Tailwind CSS", "HTML", "CSS"],
//       proposals: 0,
//       isVerified: false,
//       spent: 0,
//       clientLocation: "Pakistan",
//       clientSince: "5/13/2024",
//     },
//   ];

//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/join" element={<Role />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile" element={<UserProfile />} />
//           <Route path="/reports" element={<Reports />} />
//           <Route path="/setting" element={<Setting />} />
//           <Route path="/client/setting" element={<Setting />} />
//           <Route path="/work-history" element={<WorkHistory />} />
//           <Route path="/reviews" element={<Reviews />} />
//           <Route path="/client/dashboard" element={<ClientDashboard />} />
//           <Route path="/client/PostJob" element={<PostJob />} />
        
//           <Route path="/client/browse-freelancers" element={<FreelancerProfiles />} />
//           <Route path="/client/job-post" element={<JobPostings />} />
//           <Route path="/chatbot" element={<Chatbot />} />
//           <Route path="/client/chatbot" element={<Chatbot />} />
//           <Route path="/client/active-projects" element={<ActiveProjects />} />

//           <Route path="/client/chat" element={<Chat />} />
//           <Route path="/client//chat" element={<Chat />} />
//           <Route path="/client/notify" element={<Notification />} />
//           <Route path="/find-work" element={<FindWork />} />
//           {jobs.map((job) => (
//             <Route
//               key={job.id}
//               path={`/find-work/${job.id}`}
//               element={<JobDetailPage job={job} />}
//             />
//           ))}
//           <Route path="*" element={<h1>Page Not Found</h1>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;







import Footer from './components/Footer'; // Import Footer
import LandingPage from './components/LandingPage.js';
import ProposalPage from './components/Freelancer/findwork/ProposalPage.js';
import ClientProposalChecking from './components/ProjectOwner/ClientProposalChecking.js';
import AppliedJobs from './components/Freelancer/findwork/AppliedJob.js';

function App() {
  const jobs = [
    {
      id: 1,
      title: "Build Responsive website",
      location: "Karachi,Pakistan",
      datePosted: "5/13/2024, 8:23:10 AM",
      budget: 90,
      experienceLevel: "Intermediate",
      duration: "Long Term",
      type: "Fixed",
      description: "We are looking for a talented and passionate Front-End Developer to join our team and help build modern, responsive, and user-friendly web interfaces. The ideal candidate will have experience working with React and Tailwind CSS to create visually appealing designs that enhance the user experience. You will work closely with our design and backend teams to bring concepts to life, ensuring cross-browser compatibility and optimal performance. This is a long-term project, and we value collaboration, creativity, and problem-solving skills.",
      skills: ["React", "Tailwind CSS", "HTML", "CSS"],
      proposals: 0,
      isVerified: true,
      spent: 0,
      clientLocation: "Pakistan",
      clientSince: "5/13/2024",
    },
    {
      id: 2, // Changed id to 2 to fix duplicate key
      title: "Front-End React Developer",
      location: "Karachi,Pakistan",
      datePosted: "5/13/2024, 8:23:10 AM",
      budget: 90,
      experienceLevel: "Intermediate",
      duration: "Long Term",
      type: "Fixed",
      description: "We are looking for a talented and passionate Front-End Developer to join our team and help build modern, responsive, and user-friendly web interfaces. The ideal candidate will have experience working with React and Tailwind CSS to create visually appealing designs that enhance the user experience. You will work closely with our design and backend teams to bring concepts to life, ensuring cross-browser compatibility and optimal performance. This is a long-term project, and we value collaboration, creativity, and problem-solving skills.",
      skills: ["React", "Tailwind CSS", "HTML", "CSS"],
      proposals: 0,
      isVerified: false,
      spent: 0,
      clientLocation: "Pakistan",
      clientSince: "5/13/2024",
    },
    {
      id: 3, // Changed id to 2 to fix duplicate key
      title: "Back-End Django Developer",
      location: "Karachi,Pakistan",
      datePosted: "5/13/2024, 8:23:10 AM",
      budget: 90,
      experienceLevel: "Intermediate",
      duration: "Long Term",
      type: "Fixed",
      description: "We are looking for a talented and passionate Front-End Developer to join our team and help build modern, responsive, and user-friendly web interfaces. The ideal candidate will have experience working with React and Tailwind CSS to create visually appealing designs that enhance the user experience. You will work closely with our design and backend teams to bring concepts to life, ensuring cross-browser compatibility and optimal performance. This is a long-term project, and we value collaboration, creativity, and problem-solving skills.",
      skills: ["React", "Tailwind CSS", "HTML", "CSS"],
      proposals: 0,
      isVerified: false,
      spent: 0,
      clientLocation: "Pakistan",
      clientSince: "5/13/2024",
    },
  ];

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Role />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/reports" element={<Reports />} />

          <Route path="/setting" element={<Setting />} />
          <Route path="/client/setting" element={<Setting />} />
          <Route path="/work-history" element={<WorkHistory />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/proposalChecking" element={<ClientProposalChecking/>} />
          <Route path="/client/PostJob" element={<PostJob />} />
        
          <Route path="/client/browse-freelancers" element={<FreelancerProfiles />} />
          <Route path="/client/job-post" element={<ClientProposalChecking/>} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/client/chatbot" element={<Chatbot />} />
          <Route path="/client/active-projects" element={<ActiveProjects />} />
          <Route path="/client/chat/:userId" element={<Chat />} />
          <Route path="/chat/:userId" element={<Chat />} />
          <Route path="/client/notify" element={<Notification />} />
          <Route path="/notify" element={<Notification />} />
          <Route path="/find-work" element={<FindWork />} />
          <Route path="/applied-jobs" element={<AppliedJobs/>} />
          <Route path="/proposals/:proposalId" element={<ProposalDetails />} />
          <Route path="/proposal/:jobId" element={<ProposalPage/>} />
         
          <Route path="/find-work/:jobId" element={<JobDetailPage />} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
        </div>
        <Footer /> {/* Add Footer Here */}
      </div>
    </Router>
  );
}

export default App;

























// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { login } from './store/auth-slice/index';
// import ProtectedRoutes from './components/ProtectedRoutes';
// import Login from './components/Login';
// import Role from './components/Role';
// import FindWork from './components/Freelancer/FindWork';
// import UserProfile from './components/Freelancer/Profile/UserProfile';
// import ClientDashboard from './components/ProjectOwner/ClientDashboard';
// import NotAuthorized from './components/NotAuthorized';

// function App() {
//   const dispatch = useDispatch();

//   // Simulate login for testing (replace with actual login logic)
//   const handleLogin = () => {
//     dispatch(
//       login({
//         id: 1,
//         name: 'John Doe',
//         role: 'freelancer', // Change to 'client' for testing
//       })
//     );
//   };

//   return (
//     <Router>
//       <div>
//         <button onClick={handleLogin}>Simulate Login</button>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/join" element={<Role />} />

//           {/* Freelancer Protected Routes */}
//           <Route
//             path="/find-work"
//             element={
//               <ProtectedRoutes allowedRoles={['Freelancer']}>
//                 <FindWork />
//              </ProtectedRoutes>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoutes allowedRoles={['Freelancer']}>
//                 <UserProfile />
//               </ProtectedRoutes>
//             }
//           />

//           {/* Client Protected Routes */}
//           <Route
//             path="/client/dashboard"
//             element={
//               <ProtectedRoutes allowedRoles={['client']}>
//                 <ClientDashboard />
//               </ProtectedRoutes>
//             }
//           />

//           {/* Catch-all routes */}
//           <Route path="/not-authorized" element={<NotAuthorized />} />
//           <Route path="*" element={<h1>Page Not Found</h1>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
