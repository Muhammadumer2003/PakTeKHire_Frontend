import React from "react";
import Logo from "./Logo";

import NavLinks from "./NavLinks";
import ActionIcons from "./ActionIcons";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-darkBlue text-white shadow-md font-inter">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Logo />
        
      </div>

      {/* Center Section */}
      <NavLinks />

      {/* Right Section */}
      <ActionIcons />
    </nav>
  );
};

export default Navbar;















