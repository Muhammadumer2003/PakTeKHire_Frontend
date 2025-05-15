import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './findwork/Sidebar';
import SearchBar from './findwork/SearchBar';
import JobCard from './findwork/JobCard';
import Tabs from './findwork/Tabs';
import SearchComponent from './findwork/SearchBar';
import { useSelector } from 'react-redux';

const FindWork = () => {
  const [activeTab, setActiveTab] = useState('My Feed');
  const tabs = ['My Feed', 'Job Listing'];
  const ssel = useSelector(store => store.auth);
  const { user } = ssel;
  const { category, fullname, profilePic, skills } = user || {};

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Debug: Log the jobs data
  useEffect(() => {
    console.log('Jobs:', jobs);
    console.log('Filtered Jobs:', filteredJobs);
    console.log('Current Jobs:', currentJobs);
  }, [jobs, filteredJobs, currentJobs]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-1 mx-1 rounded bg-gray-300"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === index + 1 ? 'bg-green-500 text-white' : 'bg-gray-300'
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 mx-1 rounded bg-gray-300"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8008/client/getjobs', {
          withCredentials: true,
        });
        console.log('API Response:', response.data);
        setJobs(response.data.jobs || []);
        setFilteredJobs(response.data.jobs || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError(error.response?.data?.message || 'Failed to fetch jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredJobs(jobs);
      console.log('Search: Reset to all jobs');
      return;
    }

    const filtered = jobs.filter(
      (job) =>
        job?.jobTitle?.toLowerCase().includes(query?.toLowerCase()) ||
        job?.location?.toLowerCase().includes(query?.toLowerCase()) ||
        job?.skills?.some((skill) => skill?.toLowerCase().includes(query?.toLowerCase()))
    );
    setFilteredJobs(filtered);
    console.log('Search: Filtered jobs:', filtered);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'Job Listing') {
      const skillsArray = Array.isArray(skills) ? skills : (skills ? skills.split(',') : []);
      console.log('User Skills:', skillsArray);
      if (skillsArray.length === 0) {
        setFilteredJobs(jobs);
        console.log('Tab: Job Listing - No user skills, showing all jobs');
      } else {
        const filtered = jobs.filter((job) =>
          job.skills?.length > 0 && job.skills.some((skill) => skillsArray.includes(skill))
        );
        setFilteredJobs(filtered);
        console.log('Tab: Job Listing - Filtered jobs:', filtered);
      }
    } else {
      setFilteredJobs(jobs);
      console.log('Tab: My Feed - Reset to all jobs');
    }
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
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={handleTabClick} />
        {currentJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          currentJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        )}
        {renderPagination()}
      </div>
    </div>
  );
};

export default FindWork;