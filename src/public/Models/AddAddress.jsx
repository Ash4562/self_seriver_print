// import React, { useRef, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useGetAddressQuery } from "../../Redux/API/AddressAPI";

// const AddressFormModal = ({ isLoading, handleFormSubmit, handleClose }) => {
//   const [existingAddress, setExistingAddress] = useState(true);
//   const [selectedAddressId, setSelectedAddressId] = useState("");
//   const { data: data2 } = useGetAddressQuery();
//   console.log(data2);

//   const initialValues = {
//     name: "",
//     mobile: "",
//     street: "",
//     city: "",
//     pincode: "",
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .min(2, "Name must be at least 2 characters")
//       .max(50, "Name must be less than 50 characters")
//       .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
//       .required("Name is required"),

//     mobile: Yup.string()
//       .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
//       .required("Mobile number is required"),

//     street: Yup.string()
//       .min(5, "Street address must be at least 5 characters")
//       .max(100, "Street address must be less than 100 characters")
//       .required("Street address is required"),

//     city: Yup.string()
//       .min(2, "City must be at least 2 characters")
//       .max(50, "City must be less than 50 characters")
//       .matches(/^[a-zA-Z\s]+$/, "City can only contain letters and spaces")
//       .required("City is required"),

//     pincode: Yup.string()
//       .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
//       .required("Pincode is required"),
//   });

//   const handleSelectedAddress = () => {
//     if (selectedAddressId) {
//       // Find the selected address object
//       const selectedAddress = data2?.addresses?.find(
//         (addr) => addr._id === selectedAddressId
//       );
//       console.log("Selected Address ID:", selectedAddressId);
//       console.log("Selected Address Object:", selectedAddress);

//       // You can now use the selectedAddressId or selectedAddress object as needed
//       // For example, pass it to a parent component or store it in global state
//       if (handleFormSubmit) {
//         handleFormSubmit(selectedAddress);
//       }
//     } else {
//       alert("Please select an address to proceed");
//     }
//   };

//   const handleRadioChange = (addressId) => {
//     setSelectedAddressId(addressId);
//   };

//   return (
//     <div
//       onClick={() => handleClose()}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
//     >
//       {existingAddress ? (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="bg-white w-[90vw] h-[70vh] rounded-2xl shadow-xl p-6 sm:w-full sm:max-w-2xl flex flex-col gap-4"
//         >
//           {/* {addresses} */}
//           <div className="flex flex-row justify-between">
//             <p>Addresses</p>
//             <button
//               className={` bg-gradient-to-r from-pink-500 to-red-500 text-white rounded px-2 text-sm font-medium transition-opacity `}
//               onClick={() => {
//                 setExistingAddress(!existingAddress);
//               }}
//             >
//               Add Address
//             </button>
//           </div>
//           <div className="overflow-y-scroll flex flex-col gap-4">
//             {data2 &&
//               data2?.addresses?.map((ele, index) => (
//                 <div
//                   key={ele?._id}
//                   className="relative  flex flex-row mx-4  outline outline-black/30 px-2 md:py-4 md:px-8 rounded-2xl my-2"
//                 >
//                   <p className="absolute -top-2 left-4 bg-white px-2 text-sm font-semibold">
//                     Address {index + 1}
//                   </p>

//                   {/* Radio Button */}
//                   <div className="flex items-center justify-center mr-4">
//                     <input
//                       type="radio"
//                       id={`address-${ele._id}`}
//                       name="selectedAddress"
//                       value={ele._id}
//                       checked={selectedAddressId === ele._id}
//                       onChange={() => handleRadioChange(ele._id)}
//                       className="w-4 h-4 text-[#000]/30 bg-gray-100 border-gray-300"
//                     />
//                   </div>

//                   <p className="flex text-start leading-[33px] px-2 py-2 w-3/4">
//                     {`${ele.name ? ele.name + ", " : ""}${
//                       ele.homeOrFlat ? ele.homeOrFlat + ", " : ""
//                     }${ele.areaOrLocality ? ele.areaOrLocality + ", " : ""}${
//                       ele.landmark ? ele.landmark + ", " : ""
//                     }${ele.pincode || ""}`}
//                   </p>
//                   <div className="flex justify-end flex-row mx-8 items-center gap-8 w-1/4">
//                     <p>edit</p> <p>delete</p>
//                   </div>
//                 </div>
//               ))}
//           </div>
//           <button
//             className={`w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded text-lg font-medium transition-opacity ${
//               !selectedAddressId
//                 ? "opacity-50 cursor-not-allowed"
//                 : "hover:opacity-90"
//             }`}
//             onClick={() => handleSelectedAddress()}
//             disabled={!selectedAddressId}
//           >
//             Proceed
//           </button>
//         </div>
//       ) : (
//         <div
//           onClick={(e) => e.stopPropagation()}
//           className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">Add Address</h2>
//             <button
//               onClick={() => handleClose()}
//               className="text-gray-500 hover:text-gray-700 text-xl font-bold"
//               type="button"
//             >
//               ×
//             </button>
//           </div>

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={(values) => {
//               values.Name = values.name;
//               values.homeOrFlat = values.name;
//               values.areaOrLocality = values.street;
//               values.pincode = values.name;
//               values.landmark = values.pincode;
//               handleFormSubmit(values);
//             }}
//           >
//             {({ touched, errors }) => (
//               <Form className="space-y-4">
//                 <div>
//                   <Field
//                     type="text"
//                     name="name"
//                     placeholder="John Doe"
//                     className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
//                       touched.name && errors.name
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="name"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 <div>
//                   <Field
//                     type="tel"
//                     name="mobile"
//                     placeholder="Mobile No"
//                     className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
//                       touched.mobile && errors.mobile
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="mobile"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 <div>
//                   <Field
//                     type="text"
//                     name="street"
//                     placeholder="Street No / Area"
//                     className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
//                       touched.street && errors.street
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="street"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 <div>
//                   <Field
//                     type="text"
//                     name="city"
//                     placeholder="City"
//                     className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
//                       touched.city && errors.city
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="city"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 <div>
//                   <Field
//                     type="text"
//                     name="pincode"
//                     placeholder="Pincode"
//                     className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
//                       touched.pincode && errors.pincode
//                         ? "border-red-500"
//                         : "border-gray-300"
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="pincode"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded text-lg font-medium transition-opacity ${
//                     isLoading
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:opacity-90"
//                   }`}
//                 >
//                   {isLoading ? "Processing..." : "Proceed"}
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddressFormModal;

import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGetAddressQuery } from "../../Redux/API/AddressAPI";

const AddressFormModal = ({ isLoading, handleFormSubmit, handleClose }) => {
  const [existingAddress, setExistingAddress] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const { data: data2 } = useGetAddressQuery();
  // console.log(data2);

  const initialValues = {
    name: "",
    mobile: "",
    street: "",
    city: "",
    pincode: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
      .required("Name is required"),

    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
      .required("Mobile number is required"),

    street: Yup.string()
      .min(5, "Street address must be at least 5 characters")
      .max(100, "Street address must be less than 100 characters")
      .required("Street address is required"),

    city: Yup.string()
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be less than 50 characters")
      .matches(/^[a-zA-Z\s]+$/, "City can only contain letters and spaces")
      .required("City is required"),

    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
      .required("Pincode is required"),
  });

  const handleSelectedAddress = () => {
    if (selectedAddressId) {
      // Find the selected address object
      const selectedAddress = data2?.addresses?.find(
        (addr) => addr._id === selectedAddressId
      );

      // Pass the selected address with its ID to the parent component
      if (handleFormSubmit) {
        handleFormSubmit({
          ...selectedAddress,
          isExisting: true, // Flag to indicate this is an existing address
          addressId: selectedAddressId, // Explicitly pass the ID
        });
      }
    } else {
      alert("Please select an address to proceed");
    }
  };

  const handleRadioChange = (addressId) => {
    setSelectedAddressId(addressId);
  };

  const handleSelectFromExisting = () => {
    handleClose();

    handleFormSubmit(undefined, selectedAddressId);
  };

  return (
    <div
      onClick={() => handleClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      {existingAddress ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-[90vw] h-[70vh] rounded-2xl shadow-xl p-6 sm:w-full sm:max-w-2xl flex flex-col gap-4"
        >
          {/* {addresses} */}
          <div className="flex flex-row justify-between">
            <p>Addresses</p>
            <button
              className={` bg-gradient-to-r from-pink-500 to-red-500 text-white rounded px-2 text-sm font-medium transition-opacity `}
              onClick={() => {
                setExistingAddress(!existingAddress);
              }}
            >
              Add Address
            </button>
          </div>
          <div className="overflow-y-scroll flex flex-col gap-4">
            {data2 &&
              data2?.addresses?.map((ele, index) => (
                <div
                  key={ele?._id}
                  className="relative  flex flex-row mx-4  outline outline-black/30 px-2 md:py-4 md:px-8 rounded-2xl my-2"
                >
                  <p className="absolute -top-2 left-4 bg-white px-2 text-sm font-semibold">
                    Address {index + 1}
                  </p>

                  {/* Radio Button */}
                  <div className="flex items-center justify-center mr-4">
                    <input
                      type="radio"
                      id={`address-${ele._id}`}
                      name="selectedAddress"
                      value={ele._id}
                      checked={selectedAddressId === ele._id}
                      onChange={() => handleRadioChange(ele._id)}
                      className="w-4 h-4 text-[#000]/30 bg-gray-100 border-gray-300"
                    />
                  </div>

                  <p className="flex text-start leading-[33px] px-2 py-2 w-3/4">
                    {`${ele.Name ? ele.Name + ", " : ""}${
                      ele.homeOrFlat ? ele.homeOrFlat + ", " : ""
                    }${ele.areaOrLocality ? ele.areaOrLocality + ", " : ""}${
                      ele.landmark ? ele.landmark + ", " : ""
                    }${ele.pincode || ""}`}
                  </p>
                  <div className="flex justify-end flex-row mx-8 items-center gap-8 w-1/4">
                    <p>edit</p> <p>delete</p>
                  </div>
                </div>
              ))}
          </div>
          <button
            className={`w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded text-lg font-medium transition-opacity ${
              !selectedAddressId
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
            onClick={() => handleSelectFromExisting()}
            disabled={!selectedAddressId}
          >
            Proceed
          </button>
        </div>
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Add Address</h2>
            <button
              onClick={() => handleClose()}
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              type="button"
            >
              ×
            </button>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const getCoordinates = () =>
                new Promise((resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const latitude = position.coords.latitude;
                      const longitude = position.coords.longitude;
                      resolve({ latitude, longitude });
                    },
                    (error) => {
                      console.error("Error getting location:", error);
                      reject(error);
                    }
                  );
                });

              try {
                const co_ords = await getCoordinates();
                console.log("Coordinates:", co_ords);

                const newAddress = {
                  name: values.name,
                  mobile: values.mobile,
                  homeOrFlat: values.street,
                  areaOrLocality: values.city,
                  pincode: values.pincode,
                  landmark: "",
                  isExisting: false,
                  latitude: co_ords.latitude,
                  longitude: co_ords.longitude,
                };

                console.log("New Address Object:", newAddress);
                handleFormSubmit(newAddress);
              } catch (err) {
                console.error(
                  "User denied GPS permission or another error occurred."
                );
                // Optionally, show an alert or fallback behavior
              }
            }}
          >
            {({ touched, errors }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      touched.name && errors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="tel"
                    name="mobile"
                    placeholder="Mobile No"
                    className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      touched.mobile && errors.mobile
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="mobile"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="text"
                    name="street"
                    placeholder="Street No / Area"
                    className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      touched.street && errors.street
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="street"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="text"
                    name="city"
                    placeholder="City"
                    className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      touched.city && errors.city
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <Field
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    className={`w-full px-4 py-3 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500 ${
                      touched.pincode && errors.pincode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="pincode"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded text-lg font-medium transition-opacity ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-90"
                  }`}
                >
                  {isLoading ? "Processing..." : "Proceed"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default AddressFormModal;
