import React, { useState } from "react";
import AccountSidebar from "../components/AccountSidebar";
import { IoSearch } from "react-icons/io5";
import { useGetAllOrdersQuery } from "../../Redux/API/OrdersAPI";

const Orders = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: orders = [], isLoading, error } = useGetAllOrdersQuery();
  // console.log(orders);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  // Helper function to get display name for document
  const getDocumentName = (order) => {
    if (order.docName) return order.docName;
    if (order.files && order.files.length > 0) {
      // Extract filename from URL
      const url = order.files[0].url;
      const filename = url.split("/").pop().split("-").slice(1).join("-");
      return filename.replace(/\.(png|jpg|pdf)\.?(png|jpg|pdf)?$/i, "");
    }
    return "Untitled Document";
  };

  const filteredOrders = orders
    .filter((order) => {
      // Handle both "pending" and "Pending" status
      const orderStatus = order.status?.toLowerCase() || "pending";
      const tabStatus = activeTab.toLowerCase();

      if (tabStatus === "pending" || tabStatus === "in process") {
        return orderStatus === "pending";
      }
      if (tabStatus === "completed") {
        return orderStatus === "completed";
      }
      return orderStatus === tabStatus;
    })
    .filter((order) => {
      const docName = getDocumentName(order);
      return docName.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div className="min-h-screen bg-white font-poppins">
      <div className="flex flex-col md:flex-row gap-6 px-6 py-4 w-full min-h-screen">
        <AccountSidebar />
        <div className="hidden md:block w-px bg-gray-300"></div>

        <div className="flex-1 space-y-4">
          {/* Search */}
          <div className="flex justify-end">
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <IoSearch className="w-6 h-6" />
              </span>
              <input
                type="text"
                placeholder="Search Orders"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-md pl-10 pr-4 py-2"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b text-sm font-medium relative">
            {["In Process", "Completed"].map((tab) => {
              const isActive =
                activeTab === tab ||
                (activeTab === "pending" && tab === "In Process");
              return (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab === "In Process" ? "pending" : "completed")
                  }
                  className={`relative px-4 py-2 transition duration-300 ${
                    isActive
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute left-6 bottom-0 w-16 h-[2px] bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Order Cards */}
          {isLoading ? (
            <p className="text-center text-gray-500">Loading orders...</p>
          ) : error ? (
            <p className="text-center text-red-500">Failed to fetch orders.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                  className="p-4 rounded-md shadow-sm bg-gray-50 text-xs cursor-pointer hover:shadow-md transition"
                >
                  <p
                    className="font-semibold font-poppins truncate"
                    title={getDocumentName(order)}
                  >
                    {getDocumentName(order)}
                  </p>
                  <p className="text-gray-600 mt-1 font-poppins">
                    Order Date: {formatDate(order.createdAt)}
                  </p>
                  <p className="mt-1 font-poppins">
                    Status:{" "}
                    <span
                      className={
                        order.status?.toLowerCase() === "completed"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }
                    >
                      {order.status || "Pending"}
                    </span>
                  </p>
                  {order.shop?.name && (
                    <p className="text-gray-500 mt-1 font-poppins text-xs truncate">
                      Shop: {order.shop.name}
                    </p>
                  )}
                </div>
              ))}
              {filteredOrders.length === 0 && (
                <p className="text-sm text-gray-400 col-span-full text-center mt-4">
                  No orders in this category.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[80vw] max-w-3xl p-6 text-sm relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row gap-6 font-poppins">
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <span className="font-semibold">
                    {getDocumentName(selectedOrder)}
                  </span>
                  <span>Order Date: {formatDate(selectedOrder.createdAt)}</span>
                  <span
                    className={`font-semibold ${
                      selectedOrder.status?.toLowerCase() === "completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    Status: {selectedOrder.status || "Pending"}
                  </span>
                </div>

                <hr />

                {/* Files Section */}
                {selectedOrder.files && selectedOrder.files.length > 0 && (
                  <div className="space-y-2 text-xs">
                    <h4 className="font-semibold">
                      Files ({selectedOrder.files.length})
                    </h4>
                    <div className="max-h-32 overflow-y-auto">
                      {selectedOrder.files.map((fileUrl, index) => {
                        // console.log(fileUrl);

                        const filename = fileUrl.originalname;
                        return (
                          <div
                            key={index}
                            className="flex justify-between items-center py-1"
                          >
                            <span className="truncate flex-1">{filename}</span>
                            <a
                              href={fileUrl.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-blue-500 hover:text-blue-700 text-xs"
                            >
                              View
                            </a>
                          </div>
                        );
                      })}
                    </div>
                    <hr className="my-3" />
                  </div>
                )}

                {/* Printing Options - Only show if data exists */}
                {(selectedOrder.paperSize ||
                  selectedOrder.paperType ||
                  selectedOrder.binding) && (
                  <div className="space-y-2 text-xs">
                    <h4 className="font-semibold">Printing Options</h4>
                    <div className="space-y-1">
                      <div className="md:flex md:gap-2 md:items-center">
                        <p className="flex-1">
                          <strong>Paper Size:</strong>{" "}
                          {selectedOrder.paperSize || "Not specified"}
                        </p>
                        <p className="flex-1">
                          <strong>Paper Type:</strong>{" "}
                          {selectedOrder.paperType || "Not specified"}
                        </p>
                        <p className="flex-1">
                          <strong>Binding:</strong>{" "}
                          {selectedOrder.binding || "Not specified"}
                        </p>
                      </div>
                      <div className="md:flex md:gap-2 md:items-center">
                        <p className="flex-1">
                          <strong>Printing Side:</strong>{" "}
                          {selectedOrder.printingSide || "Not specified"}
                        </p>
                        <p className="flex-1">
                          <strong>Color Type:</strong>{" "}
                          {selectedOrder.colorType || "Not specified"}
                        </p>
                      </div>
                      <div className="md:flex md:gap-2 md:items-center">
                        <p className="flex-1">
                          <strong>Printing Layout:</strong>{" "}
                          {selectedOrder.printingLayout || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <hr className="my-3" />
                  </div>
                )}

                {/* Price Summary - Only show if pricing data exists */}
                {(selectedOrder.printingRate ||
                  selectedOrder.deliveryRate ||
                  selectedOrder.total) && (
                  <div className="space-y-2 text-xs">
                    <h4 className="font-semibold">Price Summary</h4>
                    {selectedOrder.shop?.name && (
                      <div className="flex justify-between">
                        <p>
                          <strong>Shop Name:</strong>
                        </p>
                        <p>{selectedOrder.shop.name}</p>
                      </div>
                    )}
                    {selectedOrder.shop?.address && (
                      <div className="flex justify-between">
                        <p>
                          <strong>Shop Address:</strong>
                        </p>
                        <p>{selectedOrder.shop.address}</p>
                      </div>
                    )}
                    {selectedOrder.printingRate && (
                      <div className="flex justify-between">
                        <p>
                          <strong>Printing Rate:</strong>
                        </p>
                        <p>₹{selectedOrder.printingRate}</p>
                      </div>
                    )}
                    {selectedOrder.deliveryRate && (
                      <div className="flex justify-between">
                        <p>
                          <strong>Delivery Rate:</strong>
                        </p>
                        <p>₹{selectedOrder.deliveryRate}</p>
                      </div>
                    )}
                    {selectedOrder.total && (
                      <div className="flex justify-between font-semibold">
                        <p>
                          <strong>Total:</strong>
                        </p>
                        <p>₹{selectedOrder.total}</p>
                      </div>
                    )}
                    <hr />
                  </div>
                )}

                {/* User Information */}
                {selectedOrder.user && (
                  <div className="space-y-2 text-xs">
                    <h4 className="font-semibold">Customer Details</h4>
                    <div className="flex justify-between">
                      <p>
                        <strong>Name:</strong>
                      </p>
                      <p>{selectedOrder.user.name}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>
                        <strong>Email:</strong>
                      </p>
                      <p>{selectedOrder.user.email}</p>
                    </div>
                  </div>
                )}

                {selectedOrder.status?.toLowerCase() === "completed" && (
                  <div className="flex justify-between items-center text-sm font-poppins mt-4">
                    <p className="text-gray-700">Delivered On:</p>
                    <p className="text-gray-900 font-medium">
                      {selectedOrder.deliveredDate
                        ? formatDate(selectedOrder.deliveredDate)
                        : "Not specified"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
