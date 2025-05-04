import React from "react";

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-64 px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
