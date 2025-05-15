import React from 'react'
import ProfileCard from './ProfileCard';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    // const categories = ['Web Development', 'Android Development', 'UI/UX Design', 'WordPress'];
    const ssel=useSelector(store=>store.auth);
   const {user}=ssel;
   const {category,fullname,profilePic,skills}=user;


  // Ensure skills is a string before splitting
  const skillsArray = typeof skills === 'string' ? skills.split(',') : [];

  // Ensure category is an array before mapping
  const categoryArray = Array.isArray(category) ? category : [category];

  return (
    // Center the main container
    // bg-gradient-to-b from-slate-500 to-slate-700
    <div className="w-72 bg-slate-800 text-white p-6 shadow-lg rounded-sm">

      <ProfileCard  profilePic={profilePic} fullname={fullname} category={category}/>
      {/* <div className="flex items-center mb-4">
        <img src={profilePic} alt="Profile" className="w-12 h-12 rounded-full mr-3" />
        <div>
          <h2 className="text-lg font-semibold">{fullname}</h2>
          <p className="text-sm text-gray-300">{category}</p>
        </div>
      </div> */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-2 uppercase text-blue-100">Visibility</h3>
        <p className="text-base">🌍 Public</p>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 uppercase text-blue-100">Hours</h3>
        <p className="text-base">⏳ More than 30hrs/week</p>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 uppercase text-blue-100">Proposals</h3>
        <p className="text-base">💼 50 available bolts</p>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 uppercase text-blue-100">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categoryArray.map((cat) => (
            <span
              key={cat}
              className="bg-blue-600 text-sm px-3 py-1 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-500 transition-all"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 uppercase text-blue-100">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-600 text-sm px-3 py-1 rounded-full shadow-lg hover:shadow-xl hover:bg-blue-500 transition-all"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
