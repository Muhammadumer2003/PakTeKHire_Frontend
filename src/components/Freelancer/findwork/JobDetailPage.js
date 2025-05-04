import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const JobDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {}; // Destructure job from location.state

  if (!job) {
    return <div>No job data found.</div>;
  }

  const handleApplyNow = () => {
    navigate(`/proposal/${job._id}`, { state: { job } }); // Navigate to proposal page
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Job Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.jobTitle}</h1>

      {/* Job Metadata */}
      <div className="flex flex-wrap gap-4 mb-6">
        <span className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
          {job.jobType}
        </span>
        <span className="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">
          {job.tags?.[1] || 'Tag'}
        </span>
        <span className="bg-yellow-100 text-yellow-600 text-sm font-medium px-3 py-1 rounded-full">
          Budget: PKR {job.budget}
        </span>
        <span className="bg-gray-100 text-gray-600 text-sm font-medium px-3 py-1 rounded-full">
          Proposals: {job.proposals}
        </span>
        {job.isVerified && (
          <span className="flex items-center text-green-600 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Payment Verified
          </span>
        )}
      </div>

      {/* Job Description */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Job Description</h2>
        <p className="text-gray-600 leading-relaxed">{job.jobDescription}</p>
      </div>

      {/* Call to Action */}
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleApplyNow}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetail;