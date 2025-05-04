import React, { useState } from "react";
import { FaEdit,FaUser, FaFilter } from "react-icons/fa";



const PasswordSecurity = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Password & Security</h2>
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div>
          <p className="text-sm font-medium text-gray-700">Password has been set</p>
          <p className="text-xs text-gray-500">Choose a strong, unique password that's at least 8 characters long.</p>
        </div>
        <button className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">Edit</button>
      </div>
    </div>
  );
};




const NotificationSettings = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
      <div className="space-y-6">
        {[
          { label: "Desktop", playSound: true },
          { label: "Mobile", playSound: true },
          { label: "Email", playSound: false, extraField: true },
        ].map((type) => (
          <div key={type.label} className="border rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">{type.label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {type.label === "Email" ? "Send an email with unread activity for:" : "Show notifications for:"}
                </label>
                <select className="w-full border rounded-md p-2 text-sm">
                  <option>All Activity</option>
                  <option>Important Activity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {type.label === "Email" ? "Send frequency:" : "Increment message counter for:"}
                </label>
                <select className="w-full border rounded-md p-2 text-sm">
                  <option>{type.label === "Email" ? "Every 15 minutes" : "All Activity"}</option>
                  <option>{type.label === "Email" ? "Every 30 minutes" : "Important Activity"}</option>
                </select>
              </div>
            </div>
            {type.playSound && (
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  defaultChecked
                />
                <label className="ml-2 text-sm text-gray-700">Also play a sound</label>
              </div>
            )}
            {type.extraField && (
              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  defaultChecked
                />
                <label className="ml-2 text-sm text-gray-700">Only send when offline or idle</label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};




const ContactInfo = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-3/4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Info</h2>
      <div className="space-y-4">
        {[
          { label: "User ID", value: "userid", icon: "💳" },
          { label: "Name", value: "User Name", icon: "👤" },
          { label: "Email", value: "a*****yz@gmail.com", icon: "📧" },
        ].map((field) => (
          <div
            key={field.label}
            className="flex items-center justify-between p-4 border rounded-md"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{field.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-700">{field.label}</p>
                <p className="text-sm text-blue-600">{field.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



const TeamsComponent = () => {
  return (
      <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-10">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 rounded-t-lg">
              <h2 className="text-lg font-bold text-white">Teams</h2>
          </div>
          {/* Content Section */}
          <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Create teams for easier organization
              </h3>
              <ul className="space-y-4">
                  {/* Feature Items */}
                  {[
                      "Better visibility into time logged and spend per group",
                      "Tighter control over admin or hiring privileges within each team",
                      "Streamlined billing by charging each team directly to that group's billing method",
                  ].map((text, index) => (
                      <li
                          key={index}
                          className="flex items-center bg-blue-50 p-4 rounded-lg border border-blue-100"
                      >
                          <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full mr-4">
                              ✓
                          </div>
                          <p className="text-gray-700">{text}</p>
                      </li>
                  ))}
              </ul>
              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                  <button className="text-blue-500 font-medium hover:underline">
                      Learn More
                  </button>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                      Upgrade To Access Teams
                  </button>
              </div>
          </div>
      </div>
  );
};




const GetPaid = () => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Get Paid</h1>

      {/* Balance Section */}
      <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium text-gray-600">Your Balance</p>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-500 font-medium rounded-lg cursor-not-allowed"
            disabled
          >
            Get Paid Now
          </button>
        </div>
        <p className="text-3xl font-bold text-blue-600 mt-2">Rs 36,000</p>
      </div>

      {/* Payment Details Section */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-sm border-2 border-dashed border-blue-300 text-center">
        <div className="mb-4">
          <div className="bg-blue-200 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m-6-8h.01M4.5 4h15A2.5 2.5 0 0122 6.5v11A2.5 2.5 0 0119.5 20h-15A2.5 2.5 0 012 17.5v-11A2.5 2.5 0 014.5 4z"
              />
            </svg>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          You have not set up any payment methods yet.
        </p>
        <p className="text-gray-500 text-xs mb-4">
          Tell us how you want to receive your funds. It may take up to 3 days
          to activate your payment method.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500">
          Add A Payment Method
        </button>
      </div>
    </div>
  );
};


const MembershipConnects = () => {
  return (
      <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
          {/* Header Section */}
          <div className="flex items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 rounded-t-lg">
              <h2 className="text-lg font-bold text-white">
                  Membership & Bolts
              </h2>
              <button className="text-white hover:text-gray-200">
                  <FaEdit />
              </button>
          </div>
          {/* Content Section */}
          <div className="p-6 space-y-4">
              {/* Current Plan */}
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div>
                      <h3 className="text-gray-800 font-semibold">
                          Current Plan
                      </h3>
                      <p className="text-gray-600">Freelancer Basic</p>
                  </div>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                      View Or Edit Membership Plan
                  </button>
              </div>
              {/* Available Connects */}
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div>
                      <h3 className="text-gray-800 font-semibold">
                          Available Bolts
                      </h3>
                      <p className="text-gray-600">100</p>
                  </div>
                  <div className="flex space-x-4">
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                          Buy Bolts
                      </button>
                      <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200">
                          View Bolts History
                      </button>
                  </div>
              </div>
              {/* Membership Connects */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-gray-800 font-semibold">
                      Membership Connects
                  </h3>
                  <p className="text-gray-600">
                      10 per month <br />
                      <span className="text-sm">
                          Any unused Bolts at the end of your billing cycle
                          will roll over to the next month (up to 200).{" "}
                          <a
                              href="#"
                              className="text-blue-500 hover:underline"
                          >
                              Learn More
                          </a>
                      </span>
                  </p>
              </div>
              {/* Membership Fee */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-gray-800 font-semibold">
                      Membership Fee
                  </h3>
                  <p className="text-gray-600">Free</p>
              </div>
              {/* Current Billing Cycle */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="text-gray-800 font-semibold">
                      Current Billing Cycle
                  </h3>
                  <p className="text-gray-600">
                      Jul 1, 2021 - Aug 1, 2021{" "}
                      <a
                          href="#"
                          className="text-blue-500 hover:underline text-sm"
                      >
                          Learn More
                      </a>
                  </p>
              </div>
          </div>
      </div>
  );
};


const MembersPermissions = () => {
  return (
      <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
          {/* Header Section */}
          <div className="flex items-center justify-between bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 rounded-t-lg">
              <h2 className="text-lg font-bold text-white">
                  Members & Permissions
              </h2>
          </div>
          {/* Owner Section */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex justify-between items-center mt-4">
              <div className="flex items-center space-x-4">
                  <FaUser className="text-blue-500 text-xl" />
                  <div>
                      <p className="font-semibold text-gray-800">Owner</p>
                      <p className="text-gray-600">User Name (ME)</p>
                  </div>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                  Invite New User
              </button>
          </div>
          {/* Tabs Section */}
          <div className="flex space-x-4 border-b border-gray-200 mt-6">
              <button className="text-blue-500 font-semibold pb-2 border-b-2 border-blue-500">
                  Active Members
              </button>
              <button className="text-gray-500 font-semibold pb-2 hover:text-blue-500">
                  Invitations
              </button>
          </div>
          {/* Search and Filter */}
          <div className="flex items-center mt-4 space-x-4">
              <input
                  type="text"
                  placeholder="Search by name"
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              />
              <button className="bg-gray-100 text-gray-700 p-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                  <FaFilter />
                  <span>Filter</span>
              </button>
          </div>
          {/* No Members Section */}
          <div className="mt-6 border-dashed border-2 border-blue-200 rounded-lg p-6 text-center">
              <div className="text-blue-500 text-4xl mb-4">
                  <FaUser />
              </div>
              <p className="text-gray-800 font-semibold">
                  You have no team members yet
              </p>
              <p className="text-gray-600 mb-4">
                  Get started by inviting someone to join you.
              </p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                  Invite A User
              </button>
          </div>
      </div>
  );
};


const BillingMethod = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-8">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-blue-800 mb-6">
          Billing Method
        </h2>

        {/* Payment Details Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Payment Details
          </h3>
          <div className="border-2 border-dashed border-blue-300 rounded-md p-8 text-center bg-blue-50">
            {/* Card Icon */}
            <div className="text-blue-500 text-5xl mb-6">💳</div>

            {/* Information Text */}
            <p className="text-gray-800 font-medium mb-2">
              You have not set up any payment methods yet.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Tell us how you want to receive your funds. It may take up to 3
              days to activate your payment method.
            </p>

            {/* Add Payment Method Button */}
            <button className="text-blue-600 border border-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-600 hover:text-white transition">
              Add a Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Setting = () => {
  const [activeTab, setActiveTab] = useState("Profile Settings");


  const menuItems = [
    // { name: "Profile Settings", icon: "👤" },
    // { name: "My Profile", icon: "📄" },
    { name: "Password & Security", icon: "🔒" },
    { name: "Notification Settings", icon: "🔔" },
    { name: "Contact Info", icon: "📧" },
    { name: "Get Paid", icon: "💰" },
    // { name: "My Teams", icon: "👥" },
    // { name: "Connected Services", icon: "🔗" },
    { name: "Billing Methods", icon: "💳" },
    { name: "Membership & Bolts", icon: "📈" },
    
    { name: "Teams", icon: "👨‍👩‍👧‍👦" },
    { name: "Members & Permissions", icon: "⚙️" },
    
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Profile Settings":
        return <div>Your Profile Settings content here.</div>;
      case "My Profile":
        return <div>Your My Profile content here.</div>;
      case "Password & Security":
        return <div className="flex  justify-center items-center"><PasswordSecurity/></div>;
      case "Notification Settings":
        return <div ><NotificationSettings/></div>;
      case "Contact Info":
        return <div className="flex  justify-center items-center mt-16"><ContactInfo/></div>;
      case "Get Paid":
        return <div><GetPaid/></div>;
      case "My Teams":
        return <div>Your My Teams content here.</div>;
      case "Connected Services":
        return <div>Your Connected Services content here.</div>;
      case "Billing Methods":
        return <div><BillingMethod/></div>;
      case "Membership & Bolts":
        return <div><MembershipConnects/></div>;
      case "Agency Settings":
        return <div>Your Agency Settings content here.</div>;
      case "Teams":
        return <div><TeamsComponent/></div>;
      case "Members & Permissions":
        return <div><MembersPermissions/></div>;
     
      default:
        return <div>Under Construction</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-inter">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h1 className="text-xl font-bold text-gray-700 mb-6 ">Settings</h1>
        <ul className="space-y-4 scroll-m-2 ">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center gap-2 p-1 rounded-md cursor-pointer text-sm font-medium ${
                activeTab === item.name
                  ? "bg-green-100 text-green-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default Setting;








// import { Settings, User, Lock, Bell, Mail, CreditCard, Users, Building2, UserPlus } from 'lucide-react';
// import { Link } from 'react-router-dom';


// const menuItems = [
//   { icon: Settings, label: 'Profile Settings', href: '/profile-setting' },
//   { icon: User, label: 'My Profile', href: '/profile' },
//   { icon: Lock, label: 'Password & Security', href: '/security' },
//   { icon: Bell, label: 'Notification Settings', href: '/notifications' },
//   { icon: Mail, label: 'Contact Info', href: '/contact' },
//   { icon: CreditCard, label: 'Billing Methods', href: '/billing' },
//   { icon: Users, label: 'My Teams', href: '/teams' },
//   { icon: Building2, label: 'Agency Settings', href: '/agency' },
//   { icon: UserPlus, label: 'Members & Permissions', href: '/members' }
// ];
// const Setting=()=> {
//   return (
//     <aside className="w-64 bg-white h-screen shadow-lg">
//       <div className="py-6 px-4">
//         <ul className="space-y-2 ">
//           {menuItems.map((item) => (
//             <li key={item.href}>
//               <Link
//                 to={item.href}
//                 className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
//               >
//                 <item.icon className="h-5 w-5  " />
//                 <span>{item.label}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </aside>
//   );
// }
// export default Setting;

