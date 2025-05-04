import React from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

const SearchBar = () => (
  <div className="mb-6">
    <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
      <HiOutlineSearch className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search Projects"
        className="w-full border-none outline-none text-gray-700"
      />
    </div>
  </div>
);

export default SearchBar;
