import React from 'react'
import ProfileCard from './ProfileCard';

const Sidebar = () => {
    const categories = ['Web Development', 'Android Development', 'UI/UX Design', 'WordPress'];
  return (
    // bg-gradient-to-b from-slate-500 to-slate-700
    <div className="w-72 bg-slate-800 text-white p-6 shadow-lg rounded-sm">
      <ProfileCard />
      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-2 uppercase text-blue-100">Visibility</h3>
        <p className="text-base">🌍 Public</p>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 uppercase text-blue-100">Hours</h3>
        <p className="text-base">⏳ More than 30hrs/week</p>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 uppercase text-blue-100">Profile Completion</h3>
        <div className="relative w-full bg-blue-300 rounded-full h-3">
          <div
            className="absolute top-0 left-0 bg-green-500 h-3 rounded-full"
            style={{ width: '50%' }}
          ></div>
        </div>
        <p className="text-sm mt-2 cursor-pointer hover:underline text-green-300">
          ➕ Add Testimonial +30%
        </p>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 uppercase text-blue-100">Proposals</h3>
        <p className="text-base">💼 50 available bolts</p>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 uppercase text-blue-100">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="bg-blue-600 text-sm px-3 py-1 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-500 transition-all"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
