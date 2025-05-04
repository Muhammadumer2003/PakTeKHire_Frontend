import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { HiOutlineSearch } from 'react-icons/hi';
import SearchBar from './Searchbar';
import ActiveProjects from './ActiveProjects';
import JobPostings from './JobPostings';
import FreelancerProfiles from './FreelancerProfiles';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64 bg-gray-100">
        <div className="flex  items-center justify-between mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">Welcome to Your Dashboard</h1>
          <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200">
            Post a New Job
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Sections */}
       
          <ActiveProjects />
          <JobPostings />
          <FreelancerProfiles />
        </div>
     
    </div>
  );
};

export default Dashboard;
