import React, { useState, useRef, useEffect } from "react";
import { HiTrash, HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { MdPrint } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useDeleteUploadedFilesMutation,
  useDeleteUploadedSubFilesMutation,
  useGetUploadedFilesQuery,
  useUploadFilesMutation,
  useUploadFilesWithDriveMutation,
} from "../../Redux/API/PrintFilesAPI";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setPdfFiles } from "../../Redux/Slice/pdfFilesSlice";
import G_DriveBoxInput from "../components/G_DriveBoxInput";
import ShowUploadOptions from "../components/ShowUploadOptions";

const Uploadnext = () => {
  const location = useLocation();
  const shopId = location.state?.shopId;
  console.log('shopId:', shopId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPrintOptions, setShowPrintOptions] = useState(null);
  const [showPrintOption, setShowPrintOption] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [progress, setProgress] = useState(0);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [gdriveInputBox, setGdriveInputBox] = useState(false);
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  const fileInputRef = useRef(null);
  const printOptionsRef = useRef();

  const { user } = useSelector((state) => state.auth);

  const [
    uploadFiles,
    {
      isLoading: isUploading,
      isSuccess: isSuccessUploadFiles,
      isError: isErrorUploadFiles,
    },
  ] = useUploadFilesMutation();

  // Fetch uploaded files with polling
  const { data: uploadedOrders = [], isLoading: isLoadingGetFiles } =
    useGetUploadedFilesQuery();
  const [deleteFile, { isLoading, isSuccess, isError }] =
    useDeleteUploadedFilesMutation();
  const [
    deleteSubFile,
    {
      isLoading: isLoadingDeleteSubFile,
      isSuccess: isSuccessDeleteSubFile,
      isErro: isErrorDeleteSubFiles,
    },
  ] = useDeleteUploadedSubFilesMutation();

  const [
    uploadFilesFromGdrive,
    {
      isLoading: isLoadingUploadFilesFromGdrive,
      isSuccess: isSuccessUploadFilesFromGdrive,
      isErro: isErrorUploadFilesFromGdrive,
    },
  ] = useUploadFilesWithDriveMutation();

  // Group orders and include file details
  const groupedOrders = uploadedOrders.map((order) => ({
    id: order._id,
    files: order.files.map((file) => ({
      id: file._id,
      name: file.originalname,
      pages: file.pageCount,
      url: file.url,
    })),
    date: new Date(order.createdAt).toLocaleDateString("en-GB"),
    totalPages: order.files.reduce((sum, file) => sum + file.pageCount, 0),
    fileCount: order.files.length,
  }));

  // const handleFilesUpload = (uploadedFiles) => {
  // };

  // Toggle group expansion
  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Upload steps data
  const uploadSteps = [
    { icon: "/upload.png", label: "Upload File", path: "/upload-next" },
    { icon: "/customized.png", label: "Customised", path: "/customised" },
    // { icon: "/Review.png", label: "Review & Confirm", path: "/review" },
    // { icon: "/Payment.png", label: "Payment", path: "/ReviewNext" },
    { icon: "/Placeorder.png", label: "Place Order", path: "/Payment" },
  ];

  const currentStep = 0;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const handleFileUploadClick = () => {
    // fileInputRef.current.click();
    // setGdriveInputBox(true);
    setShowUploadOptions(true);
  };

  const handleDeleteClick = (id) => {
    setFileToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);

    try {
      await deleteFile(fileToDelete);
      toast.success(`Order deleted successfully!`);
    } catch (error) {
      toast.error(error.message || "Failed to delete order");
    }
    setFileToDelete(null);
  };

  const handleChangeDelivery = (e, group) => {
    setSelectedMethod(e.target.value);
    dispatch(setPdfFiles(group));
    console.log(e.target.value);
    navigate("/customised", {
      state: {
        selectedMethod: e?.target?.value,
        shopId: shopId  // ya jo bhi aapka variable name hai
      }
    });
  };

  const handleSubFileDelete = async (FileId, SubFileId) => {
    // console.log(order, file);
    try {
      const res = await deleteSubFile({ FileId, SubFileId }).unwrap();
      toast.success(res?.message);
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleNavigateToCustomized = (e, group) => {
    dispatch(setPdfFiles(group));
    navigate("/customised");
  };

  const handleFileChange = async (e) => {
    const formData = new FormData();
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      formData.append("files", file);
    });
    if (user?.user?.contact) {
      formData.append("contact", user.user.contact);
    }

    setProgress(0);
    const steps = [30, 60, 80, 100];
    steps.forEach((p, i) => {
      setTimeout(() => {
        setProgress(p);
      }, (i + 1) * 1000);
    });

    try {
      await uploadFiles(formData).unwrap();
      toast.success("Files uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("File upload failed!");
    }
  };

  const handleDriveLinkSubmit = async (link) => {
    console.log("clicked", link);
    const userEmail = user?.user?.email;
    console.log(userEmail);

    setProgress(0);
    const steps = [30, 60, 80, 100];
    steps.forEach((p, i) => {
      setTimeout(() => {
        setProgress(p);
      }, (i + 1) * 1000);
    });

    try {
      const res = await uploadFilesFromGdrive({
        email: userEmail,
        driveLinks: [link],
      }).unwrap();
      console.log(res);
      toast.success("Files uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("File upload failed!");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        printOptionsRef.current &&
        !printOptionsRef.current.contains(event.target)
      ) {
        setShowPrintOptions(null);
        setShowPrintOption(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-white">
        {/* Upload Steps */}
        <div className="w-full py-6 px-4 shadow-sm">
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
                {/* {i !== 1 && (
                  <div
                    className={`absolute sm:left-72 sm:top-48 sm:h-1 sm:w-1/12 left-0 top-40 h-1 w-1/12 z-0 ${
                      i <= currentStep
                        ? "bg-gradient-to-r from-pink-500 to-yellow-400"
                        : ""
                    }`}
                  />
                )} */}

                {/* Right line */}
                {i !== step.length - 1 && (
                  <div
                    className={`absolute sm:right-64 sm:top-48 sm:h-1 sm:w-1/2 right-12 top-40 h-1 w-9/12 z-0 ${
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
        </div>

        {/* File Table - DESKTOP VIEW */}
        <div className="hidden md:block max-w-5xl mx-auto my-8 bg-white rounded-lg relative">
          <div className="my-4 text-right">
            <button
              onClick={handleFileUploadClick}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded shadow hover:opacity-90 transition"
            >
              Upload New File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
              accept="pdf"
            />
          </div>

          <table className="w-full table-auto overflow-y-scroll shadow-xl">
            <thead>
              <tr className="bg-gradient-to-r from-pink-500 to-red-500 text-white">
                <th className="px-4 py-2 text-left"></th>
                <th className="px-4 py-2 text-left">Group</th>
                <th className="px-4 py-2 text-left">Files</th>
                <th className="px-4 py-2 text-left">Pages</th>
                <th className="px-4 py-2 text-left">Uploaded Date</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            {isLoadingGetFiles ? (
              <tbody>
                <tr>
                  <td colSpan="100%" className="text-center py-4 text-xl">
                    Loading...
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {groupedOrders.length > 0 ? (
                  groupedOrders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      <tr className="border-b hover:bg-gray-50 transition">
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() => toggleGroup(order.id)}
                            className="text-gray-700 hover:text-gray-900"
                          >
                            {expandedGroups[order.id] ? (
                              <HiChevronUp className="w-5 h-5" />
                            ) : (
                              <HiChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-2">Group {index + 1}</td>
                        <td className="px-4 py-2">{order.fileCount} files</td>
                        <td className="px-4 py-2">{order.totalPages}</td>
                        <td className="px-4 py-2">{order.date}</td>
                        <td className="px-4 py-2 flex gap-4 items-center font-Poppins relative">
                          <MdPrint
                            onClick={(e) =>
                              handleNavigateToCustomized(e, order)
                            }
                            className="cursor-pointer text-black w-6 h-6"
                          />
                          <HiTrash
                            onClick={() => handleDeleteClick(order.id)}
                            className="cursor-pointer text-red-500 w-6 h-6"
                          />
                          {showPrintOptions === order.id && (
                            <div
                              ref={printOptionsRef}
                              className="absolute top-8 right-0 w-72 bg-white rounded-xl shadow-lg z-50 p-4"
                            >
                              <h3 className="text-center text-lg text-black mb-3">
                                Choose Printing Method
                              </h3>
                              <div className="p-[2px] rounded-lg bg-gradient-to-r from-pink-500 to-blue-500">
                                <select
                                  value={selectedMethod}
                                  onChange={(e) =>
                                    handleChangeDelivery(e, order)
                                  }
                                  className="w-full bg-white text-gray-700 px-3 py-2 rounded-lg focus:outline-none appearance-none"
                                >
                                  <option value="">Select</option>
                                  <option value="home-delivery">
                                    Home Delivery
                                  </option>
                                  <option value="self-service">
                                    Self Service
                                  </option>
                                  <option value="pickup">Pickup</option>
                                  <option value="self-pickup">
                                    Self-Pickup
                                  </option>
                                </select>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>

                      {/* Expanded file details */}
                      {expandedGroups[order.id] &&
                        order.files.map((file) => (
                          <tr key={file.id} className="bg-gray-50">
                            <td></td>
                            <td colSpan="4" className="px-8 py-2">
                              <div className="flex justify-between">
                                <span className="text-gray-700">
                                  {file.name}
                                </span>
                                <span className="text-gray-600">
                                  {file.pages} pages
                                </span>
                                <span className="text-gray-600">
                                  <HiTrash
                                    onClick={() =>
                                      handleSubFileDelete(order.id, file.id)
                                    }
                                    className="cursor-pointer text-red-500 w-5 h-5"
                                  />
                                </span>
                              </div>
                            </td>
                            <td></td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No orders uploaded yet
                    </td>
                  </tr>
                )}
              </tbody>
            )}{" "}
          </table>

          {/* Upload button */}

          {/* Uploading overlay */}
          {isUploading ||
            (isLoadingUploadFilesFromGdrive && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-lg">
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
            ))}
        </div>
      </main>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col p-4">
        <div className="text-right mb-4">
          <button
            onClick={handleFileUploadClick}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            Upload New File
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
            accept=".pdf"
          />
        </div>

        {isLoadingGetFiles && (
          <p className="text-center py-4 text-xl">Loading...</p>
        )}
        {groupedOrders.length > 0 ? (
          groupedOrders.map((order, index) => (
            <div key={order.id} className="mb-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="mb-2">
                      <strong className="block text-gray-700">Group:</strong>
                      <span>Group {index + 1}</span>
                    </div>
                    <div className="mb-2">
                      <strong className="block text-gray-700">Files:</strong>
                      <span>{order.fileCount} files</span>
                    </div>
                    <div className="mb-2">
                      <strong className="block text-gray-700">Pages:</strong>
                      <span>{order.totalPages}</span>
                    </div>
                    <div className="mb-2">
                      <strong className="block text-gray-700">
                        Uploaded Date:
                      </strong>
                      <span>{order.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-3">
                      <MdPrint
                        onClick={() =>
                          setShowPrintOption(
                            showPrintOption === order.id ? null : order.id
                          )
                        }
                        className="cursor-pointer text-black w-5 h-5"
                      />
                      <HiTrash
                        onClick={() => handleDeleteClick(order.id)}
                        className="cursor-pointer text-red-500 w-5 h-5"
                      />
                    </div>

                    <button
                      onClick={() => toggleGroup(order.id)}
                      className="text-gray-700 hover:text-gray-900 mt-2"
                    >
                      {expandedGroups[order.id] ? (
                        <HiChevronUp className="w-5 h-5" />
                      ) : (
                        <HiChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Print options dropdown */}
                {showPrintOption === order.id && (
                  <div
                    ref={printOptionsRef}
                    className="mt-3 w-full bg-white rounded-xl shadow-lg p-4"
                  >
                    <h3 className="text-center text-base text-black mb-3">
                      Choose Printing Method
                    </h3>
                    <div className="p-[2px] rounded-lg bg-gradient-to-r from-pink-500 to-blue-500">
                      <select
                        value={selectedMethod}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="w-full bg-white text-gray-700 px-3 py-2 rounded-lg focus:outline-none appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="home">Home Delivery</option>
                        <option value="self-service">Self Service</option>
                        <option value="pickup">Pickup</option>
                        <option value="self-pickup">Self-Pickup</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Expanded file details */}
              {expandedGroups[order.id] && (
                <div className="mt-2 bg-gray-100 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Files in this group:
                  </h4>
                  <div className="space-y-3">
                    {order.files.map((file) => (
                      <div
                        key={file.id}
                        className="flex justify-between items-center bg-white p-3 rounded shadow-sm"
                      >
                        <div className="truncate mr-2">
                          <span className="text-gray-800">{file.name}</span>
                        </div>
                        <span className="text-gray-600 whitespace-nowrap">
                          {file.pages} pages
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No files uploaded yet
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Delete Order?</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this entire order?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showUploadOptions && (
        <ShowUploadOptions
          handleDriveLinkSubmit={handleDriveLinkSubmit}
          setShowUploadOptions={setShowUploadOptions}
          handleFileChange={handleFileChange}
          // setDriveLink={setDriveLink}
        />
      )}
      {/* {gdriveInputBox && (
        <G_DriveBoxInput
          gdriveInputBox={gdriveInputBox}
          setGdriveInputBox={setGdriveInputBox}
        />
      )} */}
    </div>
  );
};

export default Uploadnext;
