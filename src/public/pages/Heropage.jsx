// import { Link } from "react-router-dom";
// import printerImage from "/public/Printer.png";

// const Hero = () => {
//   return (
//     <div
//       className={`relative w-[100vw] h-[100vh] bg-[#F8F8F8] rounded-b-[60px] sm:rounded-b-[100px] font-Poppins overflow-hidden pb-12 sm:pb-0 overflow-x-hidden`}
//     >
//       {/* Hero Content */}
//       <div className="flex flex-col-reverse sm:flex-row items-center justify-between px-4 sm:px-16 -mt-12 sm:mt-0 relative z-10">
//         {/* Text Section */}
//         <div className="w-full sm:w-1/2 space-y-4 text-center sm:text-left mt-8 sm:mt-0">
//           <p className="text-gray-500 font-medium text-base sm:text-xl">
//             Your Ultimate Printing Partner
//           </p>
//           <h1 className="text-3xl sm:text-5xl font-bold leading-tight bg-gradient-to-r from-[#ED008D] to-[#00AFEF] text-transparent bg-clip-text">
//             Fast, Custom & Easy
//             <br className="hidden sm:block" />
//             To Print.
//           </h1>
//           <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4 mt-6">
//             <button className="px-6 py-2 bg-[#00AFEF] text-white rounded-full text-base sm:text-lg font-semibold shadow-md">
//               Print Document
//             </button>
//             <Link
//               to={"/customised"}
//               className="inline-block p-[2px] rounded-full bg-gradient-to-r from-[#ED008D] via-[#FFF200] to-[#00AFEF]"
//             >
//               <button className="px-6 py-2 bg-white text-black rounded-full text-base sm:text-lg">
//                 Customised
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Image Section */}
//         <div className="w-full sm:w-1/2 relative max-w-md sm:max-w-xl mx-auto sm:mx-0">
//           <img
//             src={printerImage}
//             alt="Printer"
//             className="w-full h-auto max-h-[500px] sm:max-h-[600px] object-contain"
//           />
//         </div>
//       </div>

//       {/* Background Text */}
//       <h1 className="absolute top-24 sm:top-32 left-4 sm:left-10 text-[100px] sm:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#999999] to-[#999999] opacity-10 z-0 select-none leading-none tracking-tight">
//         PRINT
//         <br className="" />
//         CRAFTER
//       </h1>
//     </div>
//   );
// };

// export default Hero;

import React, { useState } from "react";
import printerImage from "/public/Printer.png";
import UploadModal from "../components/upload";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [showUpload, setShowUpload] = useState(false);
  const navigate = useNavigate();

  const handleUploadSuccess = () => {
    setShowUpload(false);
    navigate("/upload-next");
  };
  return (
    <div
      className={`relative w-[100vw] h-[100vh] bg-[#F8F8F8] rounded-b-[60px] sm:rounded-b-[100px] font-Poppins  sm:pb-0  sm:-mt-20 `}
    >
      {/* Hero Content */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between px-4 sm:px-16  relative z-10 -mx-4">
        {/* Text Section */}
        <div className="w-full sm:w-1/2 space-y-4 text-center sm:text-left mt-8 sm:mt-0">
          <p className="text-gray-500 font-medium text-base sm:text-xl font-poppins ">
            Your Ultimate Printing Partner
          </p>
          <h1 className="text-3xl sm:text-5xl font-semibold leading-tight bg-gradient-to-r from-[#ED008D] to-[#00AFEF] text-transparent bg-clip-text font-poppins">
            Fast, Custom & Easy
            <br className="hidden sm:block" />
            To Print.
          </h1>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4 mt-6">
            <button
              onClick={() => setShowUpload(true)}
              className="px-6 py-2 bg-[#00AFEF] text-white rounded-full text-base sm:text-lg font-semibold shadow-md"
            >
              Print Document
            </button>
            <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-[#ED008D] via-[#FFF200] to-[#00AFEF]">
              <button className="px-6 py-2 bg-white text-black rounded-full text-base sm:text-lg">
                Customised
              </button>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUpload && (
          <UploadModal
            onClose={() => setShowUpload(false)}
            onSuccess={handleUploadSuccess}
          />
        )}

        {/* Image Section */}
        <div className="w-full sm:w-1/2 relative max-w-md sm:max-w-xl mx-auto sm:mx-0">
          <img
            src={printerImage}
            alt="Printer"
            className="w-full h-auto md:max-h-[700px] sm:max-h-[600px] object-contain"
          />
        </div>
      </div>

      {/* Background Text */}
      <h1 className="absolute top-24 sm:top-32 left-4 sm:left-10 text-[100px] sm:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#999999] to-[#999999] opacity-10 z-0 select-none leading-none tracking-tight">
        PRINT
        <br className="" />
        CRAFTER
      </h1>
    </div>
  );
};

export default Hero;
