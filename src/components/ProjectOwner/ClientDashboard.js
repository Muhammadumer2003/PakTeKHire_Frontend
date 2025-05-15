// // import React from "react";
// // import { FiUser, FiBriefcase, FiStar, FiSettings } from "react-icons/fi"; // Sidebar icons

// // const ClientDashboard = () => {
// //   const client = {
// //     name: "John Doe",
// //     profilePicture: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
// //     location: "New York, USA",
// //     about: "We are a digital agency focused on delivering top-notch solutions.",
// //     totalSpent: 5000,
// //     averageRate: 35,
// //     jobsPosted: [
// //       { id: 1, title: "Website Development", status: "Completed" },
// //       { id: 2, title: "Mobile App Design", status: "In Progress" },
// //     ],
// //     reviews: [
// //       { id: 1, freelancer: "Jane Smith", feedback: "Great client!", rating: 5 },
// //       { id: 2, freelancer: "Mike Johnson", feedback: "Clear requirements.", rating: 4.5 },
// //     ],
// //   };

// //   return (
// //     <div className="flex min-h-screen">
// //       {/* Sidebar */}
// //       <div className="w-72 bg-slate-900 text-white shadow-md h-screen flex flex-col">
// //         <div className="p-6 text-center border-b border-slate-700">
// //           <h1 className="text-2xl font-bold">Client Dashboard</h1>
// //         </div>
// //         <nav className="flex-grow mt-6">
// //           <ul className="space-y-4 px-6">
// //             <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
// //               <FiUser size={20} className="text-gray-300" />
// //               <a href="#profile" className="block font-medium text-gray-300">
// //                 Dashboard
// //               </a>
// //             </li>
// //             <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
// //               <FiBriefcase size={20} className="text-gray-300" />
// //               <a href="#job-history" className="block font-medium text-gray-300">
// //                 Job History
// //               </a>
// //             </li>
// //             <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
// //               <FiStar size={20} className="text-gray-300" />
// //               <a href="#reviews" className="block font-medium text-gray-300">
// //                 Reviews
// //               </a>
// //             </li>
// //             <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
// //               <FiSettings size={20} className="text-gray-300" />
// //               <a href="/client/setting" className="block font-medium text-gray-300">
// //                 Settings
// //               </a>
// //             </li>
// //           </ul>
// //         </nav>
// //       </div>

// //        {/* Main Content */}
// //        <div className="flex-1 p-8 ">
// //         {/* Profile Section */}
// //         <div
// //           id="profile"
// //           className="bg-white shadow-md rounded-lg p-6 mb-6 hover:shadow-lg"
// //         >
// //           <div className="flex items-center gap-6">
// //             <img
// //               src={client.profilePicture}
// //               alt="Profile"
// //               className="w-24 h-24 rounded-full border border-gray-300"
// //             />
// //             <div>
// //               <h1 className="text-3xl font-bold text-gray-800">{client.name}</h1>
// //               <p className="text-gray-600">{client.location}</p>
// //               <p className="mt-4 text-gray-700">{client.about}</p>
// //             </div>
// //           </div>
// //           <div className="mt-6 flex gap-8">
// //             <div>
// //               <h3 className="text-sm text-gray-600 uppercase">Total Spent</h3>
// //               <p className="text-lg font-semibold text-gray-800">
// //                 Rs {client.totalSpent}
// //               </p>
// //             </div>
// //             <div>
// //               <h3 className="text-sm text-gray-600 uppercase">
// //                 Avg. Hourly Rate
// //               </h3>
// //               <p className="text-lg font-semibold text-gray-800">
// //                 Rs {client.averageRate}/hr
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Job History Section */}
// //         <div
// //           id="job-history"
// //           className="bg-white shadow-md rounded-lg p-6 mb-6 hover:shadow-lg"
// //         >
// //           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
// //             Job History
// //           </h2>
// //           {client.jobsPosted.length > 0 ? (
// //             <ul className="space-y-4">
// //               {client.jobsPosted.map((job) => (
// //                 <li
// //                   key={job.id}
// //                   className="flex justify-between items-center border-b pb-2"
// //                 >
// //                   <span className="text-gray-800 font-medium">{job.title}</span>
// //                   <span
// //                     className={`${
// //                       job.status === "Completed"
// //                         ? "text-green-600"
// //                         : "text-blue-600"
// //                     } font-medium`}
// //                   >
// //                     {job.status}
// //                   </span>
// //                 </li>
// //               ))}
// //             </ul>
// //           ) : (
// //             <p className="text-gray-600">No jobs posted yet.</p>
// //           )}
// //         </div>

// //         {/* Reviews Section */}
// //         <div
// //           id="reviews"
// //           className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg"
// //         >
// //           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
// //           {client.reviews.length > 0 ? (
// //             <ul className="space-y-4">
// //               {client.reviews.map((review) => (
// //                 <li key={review.id} className="border-b pb-2">
// //                   <p className="text-gray-800 font-medium">
// //                     {review.freelancer}
// //                   </p>
// //                   <p className="text-gray-600">{review.feedback}</p>
// //                   <span className="text-yellow-500 font-semibold">
// //                     {review.rating} ★
// //                   </span>
// //                 </li>
// //               ))}
// //             </ul>
// //           ) : (
// //             <p className="text-gray-600">No reviews yet.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClientDashboard;






// import React, { useEffect, useState } from "react";
// import { FiUser, FiBriefcase, FiStar, FiSettings, FiMessageSquare } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ClientDashboard = () => {
//   const navigate = useNavigate();
//   const auth = useSelector((store) => store.auth);
//   const { user } = auth || {};
//   const { fullname, profilePic, location, about } = user || {};

//   const [jobs, setJobs] = useState([]);
//   const [stats, setStats] = useState({
//     activeJobs: 0,
//     totalSpent: 0,
//     averageRate: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Hardcoded reviews (can be made dynamic with a reviews endpoint)
//   const reviews = [
//     { id: 1, freelancer: "Jane Smith", feedback: "Great client to work with! Clear requirements and prompt payment.", rating: 5, date: "Jan 25, 2024" },
//     { id: 2, freelancer: "Mike Johnson", feedback: "Good communication and reasonable expectations. Would work with again.", rating: 4.5, date: "Dec 12, 2023" },
//   ];

//   useEffect(() => {
//     const fetchClientData = async () => {
//       if (!user || user.role !== "client") {
//         setError("Unauthorized: Only clients can access this dashboard");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:8008/api/client/jobs/proposals", {
//           withCredentials: true,
//         });

//         const { jobs: fetchedJobs, proposals } = response.data;

//         // Format jobs
//         const formattedJobs = fetchedJobs.map((job) => ({
//           id: job._id,
//           title: job.jobTitle,
//           status: job.status || "Draft", // Use job status from the updated Job model
//           proposals: proposals.filter((p) => String(p.jobId) === String(job._id)).length,
//           date: new Date(job.createdAt).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           }),
//         }));

//         setJobs(formattedJobs);

//         // Calculate stats
//         const activeJobs = formattedJobs.filter((job) => job.status === "Ongoing").length;
//         const acceptedProposals = proposals.filter((p) => p.status === "Accepted");
//         const totalSpent = acceptedProposals.reduce((sum, p) => sum + p.bidAmount, 0);
//         const hourlyJobs = acceptedProposals.filter((p) => {
//           const job = fetchedJobs.find((j) => String(j._id) === String(p.jobId));
//           return job?.jobType === "Hourly";
//         });
//         const totalHours = hourlyJobs.reduce((sum, p) => sum + (p.bidAmount / 1000), 0); // Assuming 1000 PKR/hour as in Reports
//         const averageRate = hourlyJobs.length > 0 ? (totalSpent / totalHours).toFixed(2) : 0;

//         setStats({
//           activeJobs,
//           totalSpent,
//           averageRate: averageRate || 0,
//         });
//       } catch (err) {
//         console.error("Error fetching client data:", err);
//         setError("Failed to load dashboard data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchClientData();
//   }, [user]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-500" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <div className="w-72 bg-slate-900 text-white shadow-md min-h-screen hidden md:block">
//           <nav className="mt-6">
//             <ul className="space-y-2 px-4">
//               <li className="bg-slate-700 rounded-md p-3 flex items-center gap-3">
//                 <FiUser size={18} className="text-gray-300" />
//                 <a href="#profile" className="block font-medium text-white">
//                   Dashboard
//                 </a>
//               </li>
//               <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
//                 <FiBriefcase size={18} className="text-gray-300" />
//                 <a href="#job-history" className="block font-medium text-gray-300">
//                   My Jobs
//                 </a>
//               </li>
//               <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
//                 <FiStar size={18} className="text-gray-300" />
//                 <a href="#talent" className="block font-medium text-gray-300">
//                   Find Talent
//                 </a>
//               </li>
//               <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
//                 <FiMessageSquare size={18} className="text-gray-300" />
//                 <a href="#messages" className="block font-medium text-gray-300">
//                   Messages
//                 </a>
//               </li>
//               <div className="border-t border-slate-700 my-4"></div>
//               <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
//                 <FiSettings size={18} className="text-gray-300" />
//                 <a href="/client/setting" className="block font-medium text-gray-300">
//                   Settings
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-6">
//           {/* Welcome Header */}
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold text-gray-800">Welcome back, {fullname}!</h1>
//             <p className="text-gray-600">Here's what's happening with your jobs today</p>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
//               <h3 className="text-gray-500 text-sm font-medium uppercase">Active Jobs</h3>
//               <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeJobs}</p>
//               <div className="mt-4 text-sm text-gray-600">
//                 <span className="text-green-500">+5%</span> from last month
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
//               <h3 className="text-gray-500 text-sm font-medium uppercase">Total Spent</h3>
//               <p className="text-3xl font-bold text-gray-800 mt-2">Rs {stats.totalSpent}</p>
//               <div className="mt-4 text-sm text-gray-600">
//                 Across {jobs.length} jobs
//               </div>
//             </div>
//             <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
//               <h3 className="text-gray-500 text-sm font-medium uppercase">Avg. Hourly Rate</h3>
//               <p className="text-3xl font-bold text-gray-800 mt-2">Rs {stats.averageRate}/hr</p>
//               <div className="mt-4 text-sm text-gray-600">
//                 Market average: Rs 25/hr
//               </div>
//             </div>
//           </div>

//           {/* Profile Section */}
//           <div id="profile" className="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-100">
//             <div className="flex flex-col md:flex-row md:items-center gap-6">
//               <img
//                 src={profilePic || "https://via.placeholder.com/96"}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full border border-gray-300"
//               />
//               <div className="flex-1">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
//                   <div>
//                     <h1 className="text-2xl font-bold text-gray-800">{fullname}</h1>
//                     <p className="text-gray-600">{location || "Location not specified"}</p>
//                   </div>
//                   <button className="mt-2 md:mt-0 px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-md hover:bg-gray-50">
//                     Edit Profile
//                   </button>
//                 </div>
//                 <p className="text-gray-700">{about || "No description provided."}</p>
//               </div>
//             </div>
//           </div>

//           {/* Job History Section */}
//           <div id="job-history" className="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-100">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold text-gray-800">My Jobs</h2>
//               <button onClick={() => navigate("/client/jobs")} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
//                 Post a Job
//               </button>
//             </div>
//             <div className="border-b border-gray-200 mb-4 pb-2">
//               <ul className="flex space-x-6">
//                 <li className="text-slate-900 font-medium border-b-2 border-slate-900 pb-2">
//                   All Jobs ({jobs.length})
//                 </li>
//                 <li className="text-gray-500 hover:text-slate-900 cursor-pointer">
//                   Active ({jobs.filter((job) => job.status === "Ongoing").length})
//                 </li>
//                 <li className="text-gray-500 hover:text-slate-900 cursor-pointer">
//                   Drafts ({jobs.filter((job) => job.status === "Draft").length})
//                 </li>
//                 <li className="text-gray-500 hover:text-slate-900 cursor-pointer">
//                   Completed ({jobs.filter((job) => job.status === "Completed").length})
//                 </li>
//               </ul>
//             </div>
//             {jobs.length > 0 ? (
//               <div className="space-y-4">
//                 {jobs.map((job) => (
//                   <div
//                     key={job.id}
//                     className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3
//                           className="text-lg font-medium text-slate-900 hover:text-green-600 cursor-pointer"
//                           onClick={() => navigate(`/jobs/${job.id}`)}
//                         >
//                           {job.title}
//                         </h3>
//                         <p className="text-gray-500 text-sm mt-1">Posted on {job.date}</p>
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           job.status === "Completed"
//                             ? "bg-green-100 text-green-800"
//                             : job.status === "Ongoing"
//                             ? "bg-blue-100 text-blue-800"
//                             : "bg-gray-100 text-gray-800"
//                         }`}
//                       >
//                         {job.status}
//                       </span>
//                     </div>
//                     <div className="mt-4 flex justify-between items-center">
//                       <div className="text-sm text-gray-600">
//                         {job.proposals} proposals received
//                       </div>
//                       <button
//                         className="text-green-600 text-sm font-medium hover:text-green-700"
//                         onClick={() => navigate(`/jobs/${job.id}`)}
//                       >
//                         View Details →
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No jobs posted yet.</p>
//             )}
//           </div>

//           {/* Reviews Section */}
//           <div id="reviews" className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
//             <h2 className="text-xl font-semibold text-gray-800 mb-6">Feedback from Freelancers</h2>
//             {reviews.length > 0 ? (
//               <div className="space-y-6">
//                 {reviews.map((review) => (
//                   <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
//                     <div className="flex justify-between items-start">
//                       <div className="flex items-start gap-4">
//                         <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
//                           {review.freelancer.charAt(0)}
//                         </div>
//                         <div>
//                           <p className="font-medium text-slate-900">{review.freelancer}</p>
//                           <div className="flex items-center gap-2 mt-1">
//                             <span className="text-yellow-500 font-semibold">{review.rating}</span>
//                             <div className="flex">
//                               {[...Array(5)].map((_, i) => (
//                                 <svg
//                                   key={i}
//                                   className={`w-4 h-4 ${
//                                     i < Math.floor(review.rating) ? "text-yellow-500" : "text-gray-300"
//                                   }`}
//                                   fill="currentColor"
//                                   viewBox="0 0 20 20"
//                                 >
//                                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                                 </svg>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                       <span className="text-sm text-gray-500">{review.date}</span>
//                     </div>
//                     <p className="mt-4 text-gray-700">{review.feedback}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600">No reviews yet.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDashboard;




















import React, { useEffect, useState, useRef } from "react";
import { FiUser, FiBriefcase, FiStar, FiSettings, FiMessageSquare, FiX, FiCamera } from "react-icons/fi";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "animate.css";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const { user } = auth || {};
  const { fullname, profilePic, location, about, category, skills } = user || {};

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalSpent: 0,
    averageRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: fullname || "",
    location: location || "",
    about: about || "",
    category: category || "",
    skills: skills || [],
    profilePic: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [previewPic, setPreviewPic] = useState(profilePic || "");
  const fileInputRef = useRef(null);

  // Hardcoded reviews (can be made dynamic with a reviews endpoint)
  const reviews = [
    { id: 1, freelancer: "Jane Smith", feedback: "Great client to work with! Clear requirements and prompt payment.", rating: 5, date: "Jan 25, 2024" },
    { id: 2, freelancer: "Mike Johnson", feedback: "Good communication and reasonable expectations. Would work with again.", rating: 4.5, date: "Dec 12, 2023" },
  ];

  useEffect(() => {
    const fetchClientData = async () => {
      if (!user || user.role !== "client") {
        setError("Unauthorized: Only clients can access this dashboard");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8008/api/client/jobs/proposals", {
          withCredentials: true,
        });

        const { jobs: fetchedJobs, proposals } = response.data;

        // Format jobs
        const formattedJobs = fetchedJobs.map((job) => ({
          id: job._id,
          title: job.jobTitle,
          status: job.status || "Draft",
          proposals: proposals.filter((p) => String(p.jobId) === String(job._id)).length,
          date: new Date(job.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        }));

        setJobs(formattedJobs);

        // Calculate stats
        const activeJobs = formattedJobs.filter((job) => job.status === "Ongoing").length;
        const acceptedProposals = proposals.filter((p) => p.status === "Accepted");
        const totalSpent = acceptedProposals.reduce((sum, p) => sum + p.bidAmount, 0);
        const hourlyJobs = acceptedProposals.filter((p) => {
          const job = fetchedJobs.find((j) => String(j._id) === String(p.jobId));
          return job?.jobType === "Hourly";
        });
        const totalHours = hourlyJobs.reduce((sum, p) => sum + (p.bidAmount / 1000), 0);
        const averageRate = hourlyJobs.length > 0 ? (totalSpent / totalHours).toFixed(2) : 0;

        setStats({
          activeJobs,
          totalSpent,
          averageRate: averageRate || 0,
        });
      } catch (err) {
        console.error("Error fetching client data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [user]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle skills input (comma-separated)
  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(",").map((skill) => skill.trim()).filter((skill) => skill);
    setFormData((prev) => ({ ...prev, skills: skillsArray }));
    setFormErrors((prev) => ({ ...prev, skills: "" }));
  };

  // Handle profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setFormErrors((prev) => ({ ...prev, profilePic: "Only JPEG or PNG images are allowed" }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setFormErrors((prev) => ({ ...prev, profilePic: "Image size must be less than 2MB" }));
        return;
      }
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setPreviewPic(URL.createObjectURL(file));
      setFormErrors((prev) => ({ ...prev, profilePic: "" }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.fullname.trim()) errors.fullname = "Full name is required";
    if (!formData.category.trim()) errors.category = "Category is required";
    if (formData.skills.length === 0) errors.skills = "At least one skill is required";
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fullname", formData.fullname);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("about", formData.about);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("skills", formData.skills.join(","));
      if (formData.profilePic instanceof File) {
        formDataToSend.append("profilePic", formData.profilePic);
      }

      const response = await axios.put("http://localhost:8008/user/profile", formDataToSend, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsEditModalOpen(false);
      // Update Redux store or refresh user data
      window.location.reload(); // Temporary; replace with Redux dispatch
    } catch (err) {
      console.error("Error updating profile:", err);
      setFormErrors({ submit: err.response?.data?.message || "Failed to update profile. Please try again." });
    }
  };

  // Open file input
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-72 bg-slate-900 text-white shadow-md min-h-screen hidden md:block animate__animated animate__fadeInLeft">
          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              <li className="bg-slate-700 rounded-md p-3 flex items-center gap-3">
                <FiUser size={18} className="text-gray-300" />
                <a href="#profile" className="block font-medium text-white">
                  Dashboard
                </a>
              </li>
              <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
                <FiBriefcase size={18} className="text-gray-300" />
                <a href="#job-history" className="block font-medium text-gray-300">
                  My Jobs
                </a>
              </li>
              <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
                <FiStar size={18} className="text-gray-300" />
                <a href="#talent" className="block font-medium text-gray-300">
                  Find Talent
                </a>
              </li>
              <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
                <FiMessageSquare size={18} className="text-gray-300" />
                <a href="#messages" className="block font-medium text-gray-300">
                  Messages
                </a>
              </li>
              <div className="border-t border-slate-700 my-4"></div>
              <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
                <FiSettings size={18} className="text-gray-300" />
                <a href="/client/setting" className="block font-medium text-gray-300">
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Welcome Header */}
          <div className="mb-8 animate__animated animate__fadeIn">
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {fullname}!</h1>
            <p className="text-gray-600">Here's what's happening with your jobs today</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate__animated animate__fadeInUp">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Active Jobs</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.activeJobs}</p>
              <div className="mt-4 text-sm text-gray-600">
                <span className="text-green-500">+5%</span> from last month
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Total Spent</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">Rs {stats.totalSpent}</p>
              <div className="mt-4 text-sm text-gray-600">
                Across {jobs.length} jobs
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium uppercase">Avg. Hourly Rate</h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">Rs {stats.averageRate}/hr</p>
              <div className="mt-4 text-sm text-gray-600">
                Market average: Rs 25/hr
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div id="profile" className="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-100 animate__animated animate__fadeInUp">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <img
                src={profilePic || "https://via.placeholder.com/96"}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-gray-300"
              />
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{fullname}</h1>
                    <p className="text-gray-600">{location || "Location not specified"}</p>
                  </div>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="mt-2 md:mt-0 px-4 py-2 bg-white text-slate-800 border border-slate-300 rounded-md hover:bg-gray-50 transition-all animate__animated animate__pulse animate__infinite"
                  >
                    Edit Profile
                  </button>
                </div>
                <p className="text-gray-700">{about || "No description provided."}</p>
                <div className="mt-4">
                  <p className="text-gray-600"><span className="font-medium">Category:</span> {category || "Not specified"}</p>
                  <p className="text-gray-600"><span className="font-medium">Skills:</span> {skills?.length > 0 ? skills.join(", ") : "None specified"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate__animated animate__fadeIn">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 animate__animated animate__zoomIn">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                  <button
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setPreviewPic(profilePic || "");
                      setFormData({
                        fullname: fullname || "",
                        location: location || "",
                        about: about || "",
                        category: category || "",
                        skills: skills || [],
                        profilePic: null,
                      });
                      setFormErrors({});
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={previewPic || "https://via.placeholder.com/96"}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full border border-gray-300 cursor-pointer"
                        onClick={handleImageClick}
                      />
                      <button
                        type="button"
                        onClick={handleImageClick}
                        className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full"
                      >
                        <FiCamera size={16} />
                      </button>
                      <input
                        type="file"
                        accept="image/jpeg,image/png"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                    {formErrors.profilePic && (
                      <p className="text-red-500 text-sm">{formErrors.profilePic}</p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                    {formErrors.fullname && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.fullname}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Software Development, Marketing"
                    />
                    {formErrors.category && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.skills.join(", ")}
                      onChange={handleSkillsChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Web Development, UI/UX, SEO"
                    />
                    {formErrors.skills && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.skills}</p>
                    )}
                  </div>

                  {/* About */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">About</label>
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="Describe your business or needs"
                    />
                  </div>

                  {/* Error Message */}
                  {formErrors.submit && (
                    <p className="text-red-500 text-sm">{formErrors.submit}</p>
                  )}

                  {/* Buttons */}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setPreviewPic(profilePic || "");
                        setFormData({
                          fullname: fullname || "",
                          location: location || "",
                          about: about || "",
                          category: category || "",
                          skills: skills || [],
                          profilePic: null,
                        });
                        setFormErrors({});
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Job History Section */}
          <div id="job-history" className="bg-white shadow-sm rounded-lg p-6 mb-6 border border-gray-100 animate__animated animate__fadeInUp">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">My Jobs</h2>
              <button onClick={() => navigate("/client/jobs")} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Post a Job
              </button>
            </div>
            <div className="border-b border-gray-200 mb-4 pb-2">
              <ul className="flex space-x-6">
                <li className="text-slate-900 font-medium border-b-2 border-slate-900 pb-2">
                  All Jobs ({jobs.length})
                </li>
                <li className="text-gray-500 hover:text-slate-900 cursor-pointer">
                  Active ({jobs.filter((job) => job.status === "Ongoing").length})
                </li>
                <li className="text-gray-500 hover:text-slate-900 cursor-pointer">
                  Drafts ({jobs.filter((job) => job.status === "Draft").length})
                </li>
                <li className="text-gray-500 hover:text-slate-900 cursor-pointer">
                  Completed ({jobs.filter((job) => job.status === "Completed").length})
                </li>
              </ul>
            </div>
            {jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className="text-lg font-medium text-slate-900 hover:text-green-600 cursor-pointer"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                        >
                          {job.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">Posted on {job.date}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : job.status === "Ongoing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {job.proposals} proposals received
                      </div>
                      <button
                        className="text-green-600 text-sm font-medium hover:text-green-700"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No jobs posted yet.</p>
            )}
          </div>

          {/* Reviews Section */}
          <div id="reviews" className="bg-white shadow-sm rounded-lg p-6 border border-gray-100 animate__animated animate__fadeInUp">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Feedback from Freelancers</h2>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                          {review.freelancer.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{review.freelancer}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-yellow-500 font-semibold">{review.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(review.rating) ? "text-yellow-500" : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="mt-4 text-gray-700">{review.feedback}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;