import React, { useState } from 'react';

const FreelancerProfiles = () => {
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const freelancers = [
    {
      name: 'Freelancer 1',
      avatar: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
      role: 'Web Developer',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      rate: 'Rs 30/hr',
      reviews: '100+ reviews',
      successRate: '95%',
      bio: 'Passionate web developer with 5+ years of experience in creating responsive and dynamic websites. Specialized in crafting user-centric web applications.',
      portfolio: ['E-commerce Website', 'Portfolio Website', 'Landing Page Design'],
      location: 'Lahore, Pakistan',
    },
    {
      name: 'Freelancer 2',
      avatar: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
      role: 'UI/UX Designer',
      skills: ['Figma', 'Sketch', 'Adobe XD'],
      rate: 'Rs 40/hr',
      reviews: '50+ reviews',
      successRate: '90%',
      bio: 'Creative UI/UX designer with a talent for creating engaging and user-friendly designs.',
      portfolio: ['Mobile App Design', 'Dashboard Design', 'Website Redesign'],
      location: 'Karachi, Pakistan',
    },
    {
      name: 'Freelancer 3',
      avatar: 'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
      role: 'Backend Developer',
      skills: ['Node.js', 'MongoDB', 'Express.js'],
      rate: 'Rs 50/hr',
      reviews: '200+ reviews',
      successRate: '98%',
      bio: 'Backend developer skilled in building high-performance, scalable server-side applications.',
      portfolio: ['API Development', 'Database Optimization', 'Microservices Architecture'],
      location: 'Islamabad, Pakistan',
    },
  ];

  const handleViewProfile = (freelancer) => {
    setSelectedFreelancer(freelancer);
  };

  const closeModal = () => {
    setSelectedFreelancer(null);
  };

  return (
    <div className="px-6 py-12 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Browse Freelancers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {freelancers.map((freelancer, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                <img
                  src={freelancer.avatar}
                  alt={`${freelancer.name} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{freelancer.name}</h3>
                <p className="text-gray-500">{freelancer.role}</p>
                <p className="text-gray-500 text-sm">
                  Job Success: <span className="text-green-500">{freelancer.successRate}</span>
                </p>
              </div>
            </div>

            <div className="text-gray-700 mt-4">
              <p className="text-base mb-2">{freelancer.bio}</p>
              <p className="text-base">
                Rate: <span className="font-semibold text-blue-600">{freelancer.rate}</span>
              </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleViewProfile(freelancer)}
                className="bg-transparent border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold shadow-md hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 ease-in-out"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Freelancer Profile */}
      {selectedFreelancer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
            <div className="flex items-start">
              <img
                src={selectedFreelancer.avatar}
                alt={`${selectedFreelancer.name} avatar`}
                className="w-24 h-24 rounded-full mr-6"
              />
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedFreelancer.name}</h3>
                <p className="text-gray-600"><strong>Role:</strong> {selectedFreelancer.role}</p>
                <p className="text-gray-600"><strong>Location:</strong> {selectedFreelancer.location}</p>
                <p className="text-gray-600">
                  <strong>Job Success:</strong> <span className="text-green-500">{selectedFreelancer.successRate}</span>
                </p>
              </div>
            </div>
            <p className="text-gray-600 mt-4"><strong>Bio:</strong> {selectedFreelancer.bio}</p>
            <p className="text-gray-600 mt-4"><strong>Skills:</strong> {selectedFreelancer.skills.join(', ')}</p>
            <p className="text-gray-600 mt-4"><strong>Portfolio:</strong></p>
            <ul className="list-disc list-inside text-gray-600">
              {selectedFreelancer.portfolio.map((project, index) => (
                <li key={index}>{project}</li>
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

export default FreelancerProfiles;
