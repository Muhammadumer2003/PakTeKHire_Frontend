/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Calendar, Clock, ThumbsUp, ThumbsDown, FileText, MessageSquare, User, DollarSign, Award, Briefcase } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const ClientProposalChecking = () => {
  const [jobs, setJobs] = useState([]);
  const [proposals, setProposals] = useState({});
  const [expandedJobs, setExpandedJobs] = useState({});
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const navigate = useNavigate();

  const handleClick = (freelancerId) => {
    navigate(`/client/chat/${freelancerId}`);
  };

  

  useEffect(() => {
    const fetchJobsAndProposals = async () => {
      try {
        const response = await fetch('http://localhost:8008/api/client/jobs/proposals', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setJobs(data.jobs);
          
          const proposalsByJob = {};
          data.proposals.forEach(proposal => {
            if (!proposalsByJob[proposal.jobId]) {
              proposalsByJob[proposal.jobId] = [];
            }
            proposalsByJob[proposal.jobId].push(proposal);
          });
          setProposals(proposalsByJob);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobsAndProposals();
  }, []);

  const toggleProposals = (jobId) => {
    setExpandedJobs((prevExpandedJobs) => ({
      ...prevExpandedJobs,
      [jobId]: !prevExpandedJobs[jobId],
    }));
    
    // Reset selected proposal when collapsing job
    if (expandedJobs[jobId]) {
      setSelectedProposal(null);
    }
  };

  const handleSelectProposal = (proposal) => {
    setSelectedProposal(proposal._id === selectedProposal?._id ? null : proposal);
  };

  const handleHireFreelancer = async (proposalId, jobId) => {
    try {
      const response = await fetch(`http://localhost:8008/api/client/proposals/${proposalId}/hire`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        // Update local state to reflect the hire
        const updatedProposals = { ...proposals };
        updatedProposals[jobId] = updatedProposals[jobId].map(p => 
          p._id === proposalId ? { ...p, status: 'Accepted' } : p
        );
        setProposals(updatedProposals);
      }
    } catch (error) {
      console.error('Error hiring freelancer:', error);
    }
  };

  const handleRejectFreelancer = async (proposalId, jobId) => {
    try {
      const response = await fetch(`http://localhost:8008/api/client/proposals/${proposalId}/reject`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        const updatedProposals = { ...proposals };
        updatedProposals[jobId] = updatedProposals[jobId].map(p => 
          p._id === proposalId ? { ...p, status: 'Rejected' } : p
        );
        setProposals(updatedProposals);
      }
    } catch (error) {
      console.error('Error rejecting freelancer:', error);
    }
  };

  const renderProposalMetrics = (jobId) => {
    const jobProposals = proposals[jobId] || [];
    const avgBid = jobProposals.reduce((acc, cur) => acc + cur.bidAmount, 0) / (jobProposals.length || 1);
    const pendingProposals = jobProposals.filter(p => p.status === 'Pending').length;
    const acceptedProposals = jobProposals.filter(p => p.status === 'Accepted').length;
    
    return (
      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
        <MetricCard 
          title="Total Proposals" 
          value={jobProposals.length} 
          icon={<Briefcase className="h-5 w-5 text-blue-500" />} 
        />
        <MetricCard 
          title="Average Bid" 
          value={`PKR ${avgBid.toFixed(0)}`} 
          icon={<DollarSign className="h-5 w-5 text-green-500" />} 
        />
        <MetricCard 
          title="Pending Review" 
          value={pendingProposals} 
          icon={<Clock className="h-5 w-5 text-orange-500" />} 
        />
        <MetricCard 
          title="Hired" 
          value={acceptedProposals} 
          icon={<Award className="h-5 w-5 text-purple-500" />} 
        />
      </div>
    );
  };

  const MetricCard = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-gray-600">{title}</span>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );

  const getStatusBadge = (status) => {
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Accepted: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  const filteredJobs = jobs.filter(job => {
    return job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Job Proposals</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="all">All Proposals</option>
                <option value="pending">Pending Review</option>
                <option value="accepted">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No jobs found matching your search.</p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job._id} className="mb-8 last:mb-0">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.jobTitle}</h2>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            Budget: PKR {job.budget}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.jobType}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleProposals(job._id)}
                        className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
                      >
                        {expandedJobs[job._id] ? (
                          <>Hide Proposals <ChevronUp className="h-5 w-5" /></>
                        ) : (
                          <>View Proposals ({(proposals[job._id] || []).length}) <ChevronDown className="h-5 w-5" /></>
                        )}
                      </button>
                    </div>

                    {expandedJobs[job._id] && (
                      <div className="mt-6">
                        {renderProposalMetrics(job._id)}

                        {/* Upwork-like two-panel layout */}
                        <div className="flex gap-6">
                          {/* Left panel: Proposal list */}
                          <div className="w-1/3 border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 p-4 border-b border-gray-200">
                              <h3 className="font-medium text-gray-700">Freelancers ({(proposals[job._id] || []).length})</h3>
                            </div>
                            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                              {(proposals[job._id] || [])
                                .filter(proposal => {
                                  if (activeFilter === 'all') return true;
                                  if (activeFilter === 'pending') return proposal.status === 'Pending';
                                  if (activeFilter === 'accepted') return proposal.status === 'Accepted';
                                  if (activeFilter === 'rejected') return proposal.status === 'Rejected';
                                  return true;
                                })
                                .map((proposal) => (
                                <div 
                                  key={proposal._id} 
                                  className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedProposal?._id === proposal._id ? 'bg-green-50 border-l-4 border-green-500' : ''}`}
                                  onClick={() => handleSelectProposal(proposal)}
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                      <span className="font-bold text-green-600">
                                        {proposal.freelancerId?.name?.[0]?.toUpperCase() || 'F'}
                                      </span>
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-800">{proposal.freelancerId?.fullname || 'Freelancer'}</h4>
                                      <p className="text-xs text-gray-500">Applied {new Date(proposal.submittedAt).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium">PKR {proposal.bidAmount}</span>
                                    {getStatusBadge(proposal.status)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Right panel: Selected proposal details */}
                          <div className="w-2/3 border border-gray-200 rounded-lg overflow-hidden">
                            {selectedProposal ? (
                              <div>
                                <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                                  <h3 className="font-medium text-gray-700">Proposal Details</h3>
                                  <div>
                                    {getStatusBadge(selectedProposal.status)}
                                  </div>
                                </div>
                                <div className="p-6">
                                  <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl font-bold text-green-600">
                                          {selectedProposal.freelancerId?.name?.[0]?.toUpperCase() || 'F'}
                                        </span>
                                      </div>
                                      <div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                          {selectedProposal.freelancerId?.fullname || 'Freelancer'}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                          Applied {new Date(selectedProposal.submittedAt).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-2xl font-bold text-gray-900">
                                        PKR {selectedProposal.bidAmount}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="mb-8">
                                    <h4 className="font-medium text-gray-700 mb-3">Cover Letter</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                                      {selectedProposal.proposalText}
                                    </div>
                                  </div>

                                  {/* {selectedProposal.attachments && selectedProposal.attachments.length > 0 && (
                                    <div className="mb-8">
                                      <h4 className="font-medium text-gray-700 mb-3">Attachments</h4>
                                      <div className="flex flex-wrap gap-3">
                                        {selectedProposal.attachments.map((attachment, index) => (
                                          <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                                            <FileText className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm text-gray-700">{attachment.split('/').pop()}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )} */}
                                {selectedProposal.attachments && selectedProposal.attachments.length > 0 && (
  <div className="mb-8">
    <h4 className="font-medium text-gray-700 mb-3">Attachments</h4>
    <div className="flex flex-wrap gap-3">
      {selectedProposal.attachments.map((attachment, index) => (
        <div key={index} className="flex items-center gap-4 bg-gray-50 px-4 py-3 rounded-lg shadow-sm">
          <FileText className="h-5 w-5 text-blue-500" />
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 mb-1">
              {attachment.split('/').pop()}
            </span>
            <div className="flex gap-2">
              {/* Viewing the PDF using iframe or embed */}
              <a
                href={attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
              >
                View
              </a>
              {/* Downloading the PDF */}
              <a
                href={attachment}
                download
                className="text-xs text-white bg-green-500 px-2 py-1 rounded hover:bg-green-600"
              >
                Download
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

                                  
                                  <div className="flex gap-3">
                                    {selectedProposal.status === 'Pending' && (
                                      <>
                                        <button 
                                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                                          onClick={() => handleHireFreelancer(selectedProposal._id, selectedProposal.jobId)}
                                        >
                                          <Award className="h-4 w-4" /> Hire Now
                                        </button>
                                        <button 
                                          className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center gap-2"
                                          onClick={() => handleRejectFreelancer(selectedProposal._id, selectedProposal.jobId)}
                                        >
                                          <ThumbsDown className="h-4 w-4" /> Decline
                                        </button>
                                      </>
                                    )}

                                  <Link to={`/client/chat/${selectedProposal?.freelancerId?._id}`}>
                                  <button
                                 
                               
                                className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition flex items-center gap-2">
                                  <MessageSquare className="h-4 w-4" /> Message
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                                  <Calendar className="h-4 w-4" /> Schedule Interview
                                </button>
                                  </Link>
                                    
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-96 text-gray-500">
                                <User className="h-12 w-12 mb-4 text-gray-300" />
                                <p>Select a freelancer to view their proposal</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProposalChecking;