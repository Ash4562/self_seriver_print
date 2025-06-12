import React, { useState } from "react";

import { useUploadFilesWithDriveMutation } from "../../Redux/API/PrintFilesAPI";

const G_DriveBoxInput = ({ setGdriveInputBox, gdriveInputBox }) => {
  const [inputValue, setInputValue] = useState("");

  const [uploadFilesWithDrive, {}] = useUploadFilesWithDriveMutation();

  if (!gdriveInputBox) return null;

  const data = {
    email: "tempshan12@gmail.com",
    driveLinks: [
      "https://drive.google.com/file/d/1oPHssej_rtasbaxSRLsfWunVV7nizPA4/view?usp=drive_link",
      "https://drive.google.com/file/d/16ZMOfn-A_1QJZD9CkpVk3ygfYcTJYeL_/view?usp=drive_link",
    ],
  };

  const handleGetFiles = async () => {
    const res = await uploadFilesWithDrive(data);
    console.log(res);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={() => setGdriveInputBox(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Enter Google Drive Link
        </h2>
        <input
          type="text"
          placeholder="Paste your Google Drive link..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              handleGetFiles();
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default G_DriveBoxInput;
