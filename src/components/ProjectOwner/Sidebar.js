import React from 'react';
import { FaBars } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) =>{
  
  const client = {
    name: "John Doe",
    profilePicture: "https://via.placeholder.com/150",
    location: "New York, USA",
    about: "We are a digital agency focused on delivering top-notch solutions.",
    totalSpent: 5000,
    averageRate: 35,
    jobsPosted: [
      { id: 1, title: "Website Development", status: "Completed" },
      { id: 2, title: "Mobile App Design", status: "In Progress" },
    ],
    reviews: [
      { id: 1, freelancer: "Jane Smith", feedback: "Great client!", rating: 5 },
      { id: 2, freelancer: "Mike Johnson", feedback: "Clear requirements.", rating: 4.5 },
    ],
  };
  
  
  return (
  // <div
  //   className={`fixed top-0 left-0 z-10 w-64 h-full bg-blue-900 text-white transition-all duration-300 ease-in-out ${
  //     isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
  //   }`}
  // >
  //   <div className="flex items-center justify-between p-4 bg-blue-800">
  //     <h2 className="text-xl font-bold">Dashboard</h2>
  //     <button onClick={toggleSidebar}>
  //       <FaBars />
  //     </button>
  //   </div>
  //   <nav className="mt-4">
  //     <ul>
  //       <li className="p-4 hover:bg-blue-700 cursor-pointer">Dashboard</li>
  //       <li className="p-4 hover:bg-blue-700 cursor-pointer">Projects</li>
  //       <li className="p-4 hover:bg-blue-700 cursor-pointer">Job Postings</li>
  //       <li className="p-4 hover:bg-blue-700 cursor-pointer">Messages</li>
  //       <li className="p-4 hover:bg-blue-700 cursor-pointer">Account Settings</li>
  //     </ul>
  //   </nav>
  // </div>


  <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={client?.profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{client.name}</h1>
            <p className="text-gray-600">{client.location}</p>
          </div>
        </div>
        <p className="mt-4 text-gray-700">{client.about}</p>
        <div className="mt-4 flex gap-6">
          <div>
            <h3 className="font-semibold text-gray-800">Total Spent</h3>
            <p className="text-gray-600">${client.totalSpent}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Avg. Hourly Rate</h3>
            <p className="text-gray-600">${client.averageRate}/hr</p>
          </div>
        </div>
      </div>

      {/* Job History */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Job History</h2>
        {client.jobsPosted.length > 0 ? (
          <ul className="space-y-4">
            {client.jobsPosted.map((job) => (
              <li
                key={job.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span className="text-gray-800 font-medium">{job.title}</span>
                <span
                  className={`${
                    job.status === "Completed"
                      ? "text-green-600"
                      : "text-blue-600"
                  } font-medium`}
                >
                  {job.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No jobs posted yet.</p>
        )}
      </div>

      {/* Reviews */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h2>
        {client.reviews.length > 0 ? (
          <ul className="space-y-4">
            {client.reviews.map((review) => (
              <li key={review.id} className="border-b pb-2">
                <p className="text-gray-800 font-medium">
                  {review.freelancer}
                </p>
                <p className="text-gray-600">{review.feedback}</p>
                <span className="text-yellow-500 font-semibold">
                  {review.rating} ★
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
);
};

export default Sidebar;
