import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const VideoIntroduction = () => {
  const [videoUploaded, setVideoUploaded] = useState(false);

  const handleVideoUpload = (e) => {
    if (e.target.files.length > 0) {
      setVideoUploaded(true);
      // Optionally, process the uploaded video file here
      console.log("Selected video:", e.target.files[0]);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-blue-400">
      <div className="text-blue-400 text-4xl">
        <FiPlus />
      </div>
      <p className="text-center text-sm text-gray-500 mt-2">
        Present yourself with a cool video including your works.
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 relative"
        onClick={() => document.getElementById("videoInput").click()}
      >
        Add Video
      </button>
      <input
        id="videoInput"
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleVideoUpload}
      />
      {videoUploaded && (
        <div className="mt-4 text-green-500 text-sm">
          Video added successfully!
        </div>
      )}
    </div>
  );
};

export default VideoIntroduction;
