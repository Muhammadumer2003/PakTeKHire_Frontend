import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AppliedJobs = () => {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // Default to "all" to match your screenshot
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8008/api/freelancer/proposals",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setProposals(response.data);
          console.log("Fetched proposals:", response.data); // Debug the response
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
        setError("Failed to fetch proposals");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeSinceSubmission = (dateString) => {
    const submittedDate = new Date(dateString);
    const currentDate = new Date();
    const differenceInMs = currentDate - submittedDate;
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) {
      return "Today";
    } else if (differenceInDays === 1) {
      return "Yesterday";
    } else if (differenceInDays < 7) {
      return `${differenceInDays} days ago`;
    } else if (differenceInDays < 30) {
      const weeks = Math.floor(differenceInDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else {
      const months = Math.floor(differenceInDays / 30);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
  };

  // Filter proposals based on active tab
  const filteredProposals = proposals.filter((proposal) => {
    if (activeTab === "pending") return proposal.status === "Pending";
    if (activeTab === "accepted") return proposal.status === "Accepted";
    if (activeTab === "rejected") return proposal.status === "Rejected";
    return true; // For 'all' tab
  });

  // Status badge styling
  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-blue-100 text-blue-800";
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Navigate to chat with client
  const messageClient = (clientId) => {
    console.log("Client ID:", clientId); // Debug the client ID
    if (clientId) {
      navigate(`/chat/${clientId}`);
    } else {
      console.error("Client ID is undefined for this proposal");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-500" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              My Proposals
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage your submitted proposals
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("pending")}
                className={`whitespace-nowrap py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
                  activeTab === "pending"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab("accepted")}
                className={`whitespace-nowrap py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
                  activeTab === "accepted"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Accepted
              </button>
              <button
                onClick={() => setActiveTab("rejected")}
                className={`whitespace-nowrap py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
                  activeTab === "rejected"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Rejected
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`whitespace-nowrap py-4 px-1 mr-8 font-medium text-sm border-b-2 ${
                  activeTab === "all"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Proposals
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 mb-6">
            <div>
              <span className="text-sm font-medium text-gray-700">
                {filteredProposals.length}{" "}
                {filteredProposals.length === 1 ? "proposal" : "proposals"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <select
                className="text-sm text-gray-700 border-none bg-transparent focus:ring-0"
                defaultValue="newest"
              >
                <option value="newest">Date submitted: newest first</option>
                <option value="oldest">Date submitted: oldest first</option>
              </select>
            </div>
          </div>

          {/* Proposal List */}
          {filteredProposals.length > 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              {filteredProposals.map((proposal, index) => (
                <div
                  key={proposal._id}
                  className={`border-b border-gray-200 ${
                    index === filteredProposals.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <div
                    className="px-6 py-5 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/jobs/${proposal.jobId}`)}
                  >
                    <div className="flex justify-between">
                      <div className="w-3/4">
                        <h3 className="text-lg font-medium text-gray-900 hover:text-green-600">
                          {proposal.job?.title || "Job Title"}
                        </h3>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <span className="truncate">
                            {proposal.job?.category || "Uncategorized"}
                          </span>
                          <span className="mx-1">•</span>
                          {proposal.job?.expertise && (
                            <>
                              <span>{proposal.job?.expertise}</span>
                              <span className="mx-1">•</span>
                            </>
                          )}
                          <span>
                            Posted{" "}
                            {proposal.job?.createdAt
                              ? formatDate(proposal.job.createdAt)
                              : "Recently"}
                          </span>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {proposal.job?.description?.substring(0, 200) ||
                              "No description provided"}
                            {proposal.job?.description?.length > 200
                              ? "..."
                              : ""}
                          </p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {proposal.job?.skills?.slice(0, 5).map((skill, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {skill}
                            </span>
                          ))}
                          {proposal.job?.skills?.length > 5 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{proposal.job.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          PKR {proposal.bidAmount || "Not specified"}
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {proposal.job?.jobType || "Fixed Price"}
                        </div>
                        <div className="mt-4 text-sm">
                          <div
                            className={`rounded-full px-2 py-1 inline-block text-xs font-medium ${getStatusBadgeClasses(
                              proposal?.status
                            )}`}
                          >
                            {proposal.status}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Submitted{" "}
                          {getTimeSinceSubmission(proposal.submittedAt)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Proposal Details */}
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-900 mr-2">
                          Your proposal:
                        </span>
                        <span className="text-gray-500 line-clamp-1">
                          {proposal.proposalText?.substring(0, 100) ||
                            "No proposal text"}
                          {proposal.proposalText?.length > 100 ? "..." : ""}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        {proposal.attachments &&
                          proposal.attachments.length > 0 && (
                            <div className="flex items-center text-sm text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
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
                              <span>
                                {proposal.attachments.length}{" "}
                                {proposal.attachments.length === 1
                                  ? "attachment"
                                  : "attachments"}
                              </span>
                            </div>
                          )}
                        <button
                          className="text-sm font-medium text-green-600 hover:text-green-700"
                          onClick={() => navigate(`/jobs/${proposal.jobId}`)}
                        >
                          View Details
                        </button>
                        {(proposal.status === "Accepted" ||
                          proposal.status === "Rejected") && (
                          <button
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            onClick={() => messageClient(proposal.job?.createdBy)}
                          >
                            Message Client
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg px-6 py-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No {activeTab !== "all" ? activeTab : ""} proposals
              </h3>
              <p className="mt-1 text-gray-500">
                {activeTab === "pending" &&
                  "You don't have any pending proposals."}
                {activeTab === "accepted" &&
                  "You don't have any accepted proposals yet."}
                {activeTab === "rejected" &&
                  "You don't have any rejected proposals."}
                {activeTab === "all" && "You haven't submitted any proposals yet."}
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/find-work")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Find Jobs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;