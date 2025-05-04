import React from "react";

const ProfileHeader = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg flex flex-col ">
      <img
        src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" // Replace with actual profile image source
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-xl font-bold">Raheel Nasir</h2>
      <p className="text-gray-500">Islamabad,Pakistan </p>
      <p className="text-sm text-gray-600 mt-2">
      Detail-oriented Software Engineer specializing in full-stack development with expertise in MERN stack, Next.js, and AI integrations. I deliver high-quality solutions tailored to your needs, ensuring a seamless user experience and scalable performance.
      </p>
      <div className="flex mt-4 space-x-8">
        <div>
          <p className="text-lg font-semibold">Rs 50,000</p>
          <p className="text-sm text-gray-500">Total Earnings</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Rs 350/hr</p>
          <p className="text-sm text-gray-500">Avg. Hourly Rate</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
