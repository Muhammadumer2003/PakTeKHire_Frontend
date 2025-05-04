// App.jsx
import React from "react";

const Notification = () => {
  // Example notifications data
  const notifications = [
    { id: 1, text: "Check what's new" },
    // Uncomment the next line to add another notification
    // { id: 2, text: "Another notification here" },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-md shadow-md">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
        </div>

        {/* Notifications List */}
        <div>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border-b hover:bg-gray-50 transition"
              >
                <p className="text-gray-600">{notification.text}</p>
              </div>
            ))
          ) : (
            <div className="p-4">
              <p className="text-gray-500">No notifications to show</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
