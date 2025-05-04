import React from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link

const NavLinks = () => {
  const location = useLocation();

  // Define the routes where the nav links should not show, and show the sign up/sign in buttons instead
  const hideRoutes = ["/", "/register", "/login", "/role", "/signup", "/signin", "/join"];

  // If the current location is in the hideRoutes array, return Sign Up and Sign In buttons
  if (hideRoutes.includes(location.pathname)) {
    return (
      <div className="flex space-x-6 font-inter">
        <Link
          to="/join"
          className="text-slate-800 bg-green-500 hover:bg-green-600 border border-green-500 hover:border-green-600 py-2 px-6 rounded-md transition-colors cursor-pointer font-semibold"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="text-slate-800 bg-white hover:bg-gray-100 border border-green-500 hover:border-green-600 py-2 px-6 rounded-md transition-colors cursor-pointer font-semibold"
        >
          Sign In
        </Link>
      </div>
    );
  }

  // Define different sets of links based on the route
  const generalLinks = [
    { name: "Find Work", route: "/find-work" },
    { name: "My Jobs", route: "/work-history" },
    { name: "Reports", route: "/reports" },
    { name: "Applied Jobs", route: "/applied-jobs" },
  ];

  const clientLinks = [
    { name: "Job Post", route: "/client/job-post" },
    { name: "Browse Freelancers", route: "/client/browse-freelancers" },
    { name: "Active Projects", route: "/client/active-projects" },
    { name: "Dashboard", route: "/client/dashboard" },
    { name: "Post a Job", route: "/client/PostJob" },
  ];

  // Determine which links to display
  const links = location.pathname.startsWith("/client") ? clientLinks : generalLinks;

  return (
    <div className="flex space-x-6">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.route}
          className="text-white hover:text-green-500 transition-colors cursor-pointer"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;