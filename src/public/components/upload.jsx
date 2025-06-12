// import React, { useRef, useState } from "react";
// import { FaArrowUpFromBracket } from "react-icons/fa6";

// const UploadModal = ({ onClose, onSuccess }) => {
//   const fileInputRef = useRef(null);
//   const [uploading, setUploading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log("Uploading file:", file.name);
//       setUploading(true);
//       setProgress(0);

//       const steps = [30, 50, 100];
//       steps.forEach((p, i) => {
//         setTimeout(() => {
//           setProgress(p);
//         }, (i + 1) * 1000);
//       });

//       // Notify parent after animation is done
//       setTimeout(() => {
//         onSuccess(); // ✅ Redirects to UploadNext
//       }, 3500);
//     }
//   };

//   // Circle animation calculations
//   const radius = 45;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (progress / 100) * circumference;

//   return (
//     <div
//       className="fixed inset-0 bg-black/10 flex items-center justify-center z-100 "
//       onClick={handleBackdropClick}
//     >
//       <div
//         className="bg-white p-8 rounded-lg max-w-lg w-full text-center shadow-xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {uploading ? (
//           <div className="flex flex-col items-center justify-center h-64">
//             <h3 className="text-2xl font-Jura mb-4 text-black">
//               Your Files Are Uploading
//             </h3>
//             <div className="relative w-28 h-28">
//               <svg className="w-full h-full" viewBox="0 0 100 100">
//                 <defs>
//                   <linearGradient
//                     id="gradient"
//                     x1="0%"
//                     y1="0%"
//                     x2="100%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#00AFEF" />
//                     <stop offset="100%" stopColor="#ff0080" />
//                   </linearGradient>
//                 </defs>
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r={radius}
//                   stroke="#e5e7eb"
//                   strokeWidth="10"
//                   fill="none"
//                 />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r={radius}
//                   stroke="url(#gradient)"
//                   strokeWidth="10"
//                   fill="none"
//                   strokeDasharray={circumference}
//                   strokeDashoffset={offset}
//                   strokeLinecap="round"
//                   transform="rotate(-90 50 50)"
//                   style={{ transition: "stroke-dashoffset 0.5s ease" }}
//                 />
//               </svg>
//               <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-black">
//                 {progress}%
//               </span>
//             </div>
//           </div>
//         ) : (
//           <>
//             <h2 className="text-4xl font-Jura mb-2 text-black">Upload Files</h2>
//             <p className="text-sm text-gray-500 mb-4">
//               Uploaded files will be available in your Workspace and can be
//               added to projects.
//             </p>

//             <div
//               className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 cursor-pointer"
//               onClick={handleClick}
//             >
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: "none" }}
//               />
//               <div className="text-xl mb-2 text-black flex justify-center">
//                 <FaArrowUpFromBracket className="h-10 w-10" />
//               </div>
//               <p className="text-sm text-gray-500 text-center">
//                 Drag Anywhere To Add Files
//               </p>
//               <p className="my-2 text-black text-center">OR</p>
//               <button
//                 type="button"
//                 className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded block mx-auto"
//               >
//                 Browse Files
//               </button>
//             </div>

//             <p className="text-xs text-gray-500">
//               For best results, use high-resolution files. Max file size: 150MB.
//               Max file name length: 100.
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadModal;

import React, { useRef, useState } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";

const UploadModal = ({ onClose, onSuccess }) => {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploading file:", file.name);
      setUploading(true);
      setProgress(0);

      const steps = [30, 50, 100];
      steps.forEach((p, i) => {
        setTimeout(() => {
          setProgress(p);
        }, (i + 1) * 1000);
      });

      // Notify parent after animation is done
      setTimeout(() => {
        onSuccess(); // ✅ Redirects to UploadNext
      }, 3500);
    }
  };

  // Circle animation calculations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white p-8 rounded-lg max-w-lg w-full text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {uploading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <h3 className="text-2xl font-Jura mb-4 text-black">
              Your Files Are Uploading
            </h3>
            <div className="relative w-28 h-28">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00AFEF" />
                    <stop offset="100%" stopColor="#ff0080" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-black">
                {progress}%
              </span>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-Jura mb-2 text-black">Upload Files</h2>
            <p className="text-sm text-gray-500 mb-4">
              Uploaded files will be available in your Workspace and can be
              added to projects.
            </p>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 cursor-pointer"
              onClick={handleClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <div className="text-xl mb-2 text-black flex justify-center">
                <FaArrowUpFromBracket className="h-10 w-10" />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Drag Anywhere To Add Files
              </p>
              <p className="my-2 text-black text-center">OR</p>
              <button
                type="button"
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded block mx-auto"
              >
                Browse Files
              </button>
            </div>

            <p className="text-xs text-gray-500">
              For best results, use high-resolution files. Max file size: 150MB.
              Max file name length: 100.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
