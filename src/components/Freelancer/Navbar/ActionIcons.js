import React from "react";
import { FiMail, FiBell, FiUser, FiMessageCircle } from "react-icons/fi";
import ProfileMenu from "./ProfileMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ActionIcons = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for programmatic navigation
  const sel = useSelector((store) => store.auth);

  // Define the routes where the action icons should not show
  const hideRoutes = ["/", "/register", "/login", "/join"];

  // If the current location is in the hideRoutes array, return null to not render the action icons
  if (hideRoutes.includes(location.pathname)) {
    return null;
  }

  // Define different sets of links based on the route
  const generalLinks = [
    { name: <FiUser className="text-white" size={20} />, route: "/profile" },
    { name: <FiMail className="text-white" size={20} />, route: `/chat/${sel?._id}` },
    { name: <FiBell className="text-white" size={20} />, route: "/notify" },
    { name: <FiMessageCircle size={24} />, route: "/chatbot" },
  ];

  const clientLinks = [
    { name: <FiUser className="text-white" size={20} />, route: "/client/dashboard" },
    { name: <FiMail className="text-white" size={20} />, route: `/client/chat/${sel?._id}` },
    { name: <FiBell className="text-white" size={20} />, route: "/client/notify" },
    { name: <FiMessageCircle size={24} />, route: "/client/chatbot" },
  ];

  const linked = location.pathname.startsWith("/client") ? clientLinks : generalLinks;

  const handleClick = (route) => {
    navigate(route); // Use navigate for client-side navigation
  };

  return (
    <div className="flex items-center space-x-6">
      {linked.map((link, index) => (
        <Link
          key={index}
          to={link.route} // Use 'to' prop for navigation
          className="text-white hover:text-green-500 transition-colors cursor-pointer"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleClick(link.route); // Call navigation function
          }}
        >
          {link.name}
        </Link>
      ))}
      <div className="ml-auto">
        <ProfileMenu />
      </div>
    </div>
  );
};

export default ActionIcons;