import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Star, ChevronDown, DollarSign, Clock, Calendar } from 'lucide-react';

const WorkHistory = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('completed');
  const [expandedJobs, setExpandedJobs] = useState({});

  // Get user data from Redux store
  const auth = useSelector(state => state.auth);
  const { user } = auth || {};
  const userId = user?._id;

  // Toggle job expansion
  const toggleJobExpansion = (jobId) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  // Fetch job history from backend
  useEffect(() => {
    const fetchJobHistory = async () => {
      if (!userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8008/api/freelancer/proposals', {
          withCredentials: true,
        });

        const proposals = response.data;

        // Filter proposals to include only "Accepted" statuses
        const acceptedProposals = proposals.filter(proposal =>
          proposal.status === 'Accepted'
        );

        // Transform data to match Upwork format with more detailed information
        const jobHistory = acceptedProposals
          .filter(proposal => proposal.job)
          .map(proposal => ({
            id: proposal._id || `job-${Math.random().toString(36).substr(2, 9)}`,
            title: proposal.job?.title || 'Untitled Job',
            description: proposal.job?.description || 'No description available',
            status: proposal.job?.status === 'Ongoing' ? 'In Progress' : 'Completed',
            client: {
              name: proposal.job?.client?.fullname || 'Client Name',
              country: proposal.job?.client?.country || 'Unknown Location',
              rating: 4.9, // Placeholder - would come from real client data
              reviews: 12, // Placeholder - would come from real client data
            },
            duration: proposal.job?.duration || 'Less than 1 month',
            paymentType: proposal.job?.paymentType || 'Fixed Price',
            amount: proposal.bid || proposal.job?.budget || 5000,
            completionDate: proposal.job?.completionDate || new Date().toISOString(),
            rating: proposal.rating || 5,
            feedback: proposal.feedback || "",
            skills: proposal.job?.skills || ['React', 'JavaScript', 'Frontend Development']
          }));

        setJobs(jobHistory);
      } catch (err) {
        console.error('Error fetching job history:', err);
        setError('Failed to load job history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobHistory();
  }, [userId]);

  // Filter jobs based on active tab
  const filteredJobs = jobs.filter(job => {
    if (activeTab === 'completed') return job.status === 'Completed';
    if (activeTab === 'inProgress') return job.status === 'In Progress';
    return true;
  });

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Work History</h2>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-green-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">Work History</h2>
        </div>
        <div className="text-red-500 text-center py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">Work History</h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex px-6">
          <button
            className={`py-4 px-1 mr-6 font-medium text-sm ${
              activeTab === 'completed' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Jobs
          </button>
          <button
            className={`py-4 px-1 mr-6 font-medium text-sm ${
              activeTab === 'inProgress' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('inProgress')}
          >
            In Progress
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="divide-y divide-gray-200">
        {filteredJobs.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No {activeTab === 'completed' ? 'completed' : 'in-progress'} jobs found.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="px-6 py-5">
              {/* Job Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(job.completionDate)}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.duration}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {job.paymentType}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">Rs. {job.amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{job.status}</div>
                </div>
              </div>

              {/* Client Info */}
              <div className="flex items-center mt-3 mb-3">
                <span className="text-sm text-gray-700 mr-2">Client:</span>
                <span className="text-sm font-medium text-gray-900 mr-2">{job.client.name}</span>
                <span className="text-sm text-gray-500 mr-2">{job.client.country}</span>
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className="h-3.5 w-3.5" 
                        fill={i < Math.floor(job.client.rating) ? "#14B8A6" : "none"}
                        stroke={i < Math.floor(job.client.rating) ? "#14B8A6" : "#9CA3AF"}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    {job.client.rating} ({job.client.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Expand/Collapse Section */}
              <button 
                className="flex items-center text-sm font-medium text-green-600 mt-2"
                onClick={() => toggleJobExpansion(job.id)}
              >
                {expandedJobs[job.id] ? "Less details" : "More details"}
                <ChevronDown 
                  className={`h-4 w-4 ml-1 transition-transform ${expandedJobs[job.id] ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Expanded Content */}
              {expandedJobs[job.id] && (
                <div className="mt-4 text-gray-700">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Job Description</h4>
                    <p className="text-sm">{job.description}</p>
                  </div>
                  
                  {job.feedback && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Client Feedback</h4>
                      <div className="flex items-center mb-2">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className="h-4 w-4" 
                              fill={i < job.rating ? "#14B8A6" : "none"}
                              stroke={i < job.rating ? "#14B8A6" : "#9CA3AF"}
                            />
                          ))}
                        </div>
                        <span className="text-sm">{job.rating.toFixed(1)}/5</span>
                      </div>
                      <p className="text-sm italic">"{job.feedback}"</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap">
                      {job.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 mr-2 mb-2 text-xs bg-gray-100 text-gray-700 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default WorkHistory;