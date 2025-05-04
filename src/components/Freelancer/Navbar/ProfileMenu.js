import React, { useState, useEffect } from "react";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Apply theme on load or toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleMenuOptionClick = (option) => {
    if (option === "Logout") {
      alert("You have logged out!");
      setIsMenuOpen(false);
    } else if (option === "Theme") {
      toggleTheme();
    } else {
      console.log(`You clicked on: ${option}`);
    }
  };

  return (
    <div className="relative">
      {/* Three Dots Button */}
      <button
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-600 dark:text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 z-20">
          {/* User Info Section */}
          <div className="flex items-center mb-6 space-x-4">
            <div className="w-14 h-14 bg-gray-300 dark:bg-gray-600 rounded-full flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                User Name
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                username@gmail.com
              </p>
            </div>
          </div>

          {/* Balance Section */}
          <div className="bg-blue-50 dark:bg-blue-900 dark:text-blue-200 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Your Balance
            </p>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-300">
              $0.00
            </h3>
          </div>

          {/* Menu Options */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "My Gigs", icon: "📄" },
              { label: "Teams", icon: "👥" },
              { label: `Theme: ${isDarkMode ? "Dark" : "Light"}`, icon: "🎨" },
              { label: "Settings", icon: "⚙️" },
              { label: "Switch Account", icon: "🔄" },
              { label: "Logout", icon: "🚪" },
            ].map((option, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => handleMenuOptionClick(option.label.includes("Theme") ? "Theme" : option.label)}
              >
                <div className="w-12 h-12 flex items-center justify-center text-lg bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-300 rounded-full">
                  {option.icon}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {option.label}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Links */}
          <div className="space-y-4 text-sm">
            <button
              className="w-full text-left text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300"
              onClick={() => handleMenuOptionClick("Help & Support")}
            >
              Help & Support
            </button>
            <button
              className="w-full text-left text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300"
              onClick={() => handleMenuOptionClick("Terms & Conditions")}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
