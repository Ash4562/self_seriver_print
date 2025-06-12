import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PDFPreview from "../pages/PDFPreview";
import { useSelector } from "react-redux";
import { RiArrowDropDownLine } from "react-icons/ri";

const Review = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const uploadedFiles = useSelector((state) => state.pdfFiles.files.files);
  const shopId = location.state?.shopId;
  console.log("Shop ID:", shopId);

  const uploadSteps = [
    { icon: "/upload.png", label: "Upload File", path: "/upload-next" },
    { icon: "/customized.png", label: "Customised", path: "/customised" },
    // { icon: "/Review.png", label: "Review & Confirm", path: "/review" },
    // { icon: "/Payment.png", label: "Payment", path: "/ReviewNext" },
    { icon: "/Placeorder.png", label: "Place Order", path: "/Payment" },
  ];

  const currentStep = 1;
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [filePageCounts, setFilePageCounts] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [paperSize, setPaperSize] = useState("");
  const [paperType, setPaperType] = useState("");
  const [printColor, setPrintColor] = useState("");
  const [printSide, setPrintSide] = useState("");
  const [packagingOption, setPackagingOption] = useState("");
  const [sheetsCount, setSheetsCount] = useState(1);
  const [selectedLayout, setSelectedLayout] = useState("");
  const [layoutOption, setLayoutOption] = useState("1");
  const [readingDirection, setReadingDirection] = useState("left-to-right");
  const [pdfOptions, setPdfOptions] = useState({});
  const [firstPageColored, setFirstPageColored] = useState(false);
  const [firstPageHard, setFirstPageHard] = useState(false);
  const [processedFiles, setProcessedFiles] = useState([]);
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  const [customRanges, setCustomRanges] = useState([{ from: "", to: "" }]);
  const [selectedThickOption, setSelectedThickOption] = useState(null);
  const [thickSubOption, setThickSubOption] = useState("");
  const [showThickDropdown, setShowThickDropdown] = useState(false);

  const dropdownRef = useRef();
  const paperSizeOptions = ["100*70", "A0", "A1", "A2", "A3", "A4"].reverse();
  const paperTypeOptions = {
    A0: ["Normal"],
    A1: ["Normal"],
    A2: ["Normal"],
    A3: ["Normal", "Glossy", "Sticker", "Thick"],
    A4: ["Normal", "Glossy", "Sticker", "Thick"],
    A5: ["Normal", "Glossy", "Matte", "Recycled"],
  };
  const printColorOptions = ["Color", "Black & White", "Customize"];
  const printSideOptions = ["Single", "Double"];
  const packagingOptions = {
    A0: ["Without packaging"],
    A1: ["Without packaging"],
    A2: ["Without packaging"],
    A3: ["Without packaging", "Corner staple"],
    A4: [
      "Without packaging",
      "transparent bag",
      "wire",
      "Spiral plastic",
      "Side stapling",
      "Corner staple",
      "2 hole file",
      "3 hole file",
      "4 hole file",
    ],
  };
  const readingDirectionOptions = [
    { label: "Left to Right (English)", value: "left-to-right" },
    { label: "Right to Left (Urdu/Arabic)", value: "right-to-left" },
  ];
  const thickOptions = ["GSM", "Letter Head", "Bond Paper"];

  // Validation functions
  const validateOptions = (fileIndex) => {
    const options = pdfOptions[fileIndex];
    if (!options) return false;

    return (
      options.paperSize &&
      options.paperType &&
      options.printColor &&
      (options.printColor !== "Customize" ||
        (options.customRanges &&
          options.customRanges.some((r) => r.from && r.to))) &&
      options.printSide &&
      options.packagingOption &&
      options.sheetsCount > 0
    );
  };

  const areAllFilesConfigured = () => {
    return uploadedFiles.every((_, index) => validateOptions(index));
  };

  // Save current options for active file
  const saveOptionsForActiveFile = () => {
    if (uploadedFiles[activeFileIndex]) {
      const fileName = uploadedFiles[activeFileIndex].name;
      const _id = uploadedFiles[activeFileIndex].id;
      const currentOptions = {
        _id,
        fileName,
        paperSize,
        paperType,
        printColor,
        printSide,
        packagingOption,
        sheetsCount,
        layoutOption,
        readingDirection,
        firstPageColored,
        firstPageHard,
        bwPages: pdfOptions[activeFileIndex]?.bwPages || [],
        customRanges: printColor === "Customize" ? customRanges : [],
        pageCount: filePageCounts[activeFileIndex] || 0,
        
      };

      setPdfOptions((prev) => ({
        ...prev,
        [activeFileIndex]: currentOptions,
      }));
    }
  };

  // Handle file processing
  // useEffect(() => {
  //   const processFiles = async () => {
  //     const files = await Promise.all(
  //       uploadedFiles.map(async (file) => {
  //         if (file.url) {
  //           return await convertCloudinaryToFile(file);
  //         }
  //         return file;
  //       })
  //     );
  //     setProcessedFiles(files.filter(Boolean));
  //   };

  //   if (uploadedFiles?.length) {
  //     processFiles();
  //   }
  // }, [uploadedFiles]);

  // Load options when file changes
  const loadOptionsForFile = (fileIndex) => {
    const options = pdfOptions[fileIndex];
    if (options) {
      setPaperSize(options.paperSize || "");
      setPaperType(options.paperType || "");
      setPrintColor(options.printColor || "");
      setPrintSide(options.printSide || "");
      setPackagingOption(options.packagingOption || "");
      setSheetsCount(options.sheetsCount || 1);
      setLayoutOption(options.layoutOption || "1");
      setReadingDirection(options.readingDirection || "left-to-right");
      setFirstPageColored(options.firstPageColored ?? false);
      setFirstPageHard(options.firstPageHard ?? false);
      setCustomRanges(options.customRanges || []);
      setShowCustomizePanel(options.printColor === "Customize");
    } else {
      setPaperSize("");
      setPaperType("");
      setPrintColor("");
      setPrintSide("");
      setPackagingOption("");
      setSheetsCount(1);
      setLayoutOption("1");
      setReadingDirection("left-to-right");
      setFirstPageColored(false);
      setFirstPageHard(false);
      setCustomRanges([{ from: "", to: "" }]);
      setShowCustomizePanel(false);
    }
  };

  // Convert Cloudinary URL to File object
  const convertCloudinaryToFile = async (cloudinaryFile) => {
    try {
      const response = await fetch(cloudinaryFile.url);
      const blob = await response.blob();
      return new File([blob], cloudinaryFile.name, { type: blob.type });
    } catch (error) {
      console.error("Error converting Cloudinary URL to File:", error);
      return null;
    }
  };

  // Handle PDF load
  const handlePdfLoad = (numPages) => {
    setPageCount(numPages);
    setFilePageCounts((prevCounts) => ({
      ...prevCounts,
      [activeFileIndex]: numPages,
    }));
  };

  // Handle file switching
  const handleFileSwitch = (newIndex) => {
    saveOptionsForActiveFile();
    setActiveFileIndex(newIndex);
    loadOptionsForFile(newIndex);
    setPageCount(filePageCounts[newIndex] || 0);
  };

  // Option change handlers
  const handlePaperSizeChange = (size) => {
    setPaperSize(size);
    setPaperType("");
    setPackagingOption("");
  };

  const handlePaperTypeChange = (type) => {
    setPaperType(type);
    if (type === "Thick") {
      setShowThickDropdown((prev) => !prev);
    } else {
      setShowThickDropdown(false);
      setThickSubOption("");
    }
  };

  const handleThickSubOption = (option) => {
    setSelectedThickOption(option);
    setPaperType(option);
    setShowThickDropdown(false);
  };

  const handlePrintColorChange = (color) => {
    setPrintColor(color);
    setShowCustomizePanel(color === "Customize");
    if (color !== "Customize") {
      setCustomRanges([{ from: "", to: "" }]);
    }
  };

  const handleRangeChange = (index, key, value) => {
    const updated = [...customRanges];
    updated[index][key] = value;
    setCustomRanges(updated);
  };

  const handleAddRange = () => {
    setCustomRanges([...customRanges, { from: "", to: "" }]);
  };

  const handleRemoveRange = (index) => {
    const updated = customRanges.filter((_, i) => i !== index);
    setCustomRanges(updated);
  };

  const handlePrintSideChange = (side) => {
    setPrintSide(side);
  };

  const handlePackagingOptionChange = (option) => {
    setPackagingOption(option);
    setSheetsCount(1);
  };

  const handleLayoutOptionChange = (option) => {
    setLayoutOption(option);
  };

  const handleReadingDirectionChange = (direction) => {
    setReadingDirection(direction);
  };

  const handleSheetsCountChange = (count) => {
    setSheetsCount(count);
  };

  const handleBwPagesChange = (newBwPages) => {
    setPdfOptions((prev) => ({
      ...prev,
      [activeFileIndex]: {
        ...prev[activeFileIndex],
        bwPages: newBwPages,
        fileName: uploadedFiles[activeFileIndex]?.name,
      },
    }));
  };

  // Handle preview with validation
  const handlePreviewClickWithOptions = () => {
    // Check for incomplete files
    const incompleteFiles = [];
    uploadedFiles.forEach((file, index) => {
      if (!validateOptions(index)) {
        incompleteFiles.push({
          fileName: file.name,
          index,
        });
      }
    });

    if (incompleteFiles.length > 0) {
      // Switch to first incomplete file
      const firstIncomplete = incompleteFiles[0];
      handleFileSwitch(firstIncomplete.index);

      // Show alert
      alert(
        `Please complete the options for file: ${firstIncomplete.fileName}`
      );
      return;
    }

    // All files are configured - proceed
    navigate("/Payment", {
      state: {
        pdfOptions: pdfOptions,
        ...state,
        shopId: shopId  // <-- yeh add karo
      }
    });
    
  };

  // Save options when they change
  useEffect(() => {
    saveOptionsForActiveFile();
  }, [
    paperSize,
    paperType,
    printColor,
    printSide,
    packagingOption,
    sheetsCount,
    layoutOption,
    readingDirection,
    firstPageColored,
    firstPageHard,
    customRanges,
  ]);

  // Utility functions
  const getMaxSheets = () => {
    if (!packagingOption) return Infinity;

    const limits = {
      "transparent bag": paperSize === "A3" || paperSize === "A4" ? 500 : 100,
      "Without packaging": Infinity,
      Wire: 300,
      "Spiral plastic": 500,
      "Side stapling": 100,
      "Corner staple": 100,
      "2 hole file": 100,
      "3 hole file": 300,
      "4 hole file": 400,
    };

    return limits[packagingOption] || Infinity;
  };

  const getSummaryText = () => {
    const validRanges = customRanges
      .filter((r) => r.from && r.to)
      .map((r) => `${r.from}–${r.to}`);
    if (validRanges.length === 0) return null;
    return (
      <>
        <p className="text-sm text-gray-700 mt-4">
          <span className="font-semibold text-blue-700">
            Pages {validRanges.join(", ")}
          </span>{" "}
          will be printed in{" "}
          <span className="text-pink-600 font-semibold">Color</span>. <br />
          Remaining pages will be printed in{" "}
          <span className="font-semibold">Black</span>.
        </p>
      </>
    );
  };

  const activeFile = processedFiles[activeFileIndex];
  const shouldShowCovers = pageCount > 1;
  const isAllConfigured = areAllFilesConfigured();

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
              {i !== 1 && (
                <div
                  className={`absolute sm:left-72 sm:top-48 sm:h-1 sm:w-6 left-8 top-40 h-1 w-8/12 z-0 ${
                    i <= currentStep
                      ? "bg-gradient-to-r from-pink-500 to-yellow-400"
                      : ""
                  }`}
                />
              )}
              {i !== step.length - 1 && (
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
      </div>
      <div className="flex sm:flex-row flex-col bg-gray-50 w-full h-screen">
        <div className="flex-1 p-4">
          <div className="flex justify-center items-center h-full w-full bg-gray-300 sm:overflow-hidden shadow-md rounded-md">
            <PDFPreview
              printColor={printColor}
              uploadedFile={activeFile}
              paperSize={paperSize}
              paperType={paperType}
              printSide={printSide}
              packagingOption={packagingOption}
              selectedLayout={selectedLayout}
              layoutOption={layoutOption}
              readingDirection={readingDirection}
              showCovers={shouldShowCovers}
              onPdfLoad={handlePdfLoad}
              bwPages={pdfOptions[activeFileIndex]?.bwPages || []}
              onBwPagesChange={handleBwPagesChange}
            />
          </div>
        </div>

        <div className="w-full overflow-y-scroll sm:w-2/6 sm:overflow-y-auto bg-gray-100 shadow-inner">
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                Print Color
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {printColorOptions.map((color) => (
                  <div
                    key={color}
                    className={`p-[1px] rounded-md transition-colors ${
                      printColor === color
                        ? "bg-gradient-to-r from-pink-500 to-blue-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <button
                      className={`w-full h-full p-3 rounded-md text-sm transition-colors ${
                        printColor === color
                          ? "bg-white text-blue-700"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => handlePrintColorChange(color)}
                    >
                      {color}
                    </button>
                  </div>
                ))}
              </div>

              {showCustomizePanel && (
                <div className="rounded-xl bg-white/30 p-4 backdrop-blur-md shadow-md border border-gray-200 transition-all">
                  <h4 className="text-gray-800 font-semibold mb-3 text-base">
                    Select Page Ranges
                  </h4>
                  <div className="space-y-2">
                    {customRanges.map((range, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="From"
                          className="w-20 p-2 text-sm rounded-lg border bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={range.from}
                          onChange={(e) =>
                            handleRangeChange(index, "from", e.target.value)
                          }
                        />
                        <span className="text-sm text-gray-600">to</span>
                        <input
                          type="number"
                          placeholder="To"
                          className="w-20 p-2 text-sm rounded-lg border bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          value={range.to}
                          onChange={(e) =>
                            handleRangeChange(index, "to", e.target.value)
                          }
                        />
                        {customRanges.length > 1 && (
                          <button
                            onClick={() => handleRemoveRange(index)}
                            className="text-red-500 hover:text-red-700 text-xl"
                            title="Remove"
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleAddRange}
                    className="mt-4 text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    + Add More Range
                  </button>
                  {getSummaryText()}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-blue-600 border-b pb-2">
                Upload Your PDF Files
              </h2>

              {uploadedFiles?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium mb-3 text-gray-700">
                    Uploaded Files ({uploadedFiles.length})
                  </h3>

                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
                    {uploadedFiles.map((file, index) => {
                      const pageInfo = filePageCounts[index];
                      const hasOptions = pdfOptions[index];
                      return (
                        <div
                          key={`${file.name}-${index}`}
                          className={`flex items-center justify-between p-3 border-b last:border-b-0 ${
                            index === activeFileIndex ? "bg-blue-50" : ""
                          } hover:bg-gray-50 cursor-pointer transition-colors`}
                        >
                          <div
                            className="flex items-center flex-grow overflow-hidden"
                            onClick={() => handleFileSwitch(index)}
                          >
                            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-red-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                            </div>
                            <div className="truncate">
                              <p className="text-gray-800 font-medium truncate">
                                {file.name}
                              </p>
                              <div className="flex items-center text-xs text-gray-500 space-x-2">
                                <span>{file?.pages} pages</span>
                                {pageInfo && (
                                  <>
                                    <span className="text-gray-300">|</span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                      {pageInfo}{" "}
                                      {pageInfo === 1 ? "page" : "pages"}
                                    </span>
                                  </>
                                )}
                                {hasOptions && (
                                  <>
                                    <span className="text-gray-300">|</span>
                                    <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                      Configured
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {uploadedFiles.length > 1 && (
                    <div className="mt-3 flex justify-between text-sm">
                      <span className="text-gray-600">
                        Viewing file {activeFileIndex + 1} of{" "}
                        {uploadedFiles.length}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          className={`flex items-center text-blue-600 hover:text-blue-800 ${
                            activeFileIndex === 0
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={activeFileIndex === 0}
                          onClick={() => handleFileSwitch(activeFileIndex - 1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                          Previous
                        </button>
                        <button
                          className={`flex items-center text-blue-600 hover:text-blue-800 ${
                            activeFileIndex === uploadedFiles.length - 1
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={
                            activeFileIndex === uploadedFiles.length - 1
                          }
                          onClick={() => handleFileSwitch(activeFileIndex + 1)}
                        >
                          Next
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {pageCount > 0 && (
              <div className="bg-[#EFEFEF] rounded-lg shadow p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Current PDF Pages:
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {pageCount} {pageCount === 1 ? "page" : "pages"}
                    {pageCount === 1 && " (no covers needed)"}
                  </span>
                </div>
              </div>
            )}

            <div className=" rounded-lg shadow">
              <h2 className="text-lg font-semibold p-6 text-[#1B3043] bg-[#D9D9D9] border-b">
                Printing Options
              </h2>

              <div className="p-6 space-y-6 ">
                <div
                  className={
                    !printColor ? "opacity-50 pointer-events-none" : ""
                  }
                >
                  <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                    Paper Size
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {paperSizeOptions.map((size) => (
                      <div
                        key={size}
                        className={`p-[1px] rounded-md transition-colors ${
                          paperSize === size
                            ? "bg-gradient-to-r from-pink-500 to-blue-500"
                            : "bg-gray-300"
                        }`}
                      >
                        <button
                          className={`w-full h-full p-[2px] py-2 rounded-md text-sm transition-colors ${
                            paperSize === size
                              ? "bg-white text-blue-700"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => handlePaperSizeChange(size)}
                        >
                          {size}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="font-poppins">Customised Paper Size</h2>
                  <h6 className="text-sm mt-2 font-poppins opacity-80">
                    Enter Paper Size you want
                  </h6>

                  <input
                    type="text"
                    className="mt-3 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-200 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div
                  className={!paperSize ? "opacity-50 pointer-events-none" : ""}
                >
                  <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                    Paper Type
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {paperSize &&
                      paperTypeOptions[paperSize] &&
                      paperTypeOptions[paperSize].map((type) => (
                        <div
                          key={type}
                          className={`p-[1px] rounded-md transition-colors ${
                            paperType === type
                              ? "bg-gradient-to-r from-pink-500 to-blue-500"
                              : "bg-gray-300"
                          }`}
                        >
                          {type === "Thick" ? (
                            <div className="relative" ref={dropdownRef}>
                              <button
                                className={`w-full h-full p-3 rounded-md text-sm flex justify-between items-center transition-colors ${
                                  paperType === selectedThickOption
                                    ? "bg-white text-blue-700"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                                onClick={() =>
                                  setShowThickDropdown((prev) => !prev)
                                }
                                disabled={!paperSize}
                              >
                                <span>{selectedThickOption || "Thick"}</span>
                                <RiArrowDropDownLine
                                  size={24}
                                  className="ml-2"
                                />
                              </button>

                              {showThickDropdown && (
                                <div className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg">
                                  {thickOptions.map((option, index) => (
                                    <div
                                      key={option}
                                      className={`px-4 py-2 text-sm text-right text-gray-700 hover:bg-gray-100 cursor-pointer ${
                                        index !== thickOptions.length - 1
                                          ? "border-b border-gray-200"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleThickSubOption(option)
                                      }
                                    >
                                      {option}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <button
                              className={`w-full h-full p-3 rounded-md text-sm transition-colors ${
                                paperType === type
                                  ? "bg-white text-blue-700"
                                  : "bg-white text-gray-700 hover:bg-gray-100"
                              }`}
                              onClick={() => handlePaperTypeChange(type)}
                              disabled={!paperSize}
                            >
                              {type}
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                <div
                  className={!paperType ? "opacity-50 pointer-events-none" : ""}
                >
                  <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                    Print Side
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {printSideOptions.map((side) => (
                      <div
                        key={side}
                        className={`p-[1px] rounded-md transition-colors ${
                          printSide === side
                            ? "bg-gradient-to-r from-pink-500 to-blue-500"
                            : "bg-gray-300"
                        }`}
                      >
                        <button
                          className={`w-full h-full p-3 rounded-md text-sm transition-colors ${
                            printSide === side
                              ? "bg-white text-blue-700"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => handlePrintSideChange(side)}
                          disabled={!printColor}
                        >
                          {side}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className={!printSide ? "opacity-50 pointer-events-none" : ""}
                >
                  <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                    Packaging Option
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {paperSize &&
                      packagingOptions[paperSize] &&
                      packagingOptions[paperSize].map((option) => (
                        <div
                          key={option}
                          className={`p-[1px] rounded-md transition-colors ${
                            packagingOption === option
                              ? "bg-gradient-to-r from-pink-500 to-blue-500"
                              : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`w-full h-full rounded-md text-sm transition-colors ${
                              packagingOption === option
                                ? "bg-white text-blue-700"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => handlePackagingOptionChange(option)}
                          >
                            <div className="flex justify-center pt-3 pb-2">
                              <img
                                src={`/${option}.png`}
                                alt={option}
                                className="h-full w-full object-contain"
                              />
                            </div>
                            <button
                              className="w-full py-2 px-3 text-center"
                              onClick={() =>
                                handlePackagingOptionChange(option)
                              }
                              disabled={!printSide}
                            >
                              {option === "transparent bag"
                                ? "Thick Lamination"
                                : option}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div
                  className={
                    !packagingOption ? "opacity-50 pointer-events-none" : ""
                  }
                >
                  <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                    Layout Selection
                  </h3>
                  <div className="mt-4">
                    <h3 className="font-medium mb-3 text-gray-700">Vertical</h3>
                    <div className="flex flex-row gap-2">
                      <div
                        className={`p-[1px] p rounded-lg cursor-pointer transition ${
                          layoutOption === "1"
                            ? "bg-gradient-to-r from-pink-500 to-blue-500"
                            : ""
                        }`}
                        onClick={() => handleLayoutOptionChange("1")}
                      >
                        <div className="bg-white p-4 rounded-md">
                          <div className="w-20 h-32 border border-black mb-2 mx-auto"></div>
                        </div>
                      </div>

                      <div
                        className={`p-[1px] p rounded-lg cursor-pointer transition ${
                          layoutOption === "2"
                            ? "bg-gradient-to-r from-pink-500 to-blue-500"
                            : ""
                        }`}
                        onClick={() => handleLayoutOptionChange("2")}
                      >
                        <div className="bg-white p-4 rounded-md">
                          <div className="w-20 h-16 border border-black mb-2 mx-auto"></div>
                          <div className="w-20 h-16 border border-black mx-auto"></div>
                        </div>
                      </div>
                      <div
                        className={`p-[1px] p rounded-lg cursor-pointer transition ${
                          layoutOption === "4"
                            ? "bg-gradient-to-r from-pink-500 to-blue-500"
                            : ""
                        }`}
                        onClick={() => handleLayoutOptionChange("4")}
                      >
                        <div className="bg-white p-4 rounded-md grid grid-cols-2 gap-x-4">
                          <div className="w-9 h-16 border border-black mb-2 mx-auto"></div>
                          <div className="w-9 h-16 border border-black mx-auto"></div>
                          <div className="w-9 h-16 border border-black mx-auto"></div>
                          <div className="w-9 h-16 border border-black mx-auto"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                      Horizontal
                    </h3>
                    <div className="flex flex-wrap justify-evenly gap-4">
                      <div
                        className={`p-[1px] p rounded-lg cursor-pointer transition ${
                          layoutOption === "h-1"
                            ? "bg-gradient-to-r from-pink-500 to-blue-500"
                            : ""
                        }`}
                        onClick={() => handleLayoutOptionChange("h-1")}
                      >
                        <div className="bg-white p-4 rounded-md">
                          <div className="w-28 h-20 border border-black mb-2 mx-auto"></div>
                        </div>
                      </div>

                      <div
                        className={`p-[1px] rounded-lg cursor-pointer transition ${
                          layoutOption === "h-2"
                            ? "bg-gradient-to-r from-pink-500 to-blue-500"
                            : ""
                        }`}
                        onClick={() => handleLayoutOptionChange("h-2")}
                      >
                        <div className="bg-white p-4 gap-4 rounded-md grid grid-cols-2">
                          <div className="w-12 h-20 border border-black mb-2 mx-auto"></div>
                          <div className="w-12 h-20 border border-black mx-auto"></div>
                        </div>
                      </div>

                      <div
                        className={`p-[1px] p rounded-lg cursor-pointer transition ${
                          layoutOption === "h-4"
                            ? "bg-gradient-to-r from-pink-500 to-blue-500"
                            : ""
                        }`}
                        onClick={() => handleLayoutOptionChange("h-4")}
                      >
                        <div className="bg-white p-4 gap-4 rounded-md grid grid-cols-2">
                          <div className="w-16 h-9 border border-black mb-2 mx-auto"></div>
                          <div className="w-16 h-9 border border-black mx-auto"></div>
                          <div className="w-16 h-9 border border-black mx-auto"></div>
                          <div className="w-16 h-9 border border-black mx-auto"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={
                    !packagingOption ? "opacity-50 pointer-events-none" : ""
                  }
                >
                  <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                    Reading Direction
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {readingDirectionOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-[1px] rounded-md transition-colors ${
                          readingDirection === option.value
                            ? "bg-gradient-to-r from-pink-500 to-blue-500"
                            : "bg-gray-300"
                        }`}
                      >
                        <button
                          className={`w-full h-full p-3 rounded-md text-sm transition-colors ${
                            readingDirection === option.value
                              ? "bg-white text-blue-700"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() =>
                            handleReadingDirectionChange(option.value)
                          }
                          disabled={!packagingOption}
                        >
                          {option.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className={`flex flex-col items-start gap-4 ${
                    !packagingOption && "opacity-50 pointer-events-none"
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      id="FPC"
                      type="checkbox"
                      checked={firstPageColored}
                      onChange={(e) => {
                        setFirstPageColored(e.target.checked);
                      }}
                      className="w-4 h-4 text-blue bg-gray-100 border-gray-300 rounded-sm"
                    />
                    <label
                      htmlFor="FPC"
                      className="ms-2 text-gray-900 font-medium"
                    >
                      First Page Colored
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="FPH"
                      type="checkbox"
                      checked={firstPageHard}
                      onChange={(e) => {
                        setFirstPageHard(e.target.checked);
                      }}
                      className="w-4 h-4 text-blue bg-gray-100 border-gray-300 rounded-sm"
                    />
                    <label
                      htmlFor="FPH"
                      className="ms-2 text-gray-900 font-medium"
                    >
                      First Page Hard
                    </label>
                  </div>
                </div>
                <div
                  className={
                    !packagingOption ? "opacity-50 pointer-events-none" : ""
                  }
                >
                  <h3 className="font-medium mb-3 text-gray-700 flex items-center">
                    Number of Sheets
                  </h3>
                  {packagingOption && (
                    <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                      <p className="mb-3 text-sm text-gray-600">
                        Number of sheets (max:{" "}
                        {getMaxSheets() === Infinity
                          ? "unlimited"
                          : getMaxSheets()}
                        ):
                      </p>
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-50 hover:bg-gray-300 transition-colors"
                          onClick={() =>
                            handleSheetsCountChange(
                              Math.max(1, sheetsCount - 1)
                            )
                          }
                          disabled={sheetsCount <= 1}
                        >
                          <span className="text-gray-600 font-medium">-</span>
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={
                            getMaxSheets() === Infinity
                              ? undefined
                              : getMaxSheets()
                          }
                          value={sheetsCount}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            const max = getMaxSheets();
                            const newCount =
                              max === Infinity
                                ? value
                                : Math.min(max, Math.max(1, value));
                            handleSheetsCountChange(newCount);
                          }}
                          className="mx-3 p-2 border border-gray-300 rounded w-16 text-center"
                        />
                        <button
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center disabled:opacity-50 hover:bg-gray-300 transition-colors"
                          onClick={() => {
                            const max = getMaxSheets();
                            const newCount =
                              max === Infinity
                                ? sheetsCount + 1
                                : Math.min(max, sheetsCount + 1);
                            handleSheetsCountChange(newCount);
                          }}
                          disabled={
                            getMaxSheets() !== Infinity &&
                            sheetsCount >= getMaxSheets()
                          }
                        >
                          <span className="text-gray-600 font-medium">+</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={handlePreviewClickWithOptions}
                  disabled={!isAllConfigured}
                  className={`mt-4 w-64 h-16 text-2xl rounded-lg ${
                    isAllConfigured
                      ? "bg-gradient-to-r from-[#ED008D] to-[#FF002B] text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Preview & Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
