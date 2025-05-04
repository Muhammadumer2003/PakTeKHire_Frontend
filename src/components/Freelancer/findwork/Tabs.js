import React from 'react';

const Tabs = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="flex gap-4 mb-6 cursor-pointer">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`text-sm font-semibold px-4 py-2 rounded-lg ${
            tab === activeTab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
