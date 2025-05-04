import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages([...messages, { sender: "user", text: input }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "I'm here to help with your PDFs and queries!" },
      ]);
    }, 1000);

    setInput("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: `Uploaded: ${file.name}` },
      ]);

      // Simulate processing the PDF
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: `I’ve processed the PDF: ${file.name}. Ask me anything about it!`,
          },
        ]);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col max-w-[70%] mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden
    ">
      {/* Header */}
      <div className="bg-slate-600 text-white text-center py-3 text-lg font-semibold">
        Chat with PDF
      </div>

      {/* Chat Area */}
      <div className="flex-1 h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                message.sender === "user"
                  ? "bg-slate-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-3 bg-gray-100 border-t">
        {/* PDF Upload */}
        <label
          htmlFor="pdf-upload"
          className="flex items-center px-4 py-2 bg-slate-600 text-white text-sm rounded-lg cursor-pointer mr-2"
        >
          Upload PDF
          <input
            id="pdf-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>

        {/* Message Input */}
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-600"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />

        {/* Send Button */}
        <button
          className="ml-2 bg-slate-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSendMessage}
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
