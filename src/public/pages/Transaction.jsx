import React from "react";
// import Navbar from './NavLogin'
import AccountSidebar from "../components/AccountSidebar";

const Transaction = () => {
  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* <Navbar /> */}
      <div className="flex flex-col md:flex-row gap-6 px-6 py-4 w-full min-h-screen">
        {/* Sidebar */}
        <AccountSidebar />

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-gray-300"></div>

        {/* Right Content Area */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="flex justify-end mb-4">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
              </svg>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-screen overflow-y-auto">
            {/* Table view on md+ screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full table-auto text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 font-poppins">
                    <th className="py-2 px-4 font-medium text-gray-700">
                      Shop Name
                    </th>
                    <th className="py-2 px-4 font-medium text-gray-700">
                      Date
                    </th>
                    <th className="py-2 px-4 font-medium text-gray-700">
                      Service Method
                    </th>
                    <th className="py-2 px-4 font-medium text-gray-700">
                      Service Type
                    </th>
                    <th className="py-2 px-4 font-medium text-gray-700">
                      Amount Debited
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">Techsurya It Solution</td>
                    <td className="py-2 px-4">25/05/2025</td>
                    <td className="py-2 px-4">Self Service</td>
                    <td className="py-2 px-4">Document Printing</td>
                    <td className="py-2 px-4 text-red-500">Rs.200</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">Techsurya It Solution</td>
                    <td className="py-2 px-4">25/05/2025</td>
                    <td className="py-2 px-4">Home Delivery</td>
                    <td className="py-2 px-4">Customised</td>
                    <td className="py-2 px-4 text-red-500">Rs.200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Card view on small screens */}
            <div className="md:hidden space-y-4">
              {[1, 2].map((item, index) => (
                <div key={index} className="border rounded-lg p-4 shadow-sm">
                  <p>
                    <span className="font-medium">Shop Name:</span> Techsurya It
                    Solution
                  </p>
                  <p>
                    <span className="font-medium">Date:</span> 25/05/2025
                  </p>
                  <p>
                    <span className="font-medium">Service Method:</span>{" "}
                    {index === 0 ? "Self Service" : "Home Delivery"}
                  </p>
                  <p>
                    <span className="font-medium">Service Type:</span>{" "}
                    {index === 0 ? "Document Printing" : "Customised"}
                  </p>
                  <p>
                    <span className="font-medium">Amount Debited:</span>{" "}
                    <span className="text-red-500">Rs.200</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
