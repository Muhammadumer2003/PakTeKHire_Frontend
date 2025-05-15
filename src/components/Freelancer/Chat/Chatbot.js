import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiPaperclip } from 'react-icons/fi';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [hasPdf, setHasPdf] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with a welcome message
  useEffect(() => {
    setMessages([
      { 
        sender: 'bot', 
        text: "Hello! I'm your PakTeKHire assistant. You can ask me questions about jobs, upload a resume PDF, or get career advice." 
      }
    ]);
  }, []);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfFile(file);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      setMessages(prev => [...prev, { sender: 'user', text: `Uploading ${file.name}...` }]);
      
      const response = await fetch('http://localhost:8008/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'PDF upload failed');
      }

      const data = await response.json();
      setHasPdf(true);
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'PDF uploaded successfully. I can now answer questions about your document.'
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `Error uploading PDF: ${err.message}. Please try again.` 
      }]);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8008/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, hasPdf }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Chat request failed');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `Sorry, I encountered an error: ${err.message}. Please try again.` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800 flex items-center">
        <h1 className="text-xl font-bold flex items-center">
          <span className="text-green-400 mr-2">PakTeKHire</span> Assistant
        </h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3/4 p-3 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-white'
              }`}
            >
              <div className="text-sm font-medium mb-1">
                {msg.sender === 'user' ? 'You' : 'PakTeKHire Assistant'}
              </div>
              <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center bg-gray-800 rounded-lg">
          <label className="p-2 text-gray-400 hover:text-green-400 cursor-pointer">
            <FiPaperclip className="h-6 w-6" />
            <input
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Message PakTeKHire Assistant..."
            className="flex-1 bg-transparent p-3 focus:outline-none text-white"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`p-2 rounded-r-lg ${
              input.trim() 
                ? 'text-green-400 hover:bg-gray-700' 
                : 'text-gray-500'
            }`}
          >
            <FiSend className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;