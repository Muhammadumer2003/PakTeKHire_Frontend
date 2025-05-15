import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) {
      setError('Invalid job ID');
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        const url = `http://localhost:8008/jobs/${jobId}`;
        const response = await axios.get(url, {
          withCredentials: true,
        });

        if (!response.data || !response.data.job) {
          throw new Error('Invalid response format from server');
        }

        setJob(response.data.job);
      } catch (err) {
        console.error('Error fetching job details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        
        if (err.response?.status === 404) {
          setError('Job not found. It may have been removed or is no longer available.');
        } else {
        setError('Failed to load job details. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error Loading Job</h3>
              <p className="mt-2 text-sm text-red-700">{error}</p>
              <button 
                onClick={() => navigate('/find-work')}
                className="mt-4 text-sm font-medium text-red-600 hover:text-red-500"
              >
                ← Back to Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleApplyNow = () => {
    navigate(`/proposal/${jobId}`, { state: { job } });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{job.category} - {job.subCategory}</span>
                <span>•</span>
                <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <button
              onClick={handleApplyNow}
              className="bg-[#14a800] text-white px-6 py-2 rounded-md hover:bg-[#14a800]/90 transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Job Details Section */}
        <div className="p-6">
          {/* Budget and Terms */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Budget and Terms</h2>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-medium text-gray-900">
                  {job.jobType === 'hourly' && job.budget
                    ? `$${job.budget.min} - $${job.budget.max}/hr`
                    : job.budget
                    ? `$${job.budget} Fixed Price`
                    : 'Budget not specified'
                  }
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Experience Level</p>
                <p className="font-medium text-gray-900 capitalize">{job.experienceLevel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Project Scope</p>
                <p className="font-medium text-gray-900 capitalize">{job.projectScope}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium text-gray-900 capitalize">{job.duration?.replace(/_/g, ' ')}</p>
              </div>
            </div>
      </div>

      {/* Job Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
            <div className="prose max-w-none text-gray-600">
              {job.description}
            </div>
      </div>

          {/* Skills */}
          {job.skills?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Attachments */}
          {job.attachments?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Attachments</h2>
              <div className="flex flex-wrap gap-3">
                {job.attachments.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Attachment {index + 1}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Activity */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>Status: <span className="capitalize">{job.status}</span></div>
              <div>Location: <span className="capitalize">{job.location}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;