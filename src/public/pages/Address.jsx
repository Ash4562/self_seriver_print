import React, { useState } from "react";
// import Navbar from "./NavLogin";
import AccountSidebar from "../components/AccountSidebar";
import { Pencil, Trash2, MapPin, X } from "lucide-react";

const Address = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-white font-poppins relative">
      {/* <Navbar /> */}
      <div className="flex flex-col md:flex-row gap-6 px-6 py-4 w-full min-h-screen">
        {/* Sidebar */}
        <AccountSidebar />

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-gray-300"></div>

        {/* Right Content */}
        <div className="flex-1 relative">
          <div className="border rounded-xl border-gray-200 p-4 h-full flex flex-col justify-between">
            {/* Address Card */}
            <div className="border border-orange-100 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shadow-sm">
              <div className="flex items-start gap-2 text-gray-700 text-sm">
                <MapPin className="w-5 h-5 mt-1 text-gray-400" />
                <div className="font-poppins">
                  <p>Print.sa, Al Sadhan 90</p>
                  <p>
                    Sulaymaniyah, Musa Ibn Nusair<br></br> Street, Riyadh
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center self-end sm:self-auto">
                <button className="text-yellow-500 hover:text-yellow-600">
                  <Pencil size={16} />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Add Address Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowForm(true)}
                className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 text-sm"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            {/* Close Icon */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>

            <h2 className="text-lg font-semibold mb-4">Add Address</h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 rounded-md border outline-none focus:ring-2 focus:ring-pink-500 border-transparent focus:border-none transition-all"
                style={{
                  borderImage: "linear-gradient(to right, #06b6d4, #ec4899) 1",
                }}
              />
              <input
                type="text"
                placeholder="Contact No"
                className="w-full px-4 py-2 rounded-md bg-gray-100"
              />
              <input
                type="text"
                placeholder="Street No / Area"
                className="w-full px-4 py-2 rounded-md bg-gray-100"
              />
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 py-2 rounded-md bg-gray-100"
              />
              <input
                type="text"
                placeholder="Pincode"
                className="w-full px-4 py-2 rounded-md bg-gray-100"
              />
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
