import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = location.state || { role: "client" }; // Get the role passed from Role.js

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null, // For file upload
    category: "",
    skills: "", // Can be a comma-separated string or array
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password, confirmPassword, profilePic, category, skills } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!profilePic) {
      setError("Profile picture is required");
      return;
    }

    if (!category) {
      setError("Category is required");
      return;
    }

    if (!skills) {
      setError("Skills are required");
      return;
    }

    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", fullname);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    formDataToSend.append("role", role);
    formDataToSend.append("profilePic", profilePic); // File upload
    formDataToSend.append("category", category);
    formDataToSend.append("skills", skills); // Assuming skills as a comma-separated string

    try {
      const response = await fetch("http://localhost:8008/user/signup", {
        method: "POST",
        body: formDataToSend, // Use FormData for file upload
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error details:", errorResponse);
        throw new Error(errorResponse.message || "Unknown error");
      }

      const data = await response.json();
      console.log(data);
      setSuccess("Account created successfully!");
      setFormData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: null,
        category: "",
        skills: "",
      });

      // Redirect to profile completion or dashboard after signup
      setTimeout(() => navigate("/profile-setup"), 2000); // Example redirect
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {role === "client" ? "Organization Name" : "Full Name"}
            </label>
            <input
              type="text"
              id="name"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder={
                role === "client"
                  ? "Enter your organization name"
                  : "Enter your full name"
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePic"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              accept="image/*"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter your category (e.g., IT, Marketing)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Skills (comma-separated)
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter skills (e.g., JavaScript, Python)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              required
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-700"
            >
              I agree to the{" "}
              <a href="/terms" className="text-green-600 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 rounded-md"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-green-600 hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;