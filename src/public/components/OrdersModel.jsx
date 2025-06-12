import React, { useState } from 'react';
import AccountSidebar from "./AccountSidebar";
import { IoSearch } from "react-icons/io5";

const OrdersModel = () => {
    const [activeTab, setActiveTab] = useState('In Process');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const orders = [
        { file: "ID Card.pdf", date: "26/05/2025", status: "In Process" },
        { file: "ID Card.pdf", date: "24/05/2025", status: "Completed" },
        { file: "ID Card.pdf", date: "26/05/2025", status: "In Process" },
        { file: "ID Card.pdf", date: "20/05/2025", status: "Completed" }
    ];

    const filteredOrders = orders.filter(order => order.status === activeTab);

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
                                <IoSearch className='w-6 h-6' />
                            </span>
                            <input
                                type="text"
                                placeholder="Search Orders"
                                className="w-full border rounded-md pl-10 pr-4 py-2"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b text-sm font-medium relative">
                        {['In Process', 'Completed'].map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative px-4 py-2 transition duration-300 ${isActive
                                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500'
                                        : 'text-gray-500'
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

                    {/* Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {filteredOrders.map((order, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedOrder(order);
                                    setShowModal(true);
                                }}
                                className="p-4 rounded-md shadow-sm bg-gray-50 text-xs cursor-pointer hover:shadow-md transition"
                            >
                                <p className="font-semibold font-poppins">{order.file}</p>
                                <p className="text-gray-600 mt-1 font-poppins">Order Date: {order.date}</p>
                                <p className="mt-1 font-poppins">
                                    Status:{' '}
                                    <span
                                        className={
                                            order.status === 'Completed'
                                                ? 'text-green-500'
                                                : 'text-yellow-500'
                                        }
                                    >
                                        {order.status}
                                    </span>
                                </p>
                            </div>
                        ))}
                        {filteredOrders.length === 0 && (
                            <p className="text-sm text-gray-400 col-span-full text-center mt-4">
                                No orders in this category.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[50vw] max-w-3xl p-6 text-sm relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
                        >
                            ✕
                        </button>

                        {/* Modal Content */}
                        <div className="flex flex-col md:flex-row gap-6 font-poppins">
                            {/* Left: Printing Options */}
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap justify-between items-center  gap-2">
                                    <span>{selectedOrder.file}</span>
                                    <span>Order Date: {selectedOrder.date}</span>
                                    <span className={font-semibold ${selectedOrder.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}}>
                                        Status: {selectedOrder.status}
                                    </span>
                                </div>

                                <hr />

                                {/* Printing Options */}
                                <div className="space-y-2 text-xs">
                                    <h4 className="font-semibold">Printing Options</h4>
                                    <div className="space-y-1">
                                        <div className="md:flex md:gap-2 md:items-center">
                                            <p className="flex-1"><strong>Paper Size :</strong> A4</p>
                                            <p className="flex-1"><strong>Paper Type :</strong> Normal</p>
                                            <p className="flex-1"><strong>Binding :</strong> No Binding</p>
                                        </div>
                                        <div className="md:flex md:-gap-16 md:items-center">
                                            <p className="flex-1"><strong>Printing Side :</strong> Single Side</p>
                                            <p className="flex-1"><strong>Color Type :</strong> Black & White</p>
                                        </div>
                                        <div className="md:flex md:gap-6 md:items-center">
                                            <p className="flex-1"><strong>Printing Layout :</strong> Portrait</p>
                                        </div>
                                    </div>

                                    <hr className="my-3" />

                                    {/* Price Summary */}
                                    <div className="space-y-2 text-xs">
                                        <h4 className="font-semibold">Price Summary</h4>
                                        <div className="flex justify-between">
                                            <p><strong>Shop Name:</strong></p>
                                            <p>Techsurya It Solution</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p><strong>Printing Rate:</strong></p>
                                            <p>100</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p><strong>Delivery Rate:</strong></p>
                                            <p>100</p>
                                        </div>
                                        <div className="flex justify-between font-semibold">
                                            <p><strong>Total:</strong></p>
                                            <p>200</p>
                                        </div>

                                        <hr />
                                        {selectedOrder.status === "Completed" && (
                                            <div className="flex justify-between items-center text-sm font-poppins mt-4">
                                                <p className="text-gray-700">Delivered On:</p>
                                                <p className="text-gray-900 font-medium">20/05/2025</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersModel;