import React from 'react'

const ProfileCard = ({profilePic,fullname,category}) => {
  return (
    <div className="flex flex-col items-center text-center">
    {/* Profile Picture */}
    <div className="relative w-24 h-24 rounded-full bg-gray-300 border-4 border-white shadow-lg overflow-hidden">
      <img
          src={profilePic} // Replace this with an actual profile picture URL
          alt="User Profile"
        className="w-full h-full object-cover"
      />
    </div>
    {/* User Name */}
    <h2 className="mt-4 text-xl font-bold text-white">{fullname}</h2>
    <p className="text-sm text-blue-200 italic">{category}</p>
  </div>
  )
}

export default ProfileCard
