import React from 'react'

import { useState } from 'react';
import { useNavigate } from 'react-router';


const Role = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("client");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-inter">
      <h1 className="text-2xl font-semibold mb-8">Join as a client or freelancer</h1>

      <div className="flex space-x-4">
        {/* Client Option */}
        <div
          onClick={() => setSelectedRole("client")}
          className={`p-6 border rounded-md cursor-pointer flex flex-col items-center justify-center space-y-2 ${
            selectedRole === "client" ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
        >
          <span className="text-xl">👤</span>
          <p className="text-center font-medium">I’m a client, hiring for a project</p>
          {selectedRole === "client" && (
            <span className="text-green-500 text-sm font-semibold">Selected</span>
          )}
        </div>

        {/* Freelancer Option */}
        <div
          onClick={() => setSelectedRole("Freelancer")}
          className={`p-6 border rounded-md cursor-pointer flex flex-col items-center justify-center space-y-2 ${
            selectedRole === "Freelancer" ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
        >
          <span className="text-xl">👨‍💻</span>
          <p className="text-center font-medium">I’m a freelancer, looking for work</p>
          {selectedRole === "Freelancer" && (
            <span className="text-green-500 text-sm font-semibold">Selected</span>
          )}
        </div>
      </div>

      <button
        className="mt-8 px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition"
        onClick={() => navigate("/register", { state: { role: selectedRole } })}

      >
        Join as a {selectedRole === "client" ? "client" : "Freelancer"}
      </button>

      <p className="mt-4 text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-green-500 font-medium hover:underline">
          Log In
        </a>
      </p>
    </div>
  )
}

export default Role
