import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root'); // Set the root element for accessibility

const ProposalModal = ({ isOpen, onRequestClose, proposals, onProposalAction }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Proposals Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Proposals</h2>
      {proposals.length > 0 ? (
        proposals.map((proposal) => (
          <div key={proposal._id} className="mb-6 p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-xl font-bold">
                  {proposal.freelancerId?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-gray-800 font-medium">
                  Freelancer: {proposal.freelancerId?.name || 'Unknown'}
                </p>
                <p className="text-gray-500 text-sm">
                  Submitted on: {new Date(proposal.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{proposal.proposalText}</p>
            <p className="text-gray-800 font-medium">Bid Amount: PKR {proposal.bidAmount}</p>
            <p className="text-gray-700 mt-2">Status: {proposal.status || "Pending"}</p>

            {/* Accept & Reject Buttons */}
            {proposal.status === "Pending" && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => onProposalAction(proposal._id, "Accepted")}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => onProposalAction(proposal._id, "Rejected")}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No proposals found for this job.</p>
      )}
      <button onClick={onRequestClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Close
      </button>
    </ReactModal>
  );
};

export default ProposalModal;