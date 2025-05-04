import React from "react";

const ProfileDetails = () => {
  return (
    <div className="grid grid-cols-2 gap-4 bg-white shadow-md p-4 rounded-lg">
      <div className="space-y-2">
        <h3 className="font-semibold">View Profile</h3>
        <p className="text-sm text-gray-500">CMS Development</p>
        <p className="text-sm text-gray-500">All work</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Profile Title</h3>
        <p className="text-sm">$15/hr</p>
        <p className="text-sm text-gray-500">Profile Overview</p>
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold">Hours</h3>
        <p className="text-sm text-gray-500">Available: More than 30hrs/week</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
