import React, { useState } from 'react';
import PostJob from './PostJob';
import JobPostings from './JobPostings';

const JobPostingsContainer = () => {
  const [jobs, setJobs] = useState([
    { title: 'Job Posting 1', description: 'Looking for a skilled freelancer to work on a project.', type: 'Hourly', posted: '2 days ago', budget: '$500 - $1000' },
    { title: 'Job Posting 2', description: 'Seeking a designer for website revamp.', type: 'Fixed Price', posted: '3 days ago', budget: '$1000 - $2000' },
    { title: 'Job Posting 3', description: 'Need an expert developer for mobile app creation.', type: 'Hourly', posted: '5 days ago', budget: '$700 - $1200' },
  ]);

  const handlePostJob = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  return (
    <div>
      <div className="px-6 py-12 bg-gray-50">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Job Postings</h2>
        <PostJob onPostJob={handlePostJob} />
        <JobPostings jobs={jobs} />
      </div>
    </div>
  );
};

export default JobPostingsContainer;
