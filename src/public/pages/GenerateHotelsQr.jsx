




import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGenerateQRMutation } from "../../Redux/hotel/userApi";
// import { useGenerateQRMutation } from "../../redux/hotelUserApi.jsx/userApi";

const GenerateHotelsQr = () => {
  const location = useLocation();
  console.log('location',location);
  const navigate = useNavigate();


  // Get hotel_id from location state
  const hotelIdFromLocation = location.state?.hotel_id || "";
  console.log("Received hotel_id from location:", hotelIdFromLocation);

  const [hotelId, setHotel_id] = useState(hotelIdFromLocation);
  const [generateQR, { data, isLoading, error }] = useGenerateQRMutation();
console.log();
console.log(data);
  useEffect(() => {
    if (hotelId && !data) {
      console.log("Calling API with:", {hotelId });
      generateQR({ hotelId});
    }
  }, [hotelId, generateQR, data]);

  const handleNavigate = () => {
    console.log("Navigating with hotelId:", hotelId);

    if (hotelId) {
      navigate("/signin", { state: { hotelId } });
    } else {
      alert("Error: Hotel ID missing!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
      <img
            src="/justChink.jpeg" // Replace with your company logo path
            alt="Company Logo"
            className="w-32 h-auto  mx-auto"
          />
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-700">
          Scan this QR Code
        </h2>

        <div className="mt-4 flex flex-col items-center">
          {isLoading && <p className="text-gray-500">Generating QR Code...</p>}
          {error && (
            <p className="text-red-500 mt-2">
              {error.data?.message || "Error generating QR"}
            </p>
          )}

          {data && (
            <>
              {/* ✅ QR Code Clickable - Opens in New Tab */}
              <a  href={data.hotelUrl} target="_blank" rel="noopener noreferrer">
                <img src={data?.qrCodeUrl} alt="QR Code" className="w-40 sm:w-48 h-auto cursor-pointer" />
              </a>

              <p className="text-sm text-gray-600 mt-2">Scan this QR Code or visit:</p>

              {/* ✅ Navigates to Aadhaar OTP Page */}
              <button
      onClick={() => window.open(data.hotelUrl, "_blank")}
      className="text-blue-500 text-sm sm:text-base"
    >
      Open Link
    </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateHotelsQr;


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// import { useGenerateQRMutation } from '../../redux/hotelUserApi.jsx/userApi';

// const GenerateHotelsQr = () => {
//   const navigate = useNavigate();
//   const [generateQRCode, { data, isSuccess, isError, error }] = useGenerateQRMutation();

//   const [hotelId, setHotelId] = useState(''); // This should come from the previous page (hotelId)
//   const [qrCodeUrl, setQrCodeUrl] = useState('');

//   useEffect(() => {
//     // Assuming you have hotelId available from previous page navigation state
//     const hotelIdFromState = "some-hotel-id"; // Replace with actual hotelId from state
//     setHotelId(hotelIdFromState);

//     // Generate the QR code when the component mounts
//     generateQRCode({ hotelId: hotelIdFromState });
//   }, [generateQRCode]);

//   useEffect(() => {
//     if (isSuccess && data?.qrCodeUrl) {
//       setQrCodeUrl(data.qrCodeUrl);
//     }

//     if (isError) {
//       toast.error(error?.data?.message || "Error generating QR code.");
//     }
//   }, [isSuccess, isError, data, error]);

//   return (
//     <div>
//       <h2>Hotel QR Code</h2>
//       {qrCodeUrl ? (
//         <img src={qrCodeUrl} alt="Hotel QR Code" />
//       ) : (
//         <p>Loading QR Code...</p>
//       )}
//     </div>
//   );
// };

// export default GenerateHotelsQr;
