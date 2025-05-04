// Sidebar.jsx
import React from "react";

const ChatSidebar = ({ chats, setSelectedChat }) => {
  return (
    <div className="w-1/3 bg-slate-800 text-white shadow-md overflow-y-auto">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className="flex items-center justify-between p-4 border-b hover:bg-blue-200 cursor-pointer"
            onClick={() => setSelectedChat(chat)}
          >
            <div>
              <p className="font-bold">{chat.name}</p>
              <p className="text-sm text-gray-500 truncate">{chat.message}</p>
            </div>
            <span
              className={`w-3 h-3 rounded-full ${
                chat.status === "online" ? "bg-green-500" : "bg-gray-500"
              }`}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSidebar;
