import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Video from "/GetStarted.mp4";
import UploadModal from "./upload";

const GetStarted = () => {
  const [showUpload, setShowUpload] = useState(false);
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    setShowUpload(false);
    navigate("/upload-next");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden mt-4">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          src={Video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        {/* Responsive Headings */}
        <h2 className="text-2xl sm:text-xl md:text-5xl font-semibold font-jura mb-48 leading-tight ">
          Upload, Customize, and
          <br className="sm:hidden" /> Print – It’s That Simple!
        </h2>

        {/* Get Started Button */}
        <button
          onClick={() => setShowUpload(true)}
          className="px-6 py-3 sm:px-8 sm:py-4 text-xl sm:text-2xl -mt-32 font-semibold rounded-full bg-gradient-to-r from-[#ED008D] to-[#FFF200] hover:scale-105 transition-transform font-jura"
        >
          Get Started
        </button>

        {/* Upload Modal */}
        {showUpload && (
          <UploadModal
            onClose={() => setShowUpload(false)}
            onSuccess={handleUploadSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default GetStarted;
