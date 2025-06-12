// import React from "react";
// import Navbar from "../components/nav";
// import Footer from "../components/Footers";
// import { FaCheck } from "react-icons/fa6";
// import { GrLocation } from "react-icons/gr";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const Payment = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   console.log(
//     "location",state
//   );
//   const uploadSteps = [
//     { icon: "/upload.png", label: "Upload File", path: "/upload-next" },
//     { icon: "/customized.png", label: "Customised", path: "/customised" },
//     { icon: "/Review.png", label: "Review & Confirm", path: "/review" },
//     { icon: "/Payment.png", label: "Payment", path: "/ReviewNext" },
//     { icon: "/Placeorder.png", label: "Place Order", path: "/Payment" },
//   ];

//   const handlePreviewClick = () => {
//     navigate("/OrderSuccessful", { state: { ...state } });
//   };
//   const currentStep = 3;

//   return (
//     <div className="min-h-screen overflow-x-hidden">
//       <div className="w-full py-6 px-4 shadow-sm">
//         <div className="flex justify-center items-center sm:gap-10 gap-2">
//           {uploadSteps.map((step, i) => (
//             <Link to={step.path} className="flex flex-col items-center" key={i}>
//               <img
//                 src={step.icon}
//                 alt={step.label}
//                 className="w-10 h-10 sm:w-14 sm:h-14 mb-2"
//               />

//               {/* Left line */}
//               {i !== 1 && (
//                 <div
//                   className={`absolute sm:left-72 sm:top-48 sm:h-1 sm:w-5/12 left-0 top-40 h-1 w-10/12 z-0 ${
//                     i <= currentStep
//                       ? "bg-gradient-to-r from-pink-500 to-yellow-400"
//                       : ""
//                   }`}
//                 />
//               )}

//               {/* Right line */}
//               {i !== step.length - 1 && (
//                 <div
//                   className={`absolute sm:right-64 sm:top-48 sm:h-1 sm:w-64 right-12 top-40 h-1 w-2/12 z-0 ${
//                     i < currentStep
//                       ? "bg-gradient-to-r from-pink-500 to-yellow-400"
//                       : "bg-gray-300"
//                   }`}
//                 />
//               )}
//               <div className="relative w-6 h-6 sm:w-16 sm:h-16 flex items-center justify-center">
//                 <div
//                   className={`sm:w-12 sm:h-12 h-8 w-8 rounded-full flex items-center justify-center z-10 ${
//                     i <= currentStep
//                       ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-white"
//                       : "bg-gray-300 text-white"
//                   }`}
//                 >
//                   <FaCheck className="w-5 h-5" />
//                 </div>
//               </div>
//               <p className="text-sm mt-2 font-Jura text-center">{step.label}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4 font-Jura mb-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b pb-4 font-Poppins">
//           <h2 className="text-lg font-semibold">Print Summary</h2>
//           <p className="text-sm text-gray-500 font-semibold">
//             Doc Name:{" "}
//             <span className="font-medium text-gray-700">ID Card.pdf</span>
//           </p>
//           <div>
//             {" "}
//             <button className="bg-[#00AFEF] text-white w-full px-4 h-9 rounded-lg font-Poppins text-sm hover:opacity-90 transition">
//               Download Receipt
//             </button>
//           </div>{" "}
//         </div>

//         {/* Print Details */}
//         <div className="text-sm text-gray-700 space-y-3">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-2 gap-x-4 font-Poppins">
//             <p>
//               <span className="font-semibold">Paper Size</span>: A4
//             </p>
//             <p>
//               <span className="font-semibold">Paper Type</span>: Normal
//             </p>
//             <p>
//               <span className="font-semibold">Binding</span>: No Binding
//             </p>
//             <p>
//               <span className="font-semibold">Color Type</span>: Black & White
//             </p>
//             <p>
//               <span className="font-semibold">Printing Layout</span>: Portrait
//             </p>
//             <p>
//               <span className="font-semibold">Printing Side</span>: Single Side
//             </p>
//           </div>

//           {/* Address */}
//           <div className="pt-4 flex items-start gap-2 text-gray-600 border-t mt-4 font-Poppins">
//             <GrLocation className="w-5 h-5 mt-0.5" />
//             <p>
//               Print.sa, Al Sadlan 90 Sukriyamaniyah,
//               <br className="md:hidden"></br> Musa Ibn Nusair Street, Riyadh
//             </p>
//           </div>
//         </div>

//         {/* Pricing Table */}
//         <div className="pt-4 border-t text-sm text-gray-700 space-y-2 font-Poppins">
//           <div className="flex justify-between">
//             <p className="font-semibold">Shop Name</p>
//             <p>Techsurya It Solution</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="font-semibold">Printing Rate</p>
//             <p>100</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="font-semibold">Delivery Rate</p>
//             <p>100</p>
//           </div>
//           <div className="flex justify-between border-t pt-2 font-semibold text-black">
//             <p>Total</p>
//             <p>200</p>
//           </div>
//         </div>
//       </div>
//       {/* Proceed Button */}
//       <div className="text-center pt-1 pb-4">
//         <button
//           onClick={handlePreviewClick}
//           className="bg-gradient-to-r from-[#ED008D] to-[#FF002B] text-white px-8 py-2  font-medium shadow-md hover:opacity-90 font-Poppins"
//         >
//           Proceed
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Payment;




import React from "react";
import { FaCheck } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../Redux/API/OrdersAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Payment = () => {

  const navigate = useNavigate();
  const shopId = useSelector((state) => state.hotel.hotelId);
  console.log("hotelId",shopId);
  const { state } = useLocation();
  console.log(state);
  const uploadSteps = [
    { icon: "/upload.png", label: "Upload File", path: "/upload-next" },
    { icon: "/customized.png", label: "Customised", path: "/customised" },
    // { icon: "/Review.png", label: "Review & Confirm", path: "/review" },
    // { icon: "/Payment.png", label: "Payment", path: "/ReviewNext" },
    { icon: "/Placeorder.png", label: "Place Order", path: "/Payment" },
  ];

  const [placeOrder, { isLoading }] = useCreateOrderMutation();

  // const handlePreviewClick = async () => {
  //   console.log(state);
  //   const data = {
  //     selectedMethod: state?.selectedMethod,
  //     selectedCountry: state?.selectedCountry,
  //     selectedCity: state?.selectedCity,
  //     shopName: state?.selectedShop?.shop?.ShopName,
  //     shopAddress: state?.selectedShop?.shop?.address,
  //     printingRate: state?.selectedShop?.shop?.totalServicePrice,
  //     deliveryRate: state?.selectedShop?.shop?.deliveryPrice,
  //     addressId: state?.addressId,
  //     pdfOption: Object.values(state?.pdfOptions),
  //     shopId,
  //   };
  //   console.log(data);
  //   try {
  //     const res = await placeOrder(data).unwrap();
  //     console.log(res);
  //     toast.success(res?.message);
  //     navigate("/OrderSuccessful", { state: { ...state, order: res } });
  //   } catch (error) {
  //     toast.error(error?.message || "Something went wrong!");
  //     // console.log(error);
  //   }
  // };

  const handlePreviewClick = async () => {
    console.log(state);
  
    const pdfOptions = Object.values(state?.pdfOptions || {});
    if (!shopId || pdfOptions.length === 0) {
      toast.error("shopId and pdfOptions are required");
      return;
    }
  
    const data = {
      selectedMethod: state?.selectedMethod,
      selectedCountry: state?.selectedCountry,
      selectedCity: state?.selectedCity,
      shopName: state?.selectedShop?.shop?.ShopName,
      shopAddress: state?.selectedShop?.shop?.address,
      printingRate: state?.selectedShop?.shop?.totalServicePrice,
      deliveryRate: state?.selectedShop?.shop?.deliveryPrice,
      addressId: state?.addressId,
      pdfOptions, // ✅ fixed key name
      shopId,     // ✅ from Redux
    };
  
    console.log("Sending order data:", data);
  
    try {
      const res = await placeOrder(data).unwrap();
      console.log("Order placed:", res);
      toast.success(res?.message);
      navigate("/OrderSuccessful", { state: { ...state, order: res } });
    } catch (error) {
      console.error("Order error:", error);
      toast.error(error?.message || "Something went wrong!");
    }
  };
  
  const currentStep = 3;

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="w-full py-6 px-4 shadow-sm">
        <div className="flex justify-center items-center sm:gap-10 gap-2">
          {uploadSteps.map((step, i) => (
            <Link to={step.path} className="flex flex-col items-center" key={i}>
              <img
                src={step?.icon}
                alt={step?.label}
                className="w-10 h-10 sm:w-14 sm:h-14 mb-2"
              />

              {/* Left line */}
              {i !== 1 && (
                <div
                  className={`absolute sm:left-72 sm:top-48 sm:h-1 sm:w-5/12 left-8 top-40 h-1 w-10/12 z-0 ${
                    i <= currentStep
                      ? "bg-gradient-to-r from-pink-500 to-yellow-400"
                      : ""
                  }`}
                />
              )}

              {/* Right line */}
              {i !== step.length - 1 && (
                <div
                  className={`absolute sm:right-64 sm:top-48 sm:h-1 sm:w-64 right-12 top-40 h-1 w-2/12 z-0 ${
                    i < currentStep
                      ? "bg-gradient-to-r from-pink-500 to-yellow-400"
                      : "bg-gray-300"
                  }`}
                />
              )}
              <div className="relative w-6 h-6 sm:w-16 sm:h-16 flex items-center justify-center">
                <div
                  className={`sm:w-12 sm:h-12 h-8 w-8 rounded-full flex items-center justify-center z-10 ${
                    i <= currentStep
                      ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-white"
                      : "bg-gray-300 text-white"
                  }`}
                >
                  <FaCheck className="w-5 h-5" />
                </div>
              </div>
              <p className="text-sm mt-2 font-Jura text-center">{step.label}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4 font-Jura mb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 border-b pb-4 font-Poppins">
          <h2 className="text-lg font-semibold">Print Summary</h2>
          {/* <p className="text-sm text-gray-500 font-semibold">
            Doc Name:{" "}
            <span className="font-medium text-gray-700">ID Card.pdf</span>
          </p> */}
          {/* <div>
            {" "}
            <button className="bg-[#00AFEF] text-white w-full px-4 h-9 rounded-lg font-Poppins text-sm hover:opacity-90 transition">
              Download Receipt
            </button>
          </div>{" "} */}
        </div>

        {/* Print Details */}
        <div className="text-sm text-gray-700 space-y-3">
          {state &&
            Object.values(state.pdfOptions).map((pdfOption, endexu) => {
              console.log(pdfOption);
              return (
                <div key={pdfOption?._id}>
                  <p className="text-sm text-gray-500 font-semibold my-4 gap-x-4">
                    <span>{endexu + 1 + " )"}</span> Doc Name:
                    <span className="font-medium text-gray-700">
                      {" " + pdfOption?.fileName}
                    </span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-2 gap-x-4 font-Poppins">
                    <p>
                      <span className="font-semibold">Paper Size</span>:{" "}
                      {pdfOption?.paperSize}
                    </p>
                    <p>
                      <span className="font-semibold">Paper Size Manual</span>:{" "}
                      {pdfOption?.paperSizeManually
                        ? pdfOption?.paperSizeManually
                        : "Not Applied"}
                    </p>
                    <p>
                      <span className="font-semibold">Paper Type</span>:{" "}
                      {pdfOption?.paperType}
                    </p>
                    <p>
                      <span className="font-semibold">Binding</span>:{" "}
                      {pdfOption?.packagingOption}
                    </p>
                    <p>
                      <span className="font-semibold">Color Type</span>:{" "}
                      {pdfOption?.printColor}
                    </p>
                    <p>
                      <span className="font-semibold">Printing Layout</span>:
                      {pdfOption?.layoutOption == 1
                        ? " Portrait"
                        : " Horizontal"}
                    </p>
                    <p>
                      <span className="font-semibold">Printing Side</span>:
                      {pdfOption?.printSide}
                    </p>
                    <p>
                      <span className="font-semibold">Number of Sheets</span>:
                      {pdfOption?.sheetsCount}
                    </p>
                    <p>
                      <span className="font-semibold">
                        Customised Selected Range
                      </span>
                      :
                      {!pdfOption?.customRanges.length == 0 &&
                      pdfOption?.customRanges
                        ? pdfOption?.customRanges.map((item) => item)
                        : " No selected range"}
                    </p>
                    <p>
                      <span className="font-semibold">Reading Direction</span>:{" "}
                      {pdfOption?.readingDirection &&
                        pdfOption.readingDirection
                          .replace(/-/g, " ") // replace dashes with space
                          .replace(/\b\w/, (char) => char.toUpperCase())}{" "}
                      {/* capitalize first letter */}
                    </p>
                  </div>{" "}
                </div>
              );
            })}
          {/* Address */}
          {/* <div className="pt-4 flex items-start gap-2 text-gray-600 border-t mt-4 font-Poppins">
            <GrLocation className="w-5 h-5 mt-0.5" />
            <p>
              Print.sa, Al Sadlan 90 Sukriyamaniyah,
              <br className="md:hidden"></br> Musa Ibn Nusair Street, Riyadh
            </p>
            <p>
              {state?.selectedShop?.shop?.ShopName}
              {", "}
              {state?.selectedShop?.shop?.address}
              {", "}
              {state?.selectedShop?.shop?.city}
            </p>
          </div> */}
        </div>

        {/* Pricing Table */}
        {/* <div className="pt-4 border-t text-sm text-gray-700 space-y-2 font-Poppins">
          <div className="flex justify-between">
            <p className="font-semibold">Shop Name</p>
            <p>{state?.selectedShop?.shop?.ShopName}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Printing Rate</p>
            <p>{state?.selectedShop?.shop?.totalServicePrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Delivery Rate</p>
            <p>{state?.selectedShop?.shop?.deliveryPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Distance</p>
            <p>{state?.selectedShop?.shop?.distanceInKm}</p>
          </div>
          <div className="flex justify-between border-t pt-2 font-semibold text-black">
            <p>Total</p>
            <p>{state?.selectedShop?.shop?.deliveryPrice}</p>
          </div>
        </div> */}
      </div>
      {/* Proceed Button */}
      <div className="text-center pt-1 pb-4">
        <button
          onClick={handlePreviewClick}
          disabled={isLoading}
          className={`bg-gradient-to-r from-[#ED008D] to-[#FF002B] text-white px-8 py-2  font-medium shadow-md hover:opacity-90 font-Poppins ${
            isLoading ? "opacity-90" : ""
          }`}
        >
          {isLoading ? "Proceeding" : "Proceed"}{" "}
        </button>
      </div>
    </div>
  );
};
export default Payment;
