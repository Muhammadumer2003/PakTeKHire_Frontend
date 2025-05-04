import React from 'react'

const ProfileCard = () => {
  return (
    <div className="flex flex-col items-center text-center">
    {/* Profile Picture */}
    <div className="relative w-24 h-24 rounded-full bg-gray-300 border-4 border-white shadow-lg overflow-hidden">
      <img
        src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" // Replace this with an actual profile picture URL
        alt="User Profile"
        className="w-full h-full object-cover"
      />
    </div>
    {/* User Name */}
    <h2 className="mt-4 text-xl font-bold text-white">Raheel Nasir</h2>
    <p className="text-sm text-blue-200 italic">Full Stack Developer</p>
  </div>
  )
}

export default ProfileCard
