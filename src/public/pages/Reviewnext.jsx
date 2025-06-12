import React, { useState, useRef, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { useGetShopsQuery } from "../../Redux/API/OrdersAPI";
import AddressFormModal from "../Models/AddAddress";
import { useCreateAddressMutation } from "../../Redux/API/AddressAPI";
import toast from "react-hot-toast";

const Review = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const id = state.pdfOptions["0"]._id;
  const count = state.pdfOptions["0"].pageCount;
  const city = state.selectedCity;
  const country = state.selectedCountry;
console.log("location",city);
  // console.log(state.pdfOptions);
  const [filters, setFilters] = useState({
    country: country,
    city:city,
    addressId:id,
    count:count,
  });

  // Fixed RTK Query hook usage
  const { data: shops = [], isLoading } = useGetShopsQuery(filters);
  // console.log("data",shops);
  const [createAddress, { isLoading: isLoadingCreateAddress }] =
    useCreateAddressMutation();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const filterRef = useRef();
  const dropdownRef = useRef(null);
  const modalRef = useRef();

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    street: "",
    city: "",
    pincode: "",
  });

  const uploadSteps = [
    { icon: "/upload.png", label: "Upload File", path: "/upload-next" },
    { icon: "/customized.png", label: "Customised", path: "/customised" },
    { icon: "/Review.png", label: "Review & Confirm", path: "/review" },
    { icon: "/Payment.png", label: "Payment", path: "/ReviewNext" },
    { icon: "/Placeorder.png", label: "Place Order", path: "/Payment" },
  ];

  const currentStep = 3;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreviewClick = (e) => {
    e.preventDefault();

    const isFormValid = Object.values(address).every(
      (field) => field.trim() !== ""
    );

    if (!isFormValid) {
      alert("Please fill in all fields before proceeding.");
      return;
    }
    console.log(state);
    navigate("/Payment", { state: { ...state, filters: filters } });
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (values, id) => {
    console.log(values, id);

    if (!id) {
      const res = await createAddress({
        addresses: [{ Name: values?.name, ...values }],
      });
      console.log(res);
      toast.success("Address added successfully!");
      setShowForm(false);
    } else {
      console.log({ state: state, shopId: id });
      console.log(id);
      setShowForm(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilter(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <main className="flex-grow">
        {/* Upload Steps */}
        <div className="w-full py-6 shadow-sm">
          <div className="flex justify-center items-center sm:gap-10 gap-2">
            {uploadSteps.map((step, i) => (
              <Link
                to={step.path}
                className="flex flex-col items-center"
                key={i}
              >
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
                <p className="text-sm mt-2 font-Jura text-center">
                  {step.label}
                </p>
              </Link>
            ))}
          </div>

          <div className="space-y-4 mx-auto my-8">
            <div className="bg-[#F0F0F0] p-6 mx-4">
              {/* Location Dropdowns */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="relative w-1/3">
                  <select
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                    className="w-full h-16 px-3 pr-10 rounded bg-white appearance-none text-gray-700 border border-gray-300"
                  >
                    <option value="India">India</option>
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>

                <div className="relative w-1/3">
                  <select
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    className="w-full h-16 px-3 pr-10 rounded bg-white appearance-none text-gray-700 border border-gray-300"
                  >
                    <option value="chh. sambhaji nagar">
                      chh. sambhaji nagar
                    </option>
                  </select>
                  <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* Shop Selection Header */}
              <div className="flex items-center justify-between w-full mb-4">
                <h3 className="text-lg font-semibold">Select Printing Shop</h3>

                <div
                  ref={filterRef}
                  className="relative z-50 inline-block text-left"
                >
                  <div ref={dropdownRef}>
                    <button
                      onClick={() => setShowFilter(!showFilter)}
                      className="px-6 py-2 border rounded bg-white shadow text-sm flex items-center"
                    >
                      Filter By <FiFilter className="w-4 h-4 ml-2" />
                    </button>

                    {showFilter && (
                      <div className="absolute mt-2 w-48 right-0 bg-white shadow-md rounded border border-gray-100 z-50">
                        <ul className="text-gray-700 text-sm divide-y divide-gray-200">
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                            Price Low - High
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                            Price High - Low
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                            Location
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Shop Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                  <div className="col-span-full text-center py-8">
                    Loading shops...
                  </div>
                ) : shops?.shops?.length > 0 ? (
                  shops?.shops?.map((shop, index) => {
                    const isSelected = selectedCard === index;
                    isSelected && console.log(shop);
                    return (
                      <div
                        key={shop.id || index}
                        onClick={() => {
                          setSelectedCard(index);
                        }}
                        className={`rounded-2xl p-[2px] transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-b from-[#ED008D] to-[#00CFFF]"
                            : "bg-gray-200"
                        }`}
                      >
                        <div className="flex flex-col justify-between h-full rounded-2xl bg-[#F8F8F8]">
                          <div className="space-y-2 px-4 pt-4">
                            <img
                              src={shop.logo || "/tech.png"}
                              alt="Logo"
                              className="w-20 h-16 max-h-16 my-1 object-contain"
                            />
                            <p className="font-bold text-sm text-gray-800 font-poppins">
                              {shop?.ShopName || "Techsurya It Solution"}
                            </p>
                            <p className="text-xs py-3 text-gray-600 flex items-center gap-2 text-center">
                              <CiLocationOn className="w-5 h-5" />
                              {shop.address ||
                                "Print.sa, Al Sadlan 90 Sulaymaniyah, Musa Ibn Nusair Street, Riyadh"}
                            </p>
                            <p className="text-xs text-gray-600 flex items-center">
                              <GoClock className="w-4 h-4 mr-1" />
                              {shop.hours || "Mon to Fri 10:00 AM - 6 PM"}
                            </p>
                          </div>

                          <div className="mt-4 space-y-1 text-sm text-black bg-white p-4 rounded-2xl shadow-sm border font-poppins">
                            <div className="flex justify-between opacity-80">
                              <span>Printing Rate</span>
                              <span>{shop?.printingRate || "12"}</span>
                            </div>
                            <div className="flex justify-between opacity-80">
                              <span>Delivery Rate</span>
                              <span>{shop?.deliveryRate || "0"}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                              <span>Total</span>
                              <span>
                                {(shop.printingRate || 12) +
                                  (shop.deliveryRate || 0)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full text-center py-8">
                    No shops found in this area
                  </div>
                )}
              </div>

              {/* Proceed Button */}
              {!showForm && (
                <div className="text-right mt-6">
                  <button
                    onClick={() => {
                      if (selectedCard === null) {
                        alert("Please select a shop first");
                        return;
                      }
                      setShowForm(true);
                    }}
                    className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded text-lg font-medium shadow-md"
                  >
                    Proceed
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showForm && (
        <AddressFormModal
          isLoading={isLoadingCreateAddress}
          handleFormSubmit={handleFormSubmit}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default Review;
