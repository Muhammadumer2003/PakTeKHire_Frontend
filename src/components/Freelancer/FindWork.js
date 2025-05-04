import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './findwork/Sidebar';
import SearchBar from './findwork/SearchBar';
import JobCard from './findwork/JobCard';
import Tabs from './findwork/Tabs';
import SearchComponent from './findwork/SearchBar';

const FindWork = () => {
  const [activeTab, setActiveTab] = useState('My Feed');
  const tabs = ['My Feed', 'Job Listing'];

  // State to store all jobs fetched from the backend
  const [jobs, setJobs] = useState([]);

  // State to store filtered jobs
  const [filteredJobs, setFilteredJobs] = useState([]);

  // State to track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all jobs from the backend API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8008/client/getjobs', {
          withCredentials: true,
        });
        setJobs(response.data.jobs); // Set the fetched jobs
        setFilteredJobs(response.data.jobs); // Initialize filtered jobs with all jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle search functionality
  const handleSearch = (query) => {
    if (!query) {
      // If the search query is empty, show all jobs
      setFilteredJobs(jobs);
      return;
    }

    // Filter jobs based on title, location, or tags
    const filtered = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
        job.location?.toLowerCase().includes(query.toLowerCase()) ||
        job.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredJobs(filtered);
  };

  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-500" />
        </div>
      );
    }
  

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen font-inter">
      <Sidebar />
      <div className="flex-1 p-4">
        <SearchComponent onSearch={handleSearch} />
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        {/* Display filtered jobs */}
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default FindWork;