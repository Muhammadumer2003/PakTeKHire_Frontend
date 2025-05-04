import React, { useState } from 'react';

const JobPostings = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [proposals, setProposals] = useState([
    { job: 'Job Posting 1', text: 'I have extensive experience in React.js and REST APIs. I can deliver the project efficiently.', bid: 'Rs 8,000' },
    { job: 'Job Posting 2', text: 'I am an expert content writer with knowledge of SEO. I can produce high-quality articles for your blog.', bid: 'Rs 2,500' },
    { job: 'Job Posting 3', text: 'As a graphic designer, I have a strong portfolio and can create a professional branding package for you.', bid: 'Rs 12,000' },
  ]);
  const [viewProposals, setViewProposals] = useState(false);
  const [proposalText, setProposalText] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  const jobs = [
    {
      title: 'Job Posting 1',
      description: 'Looking for a skilled freelancer to develop a responsive e-commerce website.',
      type: 'Hourly',
      posted: '2 days ago',
      budget: 'Rs 5,000 - Rs 10,000',
      requirements: ['Experience in React.js', 'Knowledge of REST APIs', 'Strong debugging skills'],
    },
    {
      title: 'Job Posting 2',
      description: 'Need a content writer to produce SEO-friendly articles for a tech blog.',
      type: 'Fixed Price',
      posted: '5 days ago',
      budget: 'Rs 2,000 per article',
      requirements: ['Proficiency in English', 'SEO knowledge', 'Ability to meet tight deadlines'],
    },
    {
      title: 'Job Posting 3',
      description: 'Looking for a designer to create a branding package including a logo and social media assets.',
      type: 'Fixed Price',
      posted: '1 week ago',
      budget: 'Rs 8,000 - Rs 15,000',
      requirements: ['Experience in graphic design', 'Proficiency in Adobe Illustrator', 'Strong portfolio'],
    },
  ];

  const handleViewJob = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setProposalText('');
    setBidAmount('');
  };

  const handleSubmitProposal = () => {
    if (proposalText.trim() === '' || bidAmount.trim() === '') {
      alert('Please write a proposal and enter your bid amount before submitting.');
      return;
    }
    const newProposal = {
      job: selectedJob.title,
      text: proposalText,
      bid: bidAmount,
    };
    setProposals([...proposals, newProposal]);
    alert('Proposal submitted successfully!');
    closeModal();
  };

  const handleViewProposals = () => {
    setViewProposals(true);
  };

  const closeProposalsModal = () => {
    setViewProposals(false);
  };

  return (
    <div className="px-6 py-12 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Job Postings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <div className="text-sm text-gray-500 mb-4">
                <p className="mb-1"><strong>Type:</strong> {job.type}</p>
                <p className="mb-1"><strong>Posted:</strong> {job.posted}</p>
                <p><strong>Budget:</strong> {job.budget}</p>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() => handleViewJob(job)}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-gradient-to-r hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 ease-in-out"
                >
                  View Job
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleViewProposals}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
        >
          View Proposals
        </button>
      </div>

      {/* Modal for Job Details */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{selectedJob.title}</h3>
            <p className="text-gray-600 mb-4"><strong>Description:</strong> {selectedJob.description}</p>
            <p className="text-gray-600 mb-4"><strong>Type:</strong> {selectedJob.type}</p>
            <p className="text-gray-600 mb-4"><strong>Posted:</strong> {selectedJob.posted}</p>
            <p className="text-gray-600 mb-4"><strong>Budget:</strong> {selectedJob.budget}</p>
            <p className="text-gray-600 mb-4"><strong>Requirements:</strong></p>
            <ul className="list-disc list-inside text-gray-600">
              {selectedJob.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
            <textarea
              placeholder="Write your proposal here..."
              className="w-full mt-4 p-2 border rounded-lg"
              value={proposalText}
              onChange={(e) => setProposalText(e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="Enter your bid amount..."
              className="w-full mt-4 p-2 border rounded-lg"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmitProposal}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mr-2"
              >
                Submit Proposal
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Viewing Proposals */}
      {viewProposals && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Submitted Proposals</h3>
            {proposals.length === 0 ? (
              <p className="text-gray-600">No proposals submitted yet.</p>
            ) : (
              <ul className="divide-y divide-gray-300">
                {proposals.map((proposal, index) => (
                  <li key={index} className="py-4">
                    <p className="text-gray-800 font-semibold">{proposal.job}</p>
                    <p className="text-gray-600 mt-2">{proposal.text}</p>
                    <p className="text-gray-500 mt-1">Bid: <strong>{proposal.bid}</strong></p>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={closeProposalsModal}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostings;
