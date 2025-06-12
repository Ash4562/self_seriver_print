import { useState, useEffect, useRef } from "react";
import PageFlip from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

const PDFPreview = ({
  uploadedFile,
  paperSize,
  printColor,
  printSide,
  packagingOption,
  layoutOption,
  readingDirection: userSpecifiedReadingDirection,
  bwPages = [], // Add this prop
  onBwPagesChange, // Add this prop
}) => {
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [pageImages, setPageImages] = useState([]);
  const [originalPageImages, setOriginalPageImages] = useState([]); // Store original colored images
  // const [bwPageIndices, setBwPageIndices] = useState([]); // Track which pages are B&W
  const bookRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(246);
  const [pageHeight, setPageHeight] = useState(728);
  const [isHorizontalLayout, setIsHorizontalLayout] = useState(false);

  // Determine reading direction based on packaging option
  const getReadingDirectionFromPackaging = () => {
    // Define which packaging options should use RTL reading direction
    const rtlPackagingOptions = [
      "2 hole file",
      "3 hole file",
      "Side stapling",
      "4 hole file",
    ];
    if (rtlPackagingOptions.includes(packagingOption)) {
      return "right-to-left";
    }
    return "left-to-right";
  };

  // Use the user-specified direction if provided, otherwise derive from packaging
  const effectiveReadingDirection =
    userSpecifiedReadingDirection || getReadingDirectionFromPackaging();

  useEffect(() => {
    if (!pdfLoaded || !originalPageImages.length) return;

    const updateDisplayImages = async () => {
      const newPageImages = [];

      for (let i = 0; i < originalPageImages.length; i++) {
        const isBwPage = bwPages.includes(i);
        let shouldBeBw = false;

        if (printColor === "Black & White") {
          // Default is B&W, toggle removes from B&W
          shouldBeBw = !isBwPage;
        } else {
          // Default is Color, toggle adds to B&W
          shouldBeBw = isBwPage;
        }

        if (shouldBeBw) {
          const img = new Image();
          await new Promise((resolve) => {
            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);

              const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
              );
              const data = imageData.data;
              for (let j = 0; j < data.length; j += 4) {
                const avg =
                  0.299 * data[j] + 0.587 * data[j + 1] + 0.114 * data[j + 2];
                data[j] = data[j + 1] = data[j + 2] = avg;
              }
              ctx.putImageData(imageData, 0, 0);
              newPageImages.push(canvas.toDataURL("image/png"));
              resolve();
            };
            img.src = originalPageImages[i];
          });
        } else {
          newPageImages.push(originalPageImages[i]);
        }
      }

      setPageImages(newPageImages);
    };

    updateDisplayImages();
  }, [printColor, bwPages, pdfLoaded, originalPageImages]);

  useEffect(() => {
    // Check if layout is horizontal
    const isHorizontal = layoutOption && layoutOption.startsWith("h-");
    setIsHorizontalLayout(isHorizontal);

    // Set page dimensions based on paper size and orientation
    const sizeMap = {
      A0: isHorizontal ? [800, 600] : [600, 800],
      A1: isHorizontal ? [700, 500] : [500, 700],
      A2: isHorizontal ? [650, 450] : [450, 650],
      A3: isHorizontal ? [600, 400] : [400, 600],
    };

    const [width, height] =
      sizeMap[paperSize] || (isHorizontal ? [600, 400] : [400, 600]);
    setPageWidth(width);
    setPageHeight(height);
  }, [paperSize, layoutOption]);
  const togglePageBW = (currentPage) => {
    if (!pdfLoaded || !originalPageImages.length || currentPage === undefined)
      return;

    const isCurrentlyBW = bwPages.includes(currentPage);
    let newBwPages;

    if (printColor === "Black & White") {
      // Toggling adds to bwPages to switch back to color
      newBwPages = isCurrentlyBW
        ? bwPages.filter((idx) => idx !== currentPage)
        : [...bwPages, currentPage];
    } else {
      // Toggling adds to bwPages to switch to B&W
      newBwPages = isCurrentlyBW
        ? bwPages.filter((idx) => idx !== currentPage)
        : [...bwPages, currentPage];
    }

    onBwPagesChange(newBwPages);
  };

  // Get current page index from book reference
  const getCurrentPageIndex = () => {
    if (!bookRef.current || typeof bookRef.current.pageFlip !== "function")
      return 0;

    const pageFlipInstance = bookRef.current.pageFlip();
    if (!pageFlipInstance) return 0;

    return pageFlipInstance.getCurrentPageIndex();
  };
  // Fix button text rendering
  const getButtonText = (pageIndex) => {
    return bwPages.includes(pageIndex) ? "Color" : "B&W";
  };

  function mergeCanvasesVertically(canvases) {
    const width = Math.max(...canvases.map((c) => c.width));
    const height = canvases.reduce((sum, c) => sum + c.height, 0);

    const merged = document.createElement("canvas");
    merged.width = width;
    merged.height = height;
    const ctx = merged.getContext("2d");

    let y = 0;
    for (const c of canvases) {
      ctx.drawImage(c, 0, y);
      y += c.height;
    }
    return merged;
  }
  function mergeCanvasesHorizontally(canvases) {
    // Find the total width (sum of all canvas widths)
    const width = canvases.reduce((sum, c) => sum + c.width, 0);
    // Find the maximum height among all canvases
    const height = Math.max(...canvases.map((c) => c.height));

    // Create a new canvas with the calculated dimensions
    const merged = document.createElement("canvas");
    merged.width = width;
    merged.height = height;
    const ctx = merged.getContext("2d");

    // Draw each canvas horizontally
    let x = 0;
    for (const c of canvases) {
      ctx.drawImage(c, x, 0);
      x += c.width; // Move x position for next canvas
    }
    return merged;
  }

  function mergeFourPages(canvases) {
    const width = Math.max(...canvases.map((c) => c.width));
    const height = Math.max(...canvases.map((c) => c.height));

    const merged = document.createElement("canvas");
    merged.width = width * 2;
    merged.height = height * 2;
    const ctx = merged.getContext("2d");

    for (let i = 0; i < canvases.length && i < 4; i++) {
      const x = (i % 2) * width;
      const y = Math.floor(i / 2) * height;
      ctx.drawImage(canvases[i], x, y, width, height);
    }
    return merged;
  }

  const renderPackagingVisualization = (
    currentPageIndex,
    totalPages,
    bindingProps
  ) => {
    const isLastPage =
      effectiveReadingDirection === "right-to-left"
        ? currentPageIndex === 0
        : currentPageIndex === totalPages - 1;

    if (isLastPage) {
      const sideClass =
        effectiveReadingDirection === "right-to-left"
          ? "left-0 -translate-x-1/2"
          : "right-0 translate-x-1/2";

      return (
        <div
          className={`absolute h-full ${
            packagingOption === "Side stapling" && "top-16"
          } t w-8 ${bindingProps.isLastPage ? "right-0" : sideClass}`}
        >
          {packagingOption === "wire" &&
            [...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-6 h-1 border-2 border-gray-800"
                style={{
                  top: `${i * 2}%`,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            ))}

          {packagingOption === "Spiral plastic" &&
            [...Array(35)].map((_, i) => (
              <div
                key={i}
                className="absolute w-6 h-6 border-2 border-gray-800 rounded-full"
                style={{
                  top: `${i * 2.8}%`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  clipPath: "polygon(0 0, 100% 0, 100% 150%, 0 50%)",
                }}
              />
            ))}

          {packagingOption === "Side stapling" &&
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-6 bg-gray-800 rounded-full"
                style={{
                  top: `${i * 150}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              />
            ))}

          {packagingOption === "Corner staple" && (
            <div
              className={`absolute top-1 ${
                effectiveReadingDirection === "right-to-left"
                  ? "left-2"
                  : "right-2"
              } w-6 h-6
          before:content-[''] before:absolute before:top-1/2 before:left-1/2
          before:w-6 before:h-1 before:rounded-2xl before:bg-gray-800
          before:-translate-x-1/2 before:-translate-y-1/2
          before:rotate-45`}
            />
          )}

          {(packagingOption === "2 hole file" ||
            packagingOption === "3 hole file" ||
            packagingOption === "4 hole file") && (
            <img
              src={`/${
                packagingOption === "2 hole file"
                  ? "2hf"
                  : packagingOption === "3 hole file"
                  ? "3hf"
                  : "4hf"
              }_middle.png`}
              alt={packagingOption}
              className={`absolute top-24  translate-x-1/2 ${
                effectiveReadingDirection === "right-to-left"
                  ? "right-4"
                  : "left-0"
              } ${
                packagingOption === "4 hole file"
                  ? isHorizontalLayout
                    ? "absolute h-[200px]  top-4 object-cover"
                    : "absolute h-[300px]  py-6 mt-12 object-cover"
                  : ""
              }`}
            />
          )}
        </div>
      );
    }

    // Original binding styles for all other pages
    const packagingStyles = {
      "transparent bag": (
        <div className="absolute inset-0 pointer-events-none">
          {/* Border layer */}
          <div className="absolute inset-0 border-4 border-gray-300 opacity-40 rounded-xl"></div>

          {/* Glassmorphism base layer */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl border border-white/30"></div>

          {/* Plastic reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-20 rounded-xl"></div>

          {/* Shine effect using gradient and animation */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.7)_50%,transparent_60%)] bg-[length:200%_200%] animate-shine opacity-10 rounded-xl"></div>
        </div>

        // <div className="absolute inset-0 pointer-events-none">
        //   {/* Enhanced transparent bag effect */}
        //   <div className="absolute inset-0 border-4 border-gray-300 opacity-40"></div>
        //   <div className="absolute inset-0 bg-white opacity-0 "></div>
        //   {/* Plastic reflection effect */}
        //   <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-20"></div>
        //   {/* Shine effect */}
        //   <div
        //     className="absolute w-full h-full opacity-10"
        //     style={{
        //       background:
        //         "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)",
        //       backgroundSize: "200% 200%",
        //       animation: "shine 3s infinite",
        //     }}
        //   ></div>
        // </div>
      ),
      wire: (
        <div
          className={`absolute ${
            userSpecifiedReadingDirection === "right-to-left"
              ? "-right-8"
              : "left-0"
          } top-0 h-full w-8 -translate-x-1/2`}
        >
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-1 border-2 border-gray-800"
              style={{
                top: `${i * 2}%`,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>
      ),
      "Spiral plastic": (
        <div
          className={`absolute ${
            userSpecifiedReadingDirection === "right-to-left"
              ? "-right-4"
              : "-left-3"
          } top-0 h-full w-8 -translate-x-1/2`}
        >
          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 border-2 border-gray-800 rounded-full"
              style={{
                top: `${i * 2.8}%`,
                left: "50%",
                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
              }}
            />
          ))}
        </div>
      ),
      "Corner staple": (
        <div
          className={`absolute top-1 ${
            isLastPage
              ? userSpecifiedReadingDirection === "right-to-left"
                ? "left-4 rotate-90"
                : "right-0"
              : userSpecifiedReadingDirection === "right-to-left"
              ? "right-4 rotate-90"
              : "left-4"
          } w-6 h-6
                    before:content-[''] before:absolute before:top-1/2 before:left-1/2
                    before:w-6 before:h-1 before:rounded-2xl before:bg-gray-800
                    before:-translate-x-1/2 before:-translate-y-1/2
                    before:-rotate-45`}
        />
      ),
      "Side stapling": (
        <div
          className={`absolute ${
            userSpecifiedReadingDirection === "right-to-left"
              ? "-right-7"
              : "left - 0"
          } ${
            isHorizontalLayout ? "top-0 w-8" : "top-24 w-10"
          } -translate-y-1/2 -translate-x-1/2`}
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-6 bg-gray-800 rounded-full`}
              style={{
                // top: `${isHorizontalLayout ? ${i * 75}px} :  ${i * 150}px}`,
                top: `${isHorizontalLayout ? i * 100 : i * 150}px`,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          ))}
        </div>
      ),
      "2 hole file": (
        <img
          src="/2hf_middle.png"
          alt="Kharmin file"
          className={`absolute h-40 sm:h-auto
             object-contain ${
               isLastPage
                 ? userSpecifiedReadingDirection === "right-to-left"
                   ? "left-0"
                   : "right-0"
                 : userSpecifiedReadingDirection === "right-to-left"
                 ? "right-0"
                 : "-left-10"
             }  ${
            isHorizontalLayout ? "top-0 w-8" : " top-12 sm:top-24 w-10"
          } translate-x-1/2`}
        />
      ),
      "3 hole file": (
        <img
          src="/3hf_middle.png"
          alt="Kharmin file"
          className={`absolute h-40 sm:h-auto
             ${
               userSpecifiedReadingDirection == "right-to-left"
                 ? "right-0"
                 : "-left-10"
             } ${
            isHorizontalLayout ? "top-0 w-8" : "top-12 sm:top-24  w-10"
          }  translate-x-1/2`}
        />
      ),
      "4 hole file": (
        <img
          src="/4hf_middle.png"
          alt="4 hole file"
          className={`absolute  h-[300px] py-6 mt-32  ${
            userSpecifiedReadingDirection === "right-to-left"
              ? "left-[280px] "
              : "left-[-80px] "
          } ${
            isHorizontalLayout ? "-top-8 mt-0 h-[200px]  object-cover" : ""
          } `}
        />
      ),
    };

    return packagingStyles[packagingOption] || null;
  };

  useEffect(() => {
    const loadPdf = async () => {
      if (!uploadedFile) return;
      setPdfLoaded(false);
      setPageImages([]);
      setOriginalPageImages([]); // Reset original images
      // setBwPageIndices([]); // Reset B&W page indices

      if (!(uploadedFile instanceof Blob)) {
        console.error("Invalid file format:", uploadedFile);
        return;
      }
      const fileURL = URL.createObjectURL(uploadedFile);

      const buffer = [];
      const finalImages = [];
      // const fileURL = URL.createObjectURL(uploadedFile);

      try {
        const loadingTask = pdfjsLib.getDocument(fileURL);
        const pdf = await loadingTask.promise;

        // Store first page for transparent bag option
        let firstPageCanvas = null;
        if (packagingOption === "transparent bag") {
          // Get the first PDF page for the transparent bag cover
          const firstPage = await pdf.getPage(1);
          const viewport = firstPage.getViewport({ scale: 2 });

          firstPageCanvas = document.createElement("canvas");
          const firstPageCtx = firstPageCanvas.getContext("2d");

          // Set dimensions
          firstPageCanvas.width = viewport.width;
          firstPageCanvas.height = viewport.height;

          // Render the first page
          await firstPage.render({ canvasContext: firstPageCtx, viewport })
            .promise;
        }

        // Add front cover page only if NOT "Without packaging"
        if (packagingOption !== "Without packaging") {
          const coverCanvas = document.createElement("canvas");
          coverCanvas.width = pageWidth;
          coverCanvas.height = pageHeight;
          const coverCtx = coverCanvas.getContext("2d");

          if (packagingOption === "transparent bag" && firstPageCanvas) {
            // For transparent bag, create a blurred version of the first page as cover
            // Scale the first page to fit the cover dimensions
            const ratio = Math.min(
              pageWidth / firstPageCanvas.width,
              pageHeight / firstPageCanvas.height
            );

            const scaledWidth = firstPageCanvas.width * ratio;
            const scaledHeight = firstPageCanvas.height * ratio;

            // Position to center
            const offsetX = (pageWidth - scaledWidth) / 2;
            const offsetY = (pageHeight - scaledHeight) / 2;

            // Draw the first page (scaled)
            coverCtx.drawImage(
              firstPageCanvas,
              offsetX,
              offsetY,
              scaledWidth,
              scaledHeight
            );

            // Apply blur effect
            coverCtx.filter = "blur(3px)";
            coverCtx.drawImage(coverCanvas, 0, 0);
            coverCtx.filter = "none";

            // Add a semi-transparent overlay
            coverCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
            coverCtx.fillRect(0, 0, pageWidth, pageHeight);

            // Add plastic-like reflection
            coverCtx.fillStyle = "rgba(255, 255, 255, 0.2)";
            coverCtx.beginPath();
            coverCtx.moveTo(0, 0);
            coverCtx.lineTo(pageWidth * 0.7, 0);
            coverCtx.lineTo(pageWidth * 0.3, pageHeight);
            coverCtx.lineTo(0, pageHeight);
            coverCtx.closePath();
            coverCtx.fill();

            // Add border
            coverCtx.strokeStyle = "rgba(0, 0, 0, 0.2)";
            coverCtx.lineWidth = 2;
            coverCtx.strokeRect(0, 0, pageWidth, pageHeight);
          } else {
            // Default cover for other packaging options
            coverCtx.fillStyle = "#f9f9f9ac";
            coverCtx.fillRect(0, 0, pageWidth, pageHeight);
            coverCtx.strokeStyle = "#000000";
            coverCtx.lineWidth = 2;
            coverCtx.strokeRect(0, 0, pageWidth, pageHeight);
            coverCtx.fillStyle = "#000";
            coverCtx.font = "28px Arial";
            coverCtx.textAlign = "center";
            coverCtx.fillText("📘 Cover Page", pageWidth / 2, pageHeight / 3);
            coverCtx.font = "18px Arial";
            coverCtx.fillText(
              "Your Print Preview Starts Here",
              pageWidth / 2,
              pageHeight / 3 + 40
            );
          }

          finalImages.push(coverCanvas);
        }

        // Render PDF pages with layout and print side logic
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });

          const padding = 120; // Padding in pixels (same for all sides)

          // Create canvas with extra space for padding on all sides
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          // Add equal padding to both width and height
          canvas.width = viewport.width + padding * 2;
          canvas.height = viewport.height + padding * 2;

          // Clear the entire canvas to white (including padding area)
          context.fillStyle = "white";
          context.fillRect(0, 0, canvas.width, canvas.height);

          // Shift the drawing origin by padding amount
          context.translate(padding, padding);

          // Render the PDF page at the offset position
          await page.render({ canvasContext: context, viewport }).promise;

          // Convert to Black & White if needed for default view
          if (printColor === "Black & White") {
            // Process the ENTIRE canvas area
            const imageData = context.getImageData(
              0,
              0, // Start from top-left corner
              canvas.width, // Full width
              canvas.height // Full height
            );

            const data = imageData.data;
            for (let j = 0; j < data.length; j += 4) {
              const avg =
                0.299 * data[j] + 0.587 * data[j + 1] + 0.114 * data[j + 2];
              data[j] = data[j + 1] = data[j + 2] = avg;
            }
            context.putImageData(imageData, 0, 0);
          }
          // Handle layouts
          if (layoutOption === "1" || layoutOption === "h-1") {
            // Single page layout (same for both vertical and horizontal)
            finalImages.push(canvas);
          } else if (layoutOption === "2") {
            // Vertical 2-page layout
            buffer.push(canvas);
            if (buffer.length === 2 || i === pdf.numPages) {
              finalImages.push(mergeCanvasesVertically(buffer));
              buffer.length = 0;
            }
          } else if (layoutOption === "h-2") {
            // Horizontal 2-page layout
            buffer.push(canvas);
            if (buffer.length === 2 || i === pdf.numPages) {
              finalImages.push(mergeCanvasesHorizontally(buffer));
              buffer.length = 0;
            }
          } else if (layoutOption === "4") {
            // Vertical 4-page layout (2x2 grid)
            buffer.push(canvas);
            if (buffer.length === 4 || i === pdf.numPages) {
              finalImages.push(mergeFourPages(buffer));
              buffer.length = 0;
            }
          } else if (layoutOption === "h-4") {
            // Horizontal 4-page layout (2x2 grid)
            buffer.push(canvas);
            if (buffer.length === 4 || i === pdf.numPages) {
              finalImages.push(mergeFourPages(buffer));
              buffer.length = 0;
            }
          }
        }

        // Add back cover page only if NOT "Without packaging"
        if (packagingOption !== "Without packaging") {
          const backCoverCanvas = document.createElement("canvas");
          backCoverCanvas.width = pageWidth;
          backCoverCanvas.height = pageHeight;
          const backCtx = backCoverCanvas.getContext("2d");

          if (packagingOption === "transparent bag") {
            // Create a solid black back page
            backCtx.fillStyle = "#000000";
            backCtx.fillRect(0, 0, pageWidth, pageHeight);

            // Add plastic-like reflection for the transparent bag
            backCtx.fillStyle = "rgba(60, 60, 60, 0.3)";
            backCtx.beginPath();
            backCtx.moveTo(0, 0);
            backCtx.lineTo(pageWidth * 0.7, 0);
            backCtx.lineTo(pageWidth * 0.3, pageHeight);
            backCtx.lineTo(0, pageHeight);
            backCtx.closePath();
            backCtx.fill();

            // Add subtle border
            backCtx.strokeStyle = "rgba(100, 100, 100, 0.4)";
            backCtx.lineWidth = 2;
            backCtx.strokeRect(0, 0, pageWidth, pageHeight);
          } else {
            // Default black back cover for other packaging options
            backCtx.fillStyle = "#000000";
            backCtx.fillRect(0, 0, pageWidth, pageHeight);
            backCtx.strokeStyle = "#000000";
            backCtx.lineWidth = 2;
            backCtx.strokeRect(0, 0, pageWidth, pageHeight);
          }

          finalImages.push(backCoverCanvas);
        }

        // Create display images with print side logic
        const displayImages = [];
        const originalImages = [];

        for (let i = 0; i < finalImages.length; i++) {
          const imgDataUrl = finalImages[i].toDataURL("image/png");
          displayImages.push(imgDataUrl);
          originalImages.push(imgDataUrl); // Store originals for color toggle

          // Add blank pages if single-sided
          if (printSide === "Single") {
            displayImages.push(null);
            originalImages.push(null); // Maintain alignment with display images
          }
        }

        // Ensure even number of pages
        if (displayImages.length % 2 !== 0) {
          displayImages.push(null);
          originalImages.push(null);
        }

        // For RTL reading direction, reverse the page order (except cover and back)
        if (effectiveReadingDirection === "right-to-left") {
          if (packagingOption !== "Without packaging") {
            // With packaging - preserve front and back covers
            const backCover = displayImages[0];
            const backCoverOriginal = originalImages[0];
            const innerPages = displayImages.slice(1, -1);
            const innerPagesOriginal = originalImages.slice(1, -1);
            const coverPage = displayImages[displayImages.length - 1];
            const coverPageOriginal = originalImages[originalImages.length - 1];

            // Reverse only the inner pages
            const reversedInnerPages = innerPages.reverse();
            const reversedInnerPagesOriginal = innerPagesOriginal.reverse();

            // Reconstruct with cover page, reversed inner pages, and back cover
            setPageImages([coverPage, ...reversedInnerPages, backCover]);
            setOriginalPageImages([
              coverPageOriginal,
              ...reversedInnerPagesOriginal,
              backCoverOriginal,
            ]);
          } else {
            // Without packaging - just reverse all pages
            setPageImages([...displayImages].reverse());
            setOriginalPageImages([...originalImages].reverse());
          }
        } else {
          setPageImages(displayImages);
          setOriginalPageImages(originalImages);
        }

        setPdfLoaded(true);
      } catch (err) {
        console.error("Error loading PDF:", err);
      }
    };

    loadPdf();
  }, [
    uploadedFile,
    printColor,
    printSide,
    layoutOption,
    effectiveReadingDirection,
    pageWidth,
    pageHeight,
    packagingOption,
  ]);

  if (!uploadedFile) {
    return (
      <div className="w-full sm:h-[85vh]  flex flex-col items-center justify-center bg-gray-50 p-8 rounded-lg border border-gray-300">
        <p className="text-gray-500 text-lg font-medium mb-2">
          No PDF Selected
        </p>
        <p className="text-gray-400 text-center">
          Upload a PDF file to see the preview here
        </p>
      </div>
    );
  }

  if (!pdfLoaded) {
    return (
      <div className="w-full sm:h-[85vh] flex items-center justify-center bg-gray-50 p-8 rounded-lg border border-gray-300">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading PDF preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-[50vw]">
      <div className="relative flex-grow flex flex-col items-center justify-center bg-gray-300 p-4 rounded-lg border border-gray-300">
        <PageFlip
          startPage={
            effectiveReadingDirection === "right-to-left"
              ? pageImages.length - 1
              : 0
          }
          usePortrait={true}
          width={pageWidth}
          height={pageHeight}
          // width={200}
          // height={150}
          size="stretch"
          maxWidth={pageWidth}
          maxHeight={pageHeight}
          showCover={true}
          // autoSize={false}
          autoSize
          ref={bookRef}
          className="mx-auto"
          direction={
            effectiveReadingDirection === "right-to-left" ? "rtl" : "ltr"
          }
          onFlip={() => {
            // Force re-render to update button text
            // setBwPageIndices([...bwPageIndices]);
          }}
        >
          {pageImages.map((src, index) => {
            const isTransparentBag = packagingOption === "transparent bag";
            const isFirstPage = index === 0;
            const isLastPage = index === pageImages.length - 1;

            // Adjust even/odd page calculation based on reading direction
            const isEvenPage =
              effectiveReadingDirection === "right-to-left"
                ? index % 2 !== 0 // RTL: odd index is even page
                : index % 2 === 0; // LTR: even index is even page

            // Determine binding position
            let bindingProps = null;

            // Adjust binding side based on reading direction
            if (isTransparentBag) {
              bindingProps = { position: "both" };
            } else if (isFirstPage) {
              bindingProps = {
                position:
                  effectiveReadingDirection === "right-to-left"
                    ? "right"
                    : "left",
              };
            } else if (isLastPage) {
              bindingProps = { isLastPage: true }; // Special flag for back cover
            } else if (index > 0 && isEvenPage) {
              bindingProps = { position: "middle" };
            }

            return (
              <div
                key={index}
                className="page bg-white flex items-center justify-center relative"
              >
                {bindingProps &&
                  packagingOption !== "Without packaging" &&
                  renderPackagingVisualization(
                    index,
                    pageImages.length,
                    bindingProps
                  )}

                {/* Only add keyframes style for shine effect when using transparent bag */}
                {packagingOption === "transparent bag" && index === 0 && (
                  <style>
                    {`
                    @keyframes shine {
                      0% { background-position: -100% -100%; }
                      50% { background-position: 100% 100%; }
                      100% { background-position: -100% -100%; }
                    }
                    `}
                  </style>
                )}

                {src ? (
                  <img
                    src={src}
                    alt={`Page ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-white text-center text-gray-400 flex items-center justify-center"></div>
                )}
              </div>
            );
          })}
        </PageFlip>

        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => bookRef.current.pageFlip().turnToPage(0)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            {userSpecifiedReadingDirection === "right-to-left"
              ? "Last"
              : "Start"}
          </button>
          <button
            onClick={() => bookRef.current.pageFlip().flipPrev()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            {effectiveReadingDirection === "right-to-left" ? "Next" : "Prev"}
          </button>
          <button
            onClick={() => bookRef.current.pageFlip().flipNext()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            {effectiveReadingDirection === "right-to-left" ? "Prev" : "Next"}
          </button>
          <button
            onClick={() => {
              const lastPage = bookRef.current.pageFlip().getPageCount() - 1;
              bookRef.current.pageFlip().turnToPage(lastPage);
            }}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
          >
            {userSpecifiedReadingDirection === "right-to-left"
              ? "Start"
              : "End"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
