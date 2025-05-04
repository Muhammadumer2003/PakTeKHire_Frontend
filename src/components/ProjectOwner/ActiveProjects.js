import React, { useState } from 'react';

const ActiveProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: 'Project 1',
      status: 'In Progress',
      deadline: 'Dec 20, 2024',
      client: 'John Doe',
      budget: 'Rs 2000 - Rs 4000',
      description: 'This project involves developing a full-stack web application with user authentication and payment integration.',
      milestones: ['Milestone 1: UI Design', 'Milestone 2: Backend Setup', 'Milestone 3: Testing & Deployment'],
    },
    {
      title: 'Project 2',
      status: 'In Progress',
      deadline: 'Jan 10, 2025',
      client: 'Jane Smith',
      budget: 'Rs 5000 - Rs 8000',
      description: 'A mobile app project focused on fitness tracking and AI-based recommendations.',
      milestones: ['Milestone 1: Prototype', 'Milestone 2: API Integration', 'Milestone 3: Final Testing'],
    },
    {
      title: 'Project 3',
      status: 'In Progress',
      deadline: 'Feb 1, 2025',
      client: 'Mike Johnson',
      budget: 'Rs 3000 - Rs 6000',
      description: 'E-commerce platform with real-time order tracking and dynamic pricing features.',
      milestones: ['Milestone 1: Database Setup', 'Milestone 2: Payment Gateway Integration', 'Milestone 3: Security Testing'],
    },
  ];

  const handleViewDetails = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="px-6 py-12 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Active Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex flex-col h-full items-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.status}</p>
              <div className="text-sm text-gray-500 mb-4">
                <p className="mb-1"><strong>Deadline:</strong> {project.deadline}</p>
                <p className="mb-1"><strong>Client:</strong> {project.client}</p>
                <p><strong>Budget:</strong> {project.budget}</p>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <button
                  onClick={() => handleViewDetails(project)}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-gradient-to-r hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 ease-in-out"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Project Details */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
            <p className="text-gray-600 mb-4"><strong>Status:</strong> {selectedProject.status}</p>
            <p className="text-gray-600 mb-4"><strong>Deadline:</strong> {selectedProject.deadline}</p>
            <p className="text-gray-600 mb-4"><strong>Client:</strong> {selectedProject.client}</p>
            <p className="text-gray-600 mb-4"><strong>Budget:</strong> {selectedProject.budget}</p>
            <p className="text-gray-600 mb-4"><strong>Description:</strong> {selectedProject.description}</p>
            <p className="text-gray-600 mb-4"><strong>Milestones:</strong></p>
            <ul className="list-disc list-inside text-gray-600">
              {selectedProject.milestones.map((milestone, index) => (
                <li key={index}>{milestone}</li>
              ))}
            </ul>
            <div className="flex justify-end mt-6">
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
    </div>
  );
};

export default ActiveProjects;
