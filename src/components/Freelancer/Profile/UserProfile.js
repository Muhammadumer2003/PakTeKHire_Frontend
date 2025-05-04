import React from "react";
import ProfileHeader from "./ProfileHeader";
import WorkHistory from "./WorkHistory";
import Reviews from "./Reviews";
import VideoIntroduction from "./VideoIntroduction";
import { FiUser, FiBriefcase, FiStar, FiSettings } from "react-icons/fi"; // Sidebar icons

const UserProfile = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-white shadow-md h-screen flex flex-col ">
        <div className="p-6 text-center border-b border-slate-700">
          <h1 className="text-2xl font-bold">Freelancer Dashboard</h1>
        </div>
        <nav className="flex-grow mt-6">
          <ul className="space-y-4 px-6">
            <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
              <FiUser size={20} className="text-gray-300" />
              <a href="/profile" className="block font-medium text-gray-300">
                Dashboard
              </a>
            </li>
            <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
              <FiBriefcase size={20} className="text-gray-300" />
              <a href="/work-history" className="block font-medium text-gray-300">
                Job History
              </a>
            </li>
            <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
              <FiStar size={20} className="text-gray-300" />
              <a href="#reviews" className="block font-medium text-gray-300">
                Reviews
              </a>
            </li>
            <li className="hover:bg-slate-700 rounded-md p-3 flex items-center gap-3">
              <FiSettings size={20} className="text-gray-300" />
              <a href="/setting" className="block font-medium text-gray-300">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-16 space-y-6">
        <ProfileHeader />
        <VideoIntroduction/>
        {/* <WorkHistory /> */}
        <Reviews />
      </div>
    </div>
  );
};

export default UserProfile;
