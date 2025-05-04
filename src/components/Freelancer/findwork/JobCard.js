import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job = {} }) => {
  const navigate = useNavigate();
  console.log(job)

  // Destructure job properties with default values
  const {
    _id, // Use _id for MongoDB
    jobTitle = 'No Title',
    location = 'Pakistan',
    jobType = 'Fixed',
    budget = 0,
    jobDescription= 'No Description',
    tags = [], // Default to an empty array
    proposals = '0',
    isVerified = false,
    spent = '0',
  } = job;

  const handleClick = () => {
    // Navigate to the job details page with the job ID as a state parameter
    navigate(`/find-work/${_id}`, { state: { job } });
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100 mb-3 cursor-pointer"
      onClick={handleClick}
    >
      {/* Job Title and Location */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{jobTitle}</h2>
        <p className="text-sm text-gray-500">{location}</p>
      </div>

      {/* Job Details */}
      <div className="flex items-center gap-4 mb-4">
        <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
          {jobType}
        </span>
        <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
          {tags?.[1] || 'Tag'} {/* Fallback if tags[1] is undefined */}
        </span>
        <span className="bg-yellow-100 text-yellow-600 text-xs font-medium px-3 py-1 rounded-full">
          Budget: PKR {budget}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">{jobDescription
      }</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.isArray(tags) && // Ensure tags is an array before mapping
          tags.map((tag, index) => (
            <span
              key={index} // Use index as key if tag is not unique
              className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full hover:bg-gray-200 transition"
            >
              {tag}
            </span>
          ))}
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">Proposals: </p>
          <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            {proposals}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isVerified && (
            <span className="flex items-center text-green-600 text-xs font-medium">
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
          {/* <span className="text-sm text-gray-500">PKR {spent} </span> */}
        </div>
      </div>
    </div>
  );
};

export default JobCard;