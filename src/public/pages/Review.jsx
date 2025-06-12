import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetCountryQuery } from "../../Redux/API/OrdersAPI";
import AddressFormModal from "../Models/AddAddress";
import { useCreateAddressMutation } from "../../Redux/API/AddressAPI";
import toast from "react-hot-toast";

const Review = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log({ previousStates: state });
  // State for selected country and city
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  // const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  const { data: countries, isLoading, error } = useGetCountryQuery();
  const [createAddress, { isLoading: isLoadingCreateAddress }] =
    useCreateAddressMutation();

  // Extract countries and cities from API response
  const countriesData = countries?.data || {};
  const countryNames = Object.keys(countriesData);
  const availableCities = selectedCountry
    ? countriesData[selectedCountry] || []
    : [];

  const handleChangeDelivery = (e) => {
    setSelectedMethod(e.target.value);
    // dispatch(setPdfFiles(group));
    // console.log(e.target.value);
    // navigate("/customised", { state: { selectedMethod: e?.target?.value } });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedCity(""); // Reset city when country changes
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handlePreviewClick = () => {
    if (!selectedCountry || !selectedCity || !selectedMethod) {
      alert("Please select country, city and address before proceeding.");
      return;
    }

    try {
      console.log("API call");
    } catch (error) {
      console.log(error);
    }
    // Pass selected location data to next page
    navigate("/ReviewNext", {
      state: {
        ...state,
        selectedCountry,
        selectedCity,
        selectedMethod,
      },
    });
  };

  const uploadSteps = [
    { icon: "/upload.png", label: "Upload File", path: "/upload-next" },
    { icon: "/customized.png", label: "Customised", path: "/customised" },
    { icon: "/Review.png", label: "Review & Confirm", path: "/review" },
    { icon: "/Payment.png", label: "Payment", path: "/ReviewNext" },
    { icon: "/Placeorder.png", label: "Place Order", path: "/Payment" },
  ];
  const currentStep = 2;

  return (
    <div className="min-h-screen overflow-x-hidden ">
      <div className="w-full py-6 px-4 shadow-sm">
        <div className="flex justify-center items-center sm:gap-10 gap-2">
          {uploadSteps.map((step, i) => (
            <Link to={step.path} className="flex flex-col items-center" key={i}>
              <img
                src={step.icon}
                alt={step.label}
                className="w-10 h-10 sm:w-14 sm:h-14 mb-2"
              />
              {/* Left line */}
              {i !== 1 && (
                <div
                  className={`absolute sm:left-72 sm:top-48 sm:h-1 sm:w-96 left-0 top-40 h-1 w-8/12 z-0 ${
                    i <= currentStep
                      ? "bg-gradient-to-r from-pink-500 to-yellow-400"
                      : ""
                  }`}
                />
              )}

              {/* Right line */}
              {i !== uploadSteps.length - 1 && (
                <div
                  className={`absolute sm:right-64 sm:top-48 sm:h-1 sm:w-4/12 right-12 top-40 h-1 w-5/12 z-0 ${
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

        <div className="bg-[#EFEFEF] flex flex-col items-center justify-center p-6 my-4 ">
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-4">
              <p>Loading countries...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-4 text-red-500">
              <p>Error loading countries. Please try again.</p>
            </div>
          )}

          {/* Select Country */}
          <div className="w-full max-w-md mt-6">
            <label className="block text-lg font-semibold text-gray-800 mb-1">
              Select Country
            </label>
            <div className="p-[1.5px] rounded border">
              <div className="relative w-full">
                <select
                  className="w-full h-12 px-3 pr-10 rounded outline-none bg-white appearance-none text-gray-700"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  disabled={isLoading}
                >
                  <option value="">Please select your country</option>
                  {countryNames.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Select City */}
          <div className="w-full max-w-md mt-6">
            <label className="block text-lg font-semibold text-gray-800 mb-1">
              Select City
            </label>
            <div className="p-[1.5px] rounded border ">
              <div className="relative w-full">
                <select
                  className="w-full h-12 px-3 pr-10 rounded outline-none bg-white appearance-none text-gray-700"
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={!selectedCountry || availableCities.length === 0}
                >
                  <option value="">
                    {!selectedCountry
                      ? "Please select a country first"
                      : availableCities.length === 0
                      ? "No cities available"
                      : "Please select your city"}
                  </option>
                  {availableCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="py-6">
            <div
              // ref={printOptionsRef}
              className=" bg-white rounded-xl shadow-lg z-50 p-4"
            >
              <h3 className="text-center md:text-lg font-semibold text-gray-800 mb-3">
                Choose Printing Method
              </h3>
              <div className="p-[2px] rounded-lg border ">
                <select
                  value={selectedMethod}
                  onChange={(e) => handleChangeDelivery(e)}
                  className="w-full text-sm md:text-base bg-white text-gray-700 px-2 py-2 rounded-lg focus:outline-none appearance-none"
                  disabled={!selectedCity}
                >
                  <option value="">Select</option>
                  <option value="home-delivery">Home Delivery</option>
                  <option value="self-service">Self Service</option>
                  <option value="pickup">Pickup</option>
                  <option value="self-pickup">Self-Pickup</option>
                </select>
              </div>
            </div>
            <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          {/* 
          {showAddressForm && (
            <AddressFormModal
              isLoading={isLoadingCreateAddress}
              handleFormSubmit={handleFormSubmit}
              handleClose={handleClose}
            />
          )} */}

          {/* Proceed Button */}
          <button
            onClick={handlePreviewClick}
            className={`bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-2 rounded text-lg font-medium shadow hover:opacity-90 transition ${
              !selectedCountry || !selectedCity || !selectedMethod
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!selectedCountry || !selectedCity || !selectedMethod}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
