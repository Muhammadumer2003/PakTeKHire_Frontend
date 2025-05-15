import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProposalDetails = () => {
  const { proposalId } = useParams(); // Get proposalId from URL
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProposalDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8008/api/proposals/${proposalId}`, {
          withCredentials: true,
        });

        setProposal(response.data);
      } catch (err) {
        console.error('Error fetching proposal details:', err);
        setError('Failed to load proposal details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProposalDetails();
  }, [proposalId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-blue-100 text-blue-800';
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white border border-gray-200 rounded-lg px-6 py-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">Proposal not found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/applied-jobs')}
            className="text-sm text-green-600 hover:text-green-700 flex items-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to My Proposals
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">
            Proposal for {proposal.job?.title || 'Untitled Job'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Submitted on {formatDate(proposal.submittedAt)}
          </p>
        </div>

        {/* Proposal Details Card */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-5">
            {/* Job Info */}
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900">Job Details</h2>
              <div className="mt-4">
                <h3 className="text-md font-medium text-gray-900">{proposal.job?.title}</h3>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <span>{proposal.job?.category}</span>
                  {proposal.job?.subCategory && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{proposal.job.subCategory}</span>
                    </>
                  )}
                  {proposal.job?.experienceLevel && (
                    <>
                      <span className="mx-1">•</span>
                      <span>
                        {proposal.job.experienceLevel.charAt(0).toUpperCase() + 
                         proposal.job.experienceLevel.slice(1)} Level
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {proposal.job?.description}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Project Type:</span>{' '}
                      {proposal.job?.jobType === 'hourly' ? 'Hourly Rate' : 'Fixed Price'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-medium text-gray-700">Budget:</span>{' '}
                      {proposal.job?.jobType === 'hourly' && proposal.job?.budget
                        ? `PKR ${proposal.job.budget.min} - ${proposal.job.budget.max}/hr`
                        : proposal.job?.budget
                        ? `PKR ${proposal.job.budget}`
                        : 'Not specified'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-medium text-gray-700">Project Scope:</span>{' '}
                      {proposal.job?.projectScope && 
                        proposal.job.projectScope.replace(/_/g, ' ').split(' ').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Duration:</span>{' '}
                      {proposal.job?.duration && proposal.job.duration.replace(/_/g, ' ')}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-medium text-gray-700">Location:</span>{' '}
                      {proposal.job?.location || 'Worldwide'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-medium text-gray-700">Posted:</span>{' '}
                      {proposal.job?.createdAt && formatDate(proposal.job.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Skills Required:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {proposal.job?.skills?.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {proposal.job?.attachments && proposal.job.attachments.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Job Attachments:</p>
                    <div className="mt-2 flex flex-wrap gap-4">
                      {proposal.job.attachments.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                          Attachment {index + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Proposal Info */}
            <div className="mb-6 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900">Your Proposal</h2>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Status:</span>
                    <span className={`ml-2 rounded-full px-2 py-1 inline-block text-xs font-medium ${getStatusBadgeClasses(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted on {formatDate(proposal.submittedAt)}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  <span className="font-medium text-gray-700">Your Bid:</span>{' '}
                  PKR {proposal.bidAmount || 'Not specified'}
                  {proposal.job?.jobType === 'hourly' ? '/hr' : ''}
                </p>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Cover Letter:</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{proposal.coverLetter || 'No cover letter provided'}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Project Approach:</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{proposal.proposalText || 'No project approach provided'}</p>
                </div>
              </div>
            </div>

            {/* Proposal Attachments */}
            {proposal.attachments && proposal.attachments.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium text-gray-900">Your Attachments</h2>
                <div className="mt-4 flex flex-wrap gap-4">
                  {proposal.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      Attachment {index + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end space-x-4">
            {(proposal.status === 'Accepted' || proposal.status === 'Rejected') && (
              <button
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                onClick={() => navigate(`/chat/${proposal.job?.createdBy}`)}
              >
                Message Client
              </button>
            )}
            <button
              className="text-sm font-medium text-green-600 hover:text-green-700"
              onClick={() => navigate(`/jobs/${proposal.job?._id}`)}
            >
              View Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetails;