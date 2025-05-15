import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActiveProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base API URL (replace with your backend URL)
  const API_URL = 'http://localhost:8008'; // Update with your actual backend URL

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/client/getjobs`);
        if (response.data.success) {
          // Filter jobs with status 'Ongoing' and map to frontend-compatible format
          const ongoingJobs = response.data.jobs
            .filter((job) => job.status === 'Ongoing')
            .map((job) => ({
              title: job.title,
              status: job.status,
              deadline: job.deadline
                ? new Date(job.deadline).toLocaleDateString()
                : 'Not specified', // Format date or handle missing
              client: job.createdBy?.fullname || 'Unknown Client',
              budget:
                job.jobType === 'hourly'
                  ? `Rs ${job.budget.min} - Rs ${job.budget.max}`
                  : `Rs ${job.budget}`,
              description: job.description,
              milestones: job.screeningQuestions?.length
                ? job.screeningQuestions.map((q, i) => `Milestone ${i + 1}: ${q}`)
                : ['No milestones defined'], // Adapt as needed
            }));
          setProjects(ongoingJobs);
        } else {
          setError('Failed to fetch jobs');
        }
      } catch (err) {
        setError('Error fetching jobs: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="px-6 py-12 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Active Projects</h2>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-600">Loading projects...</div>
      )}

      {/* Error State */}
      {error && <div className="text-center text-red-500">{error}</div>}

      {/* Projects Grid */}
      {!loading && !error && projects.length === 0 && (
        <div className="text-center text-gray-600">No ongoing projects found.</div>
      )}
      {!loading && !error && projects.length > 0 && (
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
      )}

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