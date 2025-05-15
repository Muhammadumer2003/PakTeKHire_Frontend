
// ChatWindow.jsx
import React, { useState } from "react";

const ChatWindow = ({ selectedChat }) => {
  const [newMessage, setNewMessage] = useState("");

  if (!selectedChat) {
    return (
      <div className="w-2/3 flex items-center justify-center text-gray-500">
        <p>Select a chat to start messaging</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      selectedChat.messages.push({
        id: selectedChat.messages.length + 1,
        text: newMessage,
        timestamp: new Date().toLocaleString(),
        sender: "user",
      });
      setNewMessage("");
    }
  };

  return (
    <div className="w-2/3 bg-gray-50 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b bg-white">
        <h2 className="font-bold">{selectedChat.name}</h2>
        <p className="text-sm text-gray-500">{selectedChat.message}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {selectedChat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-4 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            >
              {msg.text}
            </p>
            <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white flex items-center">
  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e?.target.value)}
    placeholder="Type a message"
    className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
  />
  <button
    onClick={handleSendMessage}
    className="ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
  >
    Send
  </button>
</div>

    </div>
  );
};

export default ChatWindow;
