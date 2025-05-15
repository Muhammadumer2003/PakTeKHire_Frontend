import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  // Early return if job is null or undefined
  if (!job) {
    console.error('JobCard received null or undefined job');
    return null;
  }

  // Debug logging
  console.log('JobCard received job:', {
    id: job._id,
    title: job.title,
    type: job.jobType,
    budget: job.budget
  });

  // Format budget based on jobType
  const formatBudget = () => {
    if (!job.jobType) return 'Budget TBD';

    if (job.jobType.toLowerCase() === 'hourly') {
      if (job.budget && typeof job.budget === 'object') {
        return `$${job.budget.min} - $${job.budget.max}/hr`;
      }
      return 'Hourly Rate TBD';
    }
    
    if (job.jobType.toLowerCase() === 'fixed') {
      return typeof job.budget === 'number' 
        ? `$${job.budget} Fixed Price`
        : 'Fixed Price TBD';
    }
    
    return 'Budget TBD';
  };

  // Format date safely
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date unavailable';
    }
  };

  // If no _id, try to use alternative identifiers
  const jobId = job._id || job.id || 'undefined';
  
  if (!jobId || jobId === 'undefined') {
    console.error('Job has no valid ID:', job);
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              This job posting is missing some information. Please contact support if this persists.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <Link to={`/find-work/${job._id}`}>
            <h2 className="text-lg font-semibold text-gray-900 hover:text-green-500">
              {job.title}
            </h2>
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            Posted {formatDate(job.createdAt)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-700 font-medium">{formatBudget()}</p>
          <p className="text-sm text-gray-500 capitalize">{job.jobType}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-600 line-clamp-3">
          {job.description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills?.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span className="capitalize">{job.experienceLevel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{job.category} - {job.subCategory}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="capitalize">{job.duration?.replace(/_/g, ' ')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="capitalize">{job.location}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {job.attachments?.length > 0 && (
            <span className="text-sm text-gray-500">
              📎 {job.attachments.length} attachment{job.attachments.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <Link
          to={`/find-work/${job._id}`}
          className="text-green-500 hover:text-green-700 font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default JobCard;