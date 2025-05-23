import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { CreateSocketConnection } from '../../../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Send,
  Paperclip,
  MoreVertical,
  Menu,
  X,
  Search,
  Filter,
  Bell,
  Phone,
  Video,
} from 'lucide-react';

// Load Zoom SDK function
const loadZoomSdk = () => {
  return new Promise((resolve, reject) => {
    if (window.ZoomMtg) {
      console.log('ZoomMtg already loaded');
      window.ZoomMtg.setZoomJSLib('https://source.zoom.us/3.8.0/lib', '/av');
      window.ZoomMtg.preLoadWasm();
      window.ZoomMtg.prepareWebSDK();
      window.ZoomMtg.i18n.load('en-US');
      window.ZoomMtg.i18n.reload('en-US');
      resolve(window.ZoomMtg);
    } else {
      console.error('Zoom SDK scripts not loaded');
      reject(new Error('Zoom SDK not loaded. Please check index.html script tags.'));
    }
  });
};

const Chat = () => {
  console.log('Rendering Chat component');
  const { userId: targetUserId } = useParams();
  const selc = useSelector((store) => store.auth);

  // State and refs
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState(''); // New state for additional input
  const [isTyping, setIsTyping] = useState(false);
  const [targetUser, setTargetUser] = useState({
    name: 'Loading...',
    avatar: '/api/placeholder/40/40',
    isOnline: false,
    lastSeen: 'Recently',
    title: '',
  });
  const [showOptions, setShowOptions] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(targetUserId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(false); // Default to false for mobile
  const [meetingDetails, setMeetingDetails] = useState(null);
  const [zoomLoaded, setZoomLoaded] = useState(false);
  const [isLoadingZoom, setIsLoadingZoom] = useState(false);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Debug auth state
  useEffect(() => {
    console.log('Auth state:', selc);
    if (!selc?.user) {
      console.warn('User not authenticated, redirecting to login');
      window.location.href = '/login';
    }
  }, [selc]);

  // Initialize Zoom SDK
  useEffect(() => {
    const initZoom = async () => {
      try {
        setIsLoadingZoom(true);
        await loadZoomSdk();
        setZoomLoaded(true);
        console.log('Zoom SDK loaded successfully');
      } catch (error) {
        console.error('Failed to load Zoom SDK:', error);
        alert('Failed to load Zoom SDK. Please refresh and try again.');
      } finally {
        setIsLoadingZoom(false);
      }
    };
    initZoom();

    return () => {
      const zoomContainer = document.getElementById('zmmtg-root');
      if (zoomContainer) {
        zoomContainer.style.display = 'none';
        document.body.removeChild(zoomContainer);
      }
    };
  }, []);

  // Fetch proposals and populate chats
  useEffect(() => {
    const fetchProposals = async () => {
      if (!selc?.user?._id) {
        console.warn('No user ID found, skipping fetchProposals');
        return;
      }
      try {
        const response = await axios.get('http://51.21.200.232:8008/api/freelancer/proposals', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${selc?.user?.token || ''}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          const proposals = response.data;
          const filteredProposals = proposals.filter(
            (proposal) => proposal.status === 'Accepted' || proposal.status === 'Rejected'
          );
          const chatList = filteredProposals.map((proposal) => ({
            id: proposal.job.createdBy,
            name: proposal.job.createdByName || 'Unknown Client',
            avatar: proposal.job.createdByAvatar || '/api/placeholder/40/40',
            title: proposal.job.title,
            lastMessage: proposal.proposalText?.substring(0, 50) || 'No message',
            timestamp: proposal.submittedAt || new Date(),
            unread: 0,
            isOnline: false,
          }));
          console.log('Fetched chats:', chatList);
          setChats(chatList);
        }
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };
    fetchProposals();
  }, [selc?.user?._id, selc?.user?.token]);

  // Set default selectedChat when chats load
  useEffect(() => {
    console.log('Chats:', chats, 'Current selectedChat:', selectedChat);
    if (!selectedChat && chats.length > 0) {
      setSelectedChat(chats[0].id);
      console.log('Set default selectedChat:', chats[0].id);
    }
  }, [chats, selectedChat]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Socket setup for messages
  useEffect(() => {
    if (!selectedChat || !selc?.user?._id) {
      console.warn('Skipping socket setup: ', { selectedChat, userId: selc?.user?._id });
      return;
    }

    const socket = CreateSocketConnection();
    console.log('Socket joining chat:', { userId: selc.user._id, targetUserId: selectedChat });
    socket.emit('joinChat', { userId: selc.user._id, targetUserId: selectedChat });

    socket.on('connect', () => console.log('Socket connected'));
    socket.on('connect_error', (error) => console.error('Socket connection error:', error));
    socket.on('loadMessages', (messagesData) => {
      console.log('Loaded messages:', messagesData);
      setMessages(messagesData || []);
    });
    socket.on('ReceivedMessages', ({ firstName: senderName, text, sender, createdAt = new Date() }) => {
      console.log('Received message:', { senderName, text, sender, createdAt });
      setMessages((prev) => [...prev, { firstName: senderName, text, sender, createdAt }]);
      setIsTyping(false);
    });
    socket.on('userTyping', ({ userId: typingUserId }) => {
      if (typingUserId === selectedChat) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });
    socket.on('videoCallRequest', ({ userId: callerId, targetUserId: calleeId, meeting_id, password }) => {
      console.log('Received video call request:', { callerId, calleeId, meeting_id, password });
      if (calleeId === selc.user._id && callerId === selectedChat && meeting_id) {
        handleJoinMeeting(meeting_id, password);
      }
    });

    return () => {
      socket.off('loadMessages');
      socket.off('ReceivedMessages');
      socket.off('userTyping');
      socket.off('videoCallRequest');
      socket.disconnect();
    };
  }, [selc?.user?._id, selectedChat]);

  // Update targetUser when selectedChat changes
  useEffect(() => {
    if (!selectedChat) return;
    const currentChat = chats.find((chat) => chat.id === selectedChat);
    if (currentChat) {
      setTargetUser({
        name: currentChat.name,
        title: currentChat.title,
        avatar: currentChat.avatar,
        isOnline: currentChat.isOnline,
        lastSeen: currentChat.isOnline ? 'Online' : 'Last seen recently',
      });
      setChats((prevChats) =>
        prevChats.map((chat) => (chat.id === selectedChat ? { ...chat, unread: 0 } : chat))
      );
    }
  }, [selectedChat, chats]);

  // Redirect if not authenticated
  if (!selc?.user) {
    return null;
  }

  const userId = selc.user._id;
  const firstName = selc.user.fullname;
  const userAvatar = selc.user.avatar || '/api/placeholder/40/40';

  // Format timestamps
  const formatTime = (date) => {
    const now = new Date();
    const msgDate = new Date(date);
    return now.toDateString() === msgDate.toDateString()
      ? msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : `${msgDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const formatLastMessageTime = (date) => {
    const now = new Date();
    const msgDate = new Date(date);
    if (now.toDateString() === msgDate.toDateString()) {
      return msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() === msgDate.toDateString()) {
      return 'Yesterday';
    }
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    return msgDate > oneWeekAgo
      ? msgDate.toLocaleDateString(undefined, { weekday: 'short' })
      : msgDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Handle video call
  const handleVideoCall = async () => {
    if (!zoomLoaded) {
      if (!isLoadingZoom) {
        try {
          setIsLoadingZoom(true);
          await loadZoomSdk();
          setZoomLoaded(true);
        } catch (error) {
          console.error('Error loading Zoom SDK:', error);
          alert('Failed to load Zoom SDK.');
          return;
        } finally {
          setIsLoadingZoom(false);
        }
      } else {
        alert('Zoom SDK is loading. Please wait.');
        return;
      }
    }

    try {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 5);
      const response = await axios.post(
        'http://51.21.200.232:8008/api/zoom/create-meeting',
        {
          topic: `Call with ${targetUser.name}`,
          start_time: now.toISOString(),
          duration: 60,
        },
        { withCredentials: true }
      );
      console.log('Created meeting:', response.data);
      const { id: meeting_id, password } = response.data.data;
      setMeetingDetails(response.data.data);

      const signatureResponse = await axios.post(
        `http://51.21.200.232:8008/api/user/get-meeting-signature/${meeting_id}`,
        {},
        { withCredentials: true }
      );
      console.log('Signature response:', signatureResponse.data);
      if (!signatureResponse.data?.data?.signature) {
        throw new Error('Signature not found in response');
      }
      const { signature } = signatureResponse.data.data;

      let zoomContainer = document.getElementById('zmmtg-root');
      if (!zoomContainer) {
        zoomContainer = document.createElement('div');
        zoomContainer.id = 'zmmtg-root';
        zoomContainer.style.display = 'none';
        document.body.appendChild(zoomContainer);
      }
      zoomContainer.style.display = 'block';

      window.ZoomMtg.init({
        leaveUrl: window.location.origin + '/chat',
        isSupportAV: true,
        success: () => {
          console.log('ZoomMtg initialized, joining meeting:', { meeting_id, userName: firstName || 'User' });
          window.ZoomMtg.join({
            signature,
            meetingNumber: meeting_id,
            userName: firstName || 'User',
            sdkKey: 'uvRu1mzQRoWR2pRU08oUQg',
            passWord: password || '',
            success: () => {
              console.log('Joined meeting successfully');
              const socket = CreateSocketConnection();
              socket.emit('videoCall', {
                userId,
                targetUserId: selectedChat,
                meeting_id,
                password, // Include password
              });
            },
            error: (error) => {
              console.error('Error joining meeting:', error);
              alert('Failed to join meeting: ' + (error.reason || 'Unknown error'));
              zoomContainer.style.display = 'none';
            },
          });
        },
        error: (error) => {
          console.error('Zoom init error:', error);
          alert('Failed to initialize Zoom.');
          zoomContainer.style.display = 'none';
        },
      });
    } catch (error) {
      console.error('Error initiating video call:', error);
      alert('Failed to create meeting: ' + (error.message || 'Unknown error'));
    }
  };

  // Join Zoom meeting
  const handleJoinMeeting = async (meeting_id, password = '') => {
    if (!meeting_id) {
      console.error('Invalid meeting ID');
      alert('Invalid meeting ID');
      return;
    }
    if (!zoomLoaded) {
      if (!isLoadingZoom) {
        try {
          await loadZoomSdk();
          setZoomLoaded(true);
        } catch (error) {
          console.error('Error loading Zoom SDK:', error);
          alert('Failed to load Zoom SDK.');
          return;
        }
      } else {
        alert('Zoom SDK is loading. Please wait.');
        return;
      }
    }

    try {
      console.log('Fetching signature for meeting:', meeting_id);
      const signatureResponse = await axios.post(
        `http://51.21.200.232:8008/api/user/get-meeting-signature/${meeting_id}`,
        {},
        { withCredentials: true }
      );
      console.log('Signature response:', signatureResponse.data);
      if (!signatureResponse.data?.data?.signature) {
        throw new Error('Signature not found in response');
      }
      const { signature } = signatureResponse.data.data;

      let zoomContainer = document.getElementById('zmmtg-root');
      if (!zoomContainer) {
        zoomContainer = document.createElement('div');
        zoomContainer.id = 'zmmtg-root';
        zoomContainer.style.display = 'none';
        document.body.appendChild(zoomContainer);
      }
      zoomContainer.style.display = 'block';

      window.ZoomMtg.init({
        leaveUrl: window.location.origin + '/chat',
        isSupportAV: true,
        success: () => {
          console.log('ZoomMtg initialized, joining meeting:', { meeting_id, userName: firstName || 'User', password });
          window.ZoomMtg.join({
            signature,
            meetingNumber: meeting_id,
            userName: firstName || 'User',
            sdkKey: 'uvRu1mzQRoWR2pRU08oUQg',
            passWord: password,
            success: () => console.log('Joined meeting successfully'),
            error: (error) => {
              console.error('Error joining meeting:', error);
              alert('Failed to join meeting: ' + (error.reason || 'Unknown error'));
              zoomContainer.style.display = 'none';
            },
          });
        },
        error: (error) => {
          console.error('Zoom init error:', error);
          alert('Failed to initialize Zoom: ' + error.reason);
          zoomContainer.style.display = 'none';
        },
      });
    } catch (error) {
      console.error('Error fetching signature or joining meeting:', error);
      alert('Failed to join meeting: ' + error.message);
    }
  };

  // Handle typing and sending messages
  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (selectedChat) {
      const socket = CreateSocketConnection();
      socket.emit('userTyping', { userId, targetUserId: selectedChat });
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = CreateSocketConnection();
    const timestamp = new Date();
    socket.emit('sendMessage', {
      firstName,
      userId,
      targetUserId: selectedChat || 'broadcast',
      text: newMessage,
      timestamp,
    });

    setMessages((prev) => [...prev, { firstName, text: newMessage, sender: userId, timestamp }]);
    if (selectedChat) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChat ? { ...chat, lastMessage: newMessage, timestamp } : chat
        )
      );
    }
    setNewMessage('');
  };

  const handleAdditionalTyping = (e) => {
    setAdditionalMessage(e.target.value);
    if (selectedChat) {
      const socket = CreateSocketConnection();
      socket.emit('userTyping', { userId, targetUserId: selectedChat });
    }
  };

  const sendAdditionalMessage = () => {
    if (!additionalMessage.trim()) return;

    const socket = CreateSocketConnection();
    const timestamp = new Date();
    socket.emit('sendMessage', {
      firstName,
      userId,
      targetUserId: selectedChat || 'broadcast',
      text: additionalMessage,
      timestamp,
    });

    setMessages((prev) => [...prev, { firstName, text: additionalMessage, sender: userId, timestamp }]);
    if (selectedChat) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChat ? { ...chat, lastMessage: additionalMessage, timestamp } : chat
        )
      );
    }
    setAdditionalMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleAdditionalKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendAdditionalMessage();
    }
  };

  // Select chat and toggle sidebar on mobile
  const selectChat = (chatId) => {
    console.log('Selecting chat:', chatId);
    setSelectedChat(chatId);
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  // Filter and sort chats
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedChats = [...filteredChats].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = [];
    let currentDate = '';
    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toLocaleDateString();
      if (date !== currentDate) {
        currentDate = date;
        groups.push({ type: 'date', date: currentDate });
      }
      groups.push({ type: 'message', ...msg });
    });
    console.log('Grouped messages:', groups);
    return groups;
  };

  const formatDateHeader = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === today.toDateString()
      ? 'Today'
      : date.toDateString() === yesterday.toDateString()
      ? 'Yesterday'
      : date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <div className="w-full h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <div
        className={`${showSidebar ? 'block' : 'hidden'} md:block w-full md:w-80 lg:w-96 bg-white border-r h-full flex flex-col`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Messages</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={18} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Filter size={18} className="text-gray-600" />
            </button>
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowSidebar(false)}
            >
              <X size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="p-3 border-b">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-green-500 focus:bg-white"
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {sortedChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
              <p>No conversations found</p>
              {searchQuery && <p className="text-sm">Try a different search term</p>}
            </div>
          ) : (
            sortedChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-start p-3 border-b cursor-pointer hover:bg-gray-50 ${selectedChat === chat.id ? 'bg-green-50' : ''}`}
                onClick={() => selectChat(chat.id)}
              >
                <div className="relative mr-3">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.isOnline && (
                    <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-medium text-gray-900 truncate">{chat.name}</h4>
                    <span className="text-xs text-gray-500">
                      {formatLastMessageTime(chat.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{chat.title}</p>
                  <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-green-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 h-full">
        <div className="bg-white border-b shadow-sm py-3 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden p-1 rounded-full hover:bg-gray-100"
              onClick={() => setShowSidebar(true)}
            >
              <Menu size={20} />
            </button>
            <div className="relative">
              <img
                src={targetUser.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              {targetUser.isOnline && (
                <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{targetUser.name}</h3>
              <p className="text-xs text-gray-500 flex items-center">
                {targetUser.title && <span className="mr-2">{targetUser.title}</span>}
                <span className={targetUser.isOnline ? 'text-green-500' : 'text-gray-500'}>
                  {targetUser.lastSeen}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Phone size={18} className="text-gray-600" />
            </button>
            <button
              className={`p-2 rounded-full hover:bg-gray-100 ${isLoadingZoom ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleVideoCall}
              disabled={isLoadingZoom}
            >
              <Video size={18} className="text-gray-600" />
              {isLoadingZoom && <span className="ml-2 text-xs">Loading Zoom...</span>}
            </button>
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setShowOptions(!showOptions)}
              >
                <MoreVertical size={18} className="text-gray-600" />
              </button>
              {showOptions && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md py-1 border z-10">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Mark as unread
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Archive conversation
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Report user
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
                    Block user
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
          style={{ minHeight: '0' }}
        >
          {/* Debug Info */}
          <div>
            <p>Debug: Selected Chat ID: {selectedChat || 'None'}</p>
            <p>Debug: Number of Messages: {groupedMessages.length}</p>
            <p>Debug: Messages: {JSON.stringify(messages)}</p>
          </div>
          {!selectedChat ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
              <p>Select a conversation</p>
              <p className="text-sm">Choose a chat from the sidebar to start messaging</p>
            </div>
          ) : groupedMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
              <p>No messages yet</p>
              <p className="text-sm">Start the conversation by sending a message</p>
            </div>
          ) : (
            groupedMessages.map((item, index) => {
              if (item.type === 'date') {
                return (
                  <div key={`date-${index}`} className="flex justify-center my-4">
                    <div className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-600">
                      {formatDateHeader(item.date)}
                    </div>
                  </div>
                );
              }
              const isSender = item.sender === userId;
              return (
                <div
                  key={`msg-${index}`}
                  className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[75%]">
                    {!isSender && (
                      <img
                        src={targetUser.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          isSender
                            ? 'bg-green-600 text-white rounded-br-none'
                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{item.text}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {formatTime(item.createdAt)}
                      </span>
                    </div>
                    {isSender && (
                      <img
                        src={userAvatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end gap-2 max-w-[75%]">
                <img
                  src={targetUser.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col items-start">
                  <div className="px-4 py-3 rounded-lg bg-white border border-gray-200 rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="bg-white border-t p-3">
          <div className="flex items-center gap-2 bg-white border rounded-lg p-1">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Paperclip size={18} />
            </button>
            <textarea
              value={newMessage}
              onChange={handleTyping}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-2 py-2 text-sm resize-none focus:outline-none max-h-32"
              rows={1}
              style={{ height: 'auto', minHeight: '40px' }}
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className={`p-2 rounded-full ${
                newMessage.trim()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-400'
              } transition-colors`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        {/* Additional Input Field and Send Button */}
        <div className="bg-white border-t p-3">
          <div className="flex items-center gap-2 bg-white border rounded-lg p-1">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Paperclip size={18} />
            </button>
            <textarea
              value={additionalMessage}
              onChange={handleAdditionalTyping}
              onKeyDown={handleAdditionalKeyDown}
              placeholder="Type another message..."
              className="flex-1 px-2 py-2 text-sm resize-none focus:outline-none max-h-32"
              rows={1}
              style={{ height: 'auto', minHeight: '40px' }}
            />
            <button
              onClick={sendAdditionalMessage}
              disabled={!additionalMessage.trim()}
              className={`p-2 rounded-full ${
                additionalMessage.trim()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-400'
              } transition-colors`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;



// import { useParams } from "react-router-dom";
// import { useEffect, useState, useRef } from "react";
// import { CreateSocketConnection } from "../../../utils/socket";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import {
//   Send,
//   Paperclip,
//   MoreVertical,
//   ChevronLeft,
//   Phone,
//   Video,
//   Search,
//   Menu,
//   X,
//   Filter,
//   Bell,
// } from "lucide-react";

// const Chat = () => {
//   const { userId: targetUserId } = useParams(); // Target user ID from URL
//   const selc = useSelector((store) => store.auth);
//   const userId = selc?.user?._id; // Current user ID
//   const firstName = selc?.user?.fullname;
//   const userAvatar = selc?.user?.avatar || "/api/placeholder/40/40";

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [targetUser, setTargetUser] = useState({
//     name: "Loading...",
//     avatar: "/api/placeholder/40/40",
//     isOnline: false,
//     lastSeen: "Recently",
//   });
//   const [showOptions, setShowOptions] = useState(false);
//   const [chats, setChats] = useState([]); // Will hold client data from proposals
//   const [selectedChat, setSelectedChat] = useState(targetUserId);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSidebar, setShowSidebar] = useState(true);

//   const messagesEndRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   // Fetch proposals and extract client data for sidebar
//   useEffect(() => {
//     const fetchProposals = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8008/api/freelancer/proposals",
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//             withCredentials: true,
//           }
//         );

//         if (response.status === 200) {
//           const proposals = response.data;

//           // Filter for Accepted or Rejected proposals
//           const filteredProposals = proposals.filter(
//             (proposal) =>
//               proposal.status === "Accepted" || proposal.status === "Rejected"
//           );

//           // Map proposals to chat list format
//           const chatList = filteredProposals.map((proposal) => ({
//             id: proposal.job.createdBy, // Client ID
//             name: proposal.job.createdByName || "Unknown Client", // You'll need to populate createdBy's fullname
//             avatar: proposal.job.profilePic || "/api/placeholder/40/40", // You'll need to populate createdBy's avatar
//             title: proposal.job.title, // Job title as the "title" field
//             lastMessage: proposal.proposalText?.substring(0, 50) || "No message", // Use proposal text as last message preview
//             timestamp: proposal.submittedAt, // Use proposal submission time
//             unread: 0, // You can implement unread messages logic later
//             isOnline: false, // You can implement online status later
//           }));

//           setChats(chatList);

//           // If no targetUserId is provided in URL, select the first chat
//           if (!targetUserId && chatList.length > 0) {
//             setSelectedChat(chatList[0].id);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching proposals for chat:", error);
//       }
//     };

//     if (userId) {
//       fetchProposals();
//     }
//   }, [userId, targetUserId]);

//   // Format timestamp for messages
//   const formatTime = (date) => {
//     const now = new Date();
//     const msgDate = new Date(date);

//     if (now.toDateString() === msgDate.toDateString()) {
//       return msgDate.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } else {
//       return (
//         msgDate.toLocaleDateString([], { month: "short", day: "numeric" }) +
//         ", " +
//         msgDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//       );
//     }
//   };

//   // Format timestamp for chat list
//   const formatLastMessageTime = (date) => {
//     const now = new Date();
//     const msgDate = new Date(date);

//     if (now.toDateString() === msgDate.toDateString()) {
//       return msgDate.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     }

//     const yesterday = new Date(now);
//     yesterday.setDate(now.getDate() - 1);
//     if (yesterday.toDateString() === msgDate.toDateString()) {
//       return "Yesterday";
//     }

//     const oneWeekAgo = new Date(now);
//     oneWeekAgo.setDate(now.getDate() - 7);
//     if (msgDate > oneWeekAgo) {
//       const options = { weekday: "short" };
//       return msgDate.toLocaleDateString(undefined, options);
//     }

//     return msgDate.toLocaleDateString([], { month: "short", day: "numeric" });
//   };

//   // Scroll to bottom of messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Handle socket connection and messages for the selected chat
//   useEffect(() => {
//     if (!selectedChat) return;

//     // Find the current chat user from chats
//     const currentChat = chats.find((chat) => chat.id === selectedChat);

//     if (currentChat) {
//       setTargetUser({
//         name: currentChat.name,
//         title: currentChat.title,
//         avatar: currentChat.avatar,
//         isOnline: currentChat.isOnline,
//         lastSeen: currentChat.isOnline ? "Online" : "Last seen recently",
//       });

//       // Mark as read when selecting a chat
//       setChats((prevChats) =>
//         prevChats.map((chat) =>
//           chat.id === selectedChat ? { ...chat, unread: 0 } : chat
//         )
//       );
//     }

//     const socket = CreateSocketConnection();
//     socket.emit("joinChat", { userId, targetUserId: selectedChat });

//     // Load existing messages
//     socket.on("loadMessages", (messagesData) => {
//       setMessages(messagesData);
//     });

//     // Handle new messages
//     socket.on(
//       "ReceivedMessages",
//       ({ firstName: senderName, text, sender, createdAt = new Date() }) => {
//         setMessages((prev) => [
//           ...prev,
//           { firstName: senderName, text, sender, createdAt },
//         ]);
//         setIsTyping(false);
//       }
//     );

//     // Handle typing indicator
//     socket.on("userTyping", ({ userId: typingUserId }) => {
//       if (typingUserId === selectedChat) {
//         setIsTyping(true);
//         setTimeout(() => {
//           setIsTyping(false);
//         }, 3000);
//       }
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, selectedChat, firstName]);

//   const handleTyping = (e) => {
//     setNewMessage(e.target.value);

//     // Emit typing event
//     const socket = CreateSocketConnection();
//     socket.emit("userTyping", {
//       userId,
//       targetUserId: selectedChat,
//     });
//   };

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const socket = CreateSocketConnection();
//     const timestamp = new Date();

//     socket.emit("sendMessage", {
//       firstName,
//       userId,
//       targetUserId: selectedChat,
//       text: newMessage,
//       timestamp,
//     });

//     setMessages((prev) => [
//       ...prev,
//       { firstName, text: newMessage, sender: userId, timestamp },
//     ]);

//     // Update last message in chat list
//     setChats((prevChats) =>
//       prevChats.map((chat) =>
//         chat.id === selectedChat
//           ? { ...chat, lastMessage: newMessage, timestamp: new Date() }
//           : chat
//       )
//     );

//     setNewMessage("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const selectChat = (chatId) => {
//     setSelectedChat(chatId);
//     if (window.innerWidth < 768) {
//       setShowSidebar(false);
//     }
//   };

//   const filteredChats = chats.filter(
//     (chat) =>
//       chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       chat.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const sortedChats = [...filteredChats].sort((a, b) => b.timestamp - a.timestamp);

//   const groupMessagesByDate = () => {
//     const groups = [];
//     let currentDate = "";

//     messages.forEach((msg) => {
//       const date = new Date(msg.createdAt).toLocaleDateString();

//       if (date !== currentDate) {
//         currentDate = date;
//         groups.push({
//           type: "date",
//           date: currentDate,
//         });
//       }

//       groups.push({
//         type: "message",
//         ...msg,
//       });
//     });

//     return groups;
//   };

//   const formatDateHeader = (dateStr) => {
//     const date = new Date(dateStr);
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(yesterday.getDate() - 1);

//     if (date.toDateString() === today.toDateString()) {
//       return "Today";
//     } else if (date.toDateString() === yesterday.toDateString()) {
//       return "Yesterday";
//     } else {
//       return date.toLocaleDateString([], {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//       });
//     }
//   };

//   const groupedMessages = groupMessagesByDate();

//   return (
//     <div className="w-full h-screen bg-gray-50 flex overflow-hidden">
//       {/* Sidebar - Chat List */}
//       <div
//         className={`${
//           showSidebar ? "block" : "hidden"
//         } md:block w-full md:w-80 lg:w-96 bg-white border-r h-full flex flex-col`}
//       >
//         {/* Sidebar Header */}
//         <div className="p-4 border-b flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <h2 className="font-semibold text-lg">Messages</h2>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="p-2 rounded-full hover:bg-gray-100">
//               <Bell size={18} className="text-gray-600" />
//             </button>
//             <button className="p-2 rounded-full hover:bg-gray-100">
//               <Filter size={18} className="text-gray-600" />
//             </button>
//             <button
//               className="md:hidden p-2 rounded-full hover:bg-gray-100"
//               onClick={() => setShowSidebar(false)}
//             >
//               <X size={18} className="text-gray-600" />
//             </button>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="p-3 border-b">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <Search size={16} className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               className="w-full py-2 pl-10 pr-4 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-green-500 focus:bg-white"
//               placeholder="Search messages"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Chat List */}
//         <div className="overflow-y-auto flex-1">
//           {sortedChats.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
//               <p>No conversations found</p>
//               {searchQuery && <p className="text-sm">Try a different search term</p>}
//             </div>
//           ) : (
//             sortedChats.map((chat) => (
//               <div
//                 key={chat.id}
//                 className={`flex items-start p-3 border-b cursor-pointer hover:bg-gray-50 ${
//                   selectedChat === chat.id ? "bg-green-50" : ""
//                 }`}
//                 onClick={() => selectChat(chat.id)}
//               >
//                 <div className="relative mr-3">
//                   <img
//                     src={chat.avatar}
//                     alt={chat.name}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   {chat.isOnline && (
//                     <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-baseline">
//                     <h4 className="font-medium text-gray-900 truncate">{chat.name}</h4>
//                     <span className="text-xs text-gray-500">
//                       {formatLastMessageTime(chat.timestamp)}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 truncate">{chat.title}</p>
//                   <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
//                 </div>
//                 {chat.unread > 0 && (
//                   <span className="ml-2 bg-green-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
//                     {chat.unread}
//                   </span>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div
//         className={`${
//           showSidebar ? "hidden" : "flex"
//         } md:flex flex-col flex-1 h-full`}
//       >
//         {/* Chat Header */}
//         <div className="bg-white border-b shadow-sm py-3 px-4 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <button
//               className="md:hidden p-1 rounded-full hover:bg-gray-100"
//               onClick={() => setShowSidebar(true)}
//             >
//               <Menu size={20} />
//             </button>
//             <div className="relative">
//               <img
//                 src={targetUser.avatar}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               {targetUser.isOnline && (
//                 <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
//               )}
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900">{targetUser.name}</h3>
//               <p className="text-xs text-gray-500 flex items-center">
//                 {targetUser.title && <span className="mr-2">{targetUser.title}</span>}
//                 <span
//                   className={`${
//                     targetUser.isOnline ? "text-green-500" : "text-gray-500"
//                   }`}
//                 >
//                   {targetUser.lastSeen}
//                 </span>
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             <button className="p-2 rounded-full hover:bg-gray-100">
//               <Phone size={18} className="text-gray-600" />
//             </button>
//             <button className="p-2 rounded-full hover:bg-gray-100">
//               <Video size={18} className="text-gray-600" />
//             </button>
//             <div className="relative">
//               <button
//                 className="p-2 rounded-full hover:bg-gray-100"
//                 onClick={() => setShowOptions(!showOptions)}
//               >
//                 <MoreVertical size={18} className="text-gray-600" />
//               </button>
//               {showOptions && (
//                 <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md py-1 border z-10">
//                   <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
//                     Mark as unread
//                   </button>
//                   <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
//                     Archive conversation
//                   </button>
//                   <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
//                     Report user
//                   </button>
//                   <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600">
//                     Block user
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Chat Messages */}
//         <div
//           ref={chatContainerRef}
//           className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
//         >
//           {groupedMessages.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4 text-center">
//               <p>No messages yet</p>
//               <p className="text-sm">Start the conversation by sending a message</p>
//             </div>
//           ) : (
//             groupedMessages.map((item, index) => {
//               if (item.type === "date") {
//                 return (
//                   <div key={`date-${index}`} className="flex justify-center my-4">
//                     <div className="bg-gray-200 px-3 py-1 rounded-full text-xs text-gray-600">
//                       {formatDateHeader(item.date)}
//                     </div>
//                   </div>
//                 );
//               }

//               const isSender = item.sender === userId;
//               return (
//                 <div
//                   key={`msg-${index}`}
//                   className={`flex ${isSender ? "justify-end" : "justify-start"}`}
//                 >
//                   <div className="flex items-end gap-2 max-w-[75%]">
//                     {!isSender && (
//                       <img
//                         src={targetUser.avatar}
//                         alt="avatar"
//                         className="w-8 h-8 rounded-full object-cover"
//                       />
//                     )}
//                     <div
//                       className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}
//                     >
//                       <div
//                         className={`px-4 py-2 rounded-lg ${
//                           isSender
//                             ? "bg-green-600 text-white rounded-br-none"
//                             : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
//                         }`}
//                       >
//                         <p className="text-sm whitespace-pre-wrap break-words">
//                           {item.text}
//                         </p>
//                       </div>
//                       <span className="text-xs text-gray-500 mt-1">
//                         {formatTime(item.createdAt)}
//                       </span>
//                     </div>
//                     {isSender && (
//                       <img
//                         src={userAvatar}
//                         alt="avatar"
//                         className="w-8 h-8 rounded-full object-cover"
//                       />
//                     )}
//                   </div>
//                 </div>
//               );
//             })
//           )}

//           {isTyping && (
//             <div className="flex justify-start">
//               <div className="flex items-end gap-2 max-w-[75%]">
//                 <img
//                   src={targetUser.avatar}
//                   alt="avatar"
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//                 <div className="flex flex-col items-start">
//                   <div className="px-4 py-3 rounded-lg bg-white border border-gray-200 rounded-bl-none">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                       <div
//                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.2s" }}
//                       ></div>
//                       <div
//                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.4s" }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Chat Input */}
//         <div className="bg-white border-t p-3">
//           <div className="flex items-center gap-2 bg-white border rounded-lg p-1">
//             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
//               <Paperclip size={18} />
//             </button>
//             <textarea
//               value={newMessage}
//               onChange={handleTyping}
//               onKeyDown={handleKeyDown}
//               placeholder="Type a message..."
//               className="flex-1 px-2 py-2 text-sm resize-none focus:outline-none max-h-32"
//               rows={1}
//               style={{ height: "auto", minHeight: "40px" }}
//             />
//             <button
//               onClick={sendMessage}
//               disabled={!newMessage.trim()}
//               className={`p-2 rounded-full ${
//                 newMessage.trim()
//                   ? "bg-green-600 text-white hover:bg-green-700"
//                   : "bg-gray-200 text-gray-400"
//               } transition-colors`}
//             >
//               <Send size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;







