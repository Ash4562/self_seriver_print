import React, { useState } from "react";
import { Upload, Link, X } from "lucide-react";

const ShowUploadOptions = ({
  setShowUploadOptions,
  handleFileChange,
  //   setDriveLink,
  handleDriveLinkSubmit,
}) => {
  const [driveLink, setDriveLink] = useState("");

  const handleFileUpload = (event) => {
    // Call the parent's handleFileChange function
    handleFileChange(event);
    // Close the modal after file selection
    setShowUploadOptions(false);
  };

  const handleDriveLinkSub = () => {
    handleDriveLinkSubmit(driveLink);
    setShowUploadOptions(false);
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-60"
          onClick={() => setShowUploadOptions(false)}
        />

        {/* Modal Content */}
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 z-10">
          {/* Close Button */}
          <button
            onClick={() => setShowUploadOptions(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Upload Options
            </h2>
            <p className="text-gray-600">
              Choose how you'd like to upload your file
            </p>
          </div>

          {/* Upload Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Local Computer Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg px-12 p-6 hover:border-blue-400 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Upload size={40} className="text-blue-500 mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Upload from Computer
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Select a file from your local device
                </p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  multiple
                  accept=".pdf"
                />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>
            </div>

            {/* Google Drive Link */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-400 transition-colors">
              <div className="flex flex-col items-center text-center">
                <Link size={40} className="text-green-500 mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Upload from Google Drive
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Paste a Google Drive share link
                </p>

                <div className="w-full space-y-3">
                  <input
                    type="url"
                    // value={driveLink}
                    onChange={(e) => setDriveLink(e.target.value)}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleDriveLinkSub()}
                    // disabled={!driveLink.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Upload from Drive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowUploadOptions;
