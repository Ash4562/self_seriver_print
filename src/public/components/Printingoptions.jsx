import React from "react";

const packagingImages = [
  "/image(4).png",
  "/image(5).png",
  "/image(6).png",
  "/image(7).png",
  "/image(7).png",
  "/image(8).png",
  "/image(9).png",
];
const packagingTexts = [
  "Folding Options",
  "Hole Punching",
  "Stapling",
  "Binding",
  "Lamination",
  "Transparent Bag",
  "Die-Cutting",
];

const Printingoptions = () => {
  return (
    <div className="w-full min-h-screen bg-white px-4 md:px-8 py-12 space-y-10 overflow-x-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-4 px-2">
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#ED008D] to-[#00AFEF] text-transparent bg-clip-text font-jura ">
          Printing Options
          <span className="text-black opacity-80">
            {" "}
            – Tailored to Your Needs
          </span>
        </h2>
        <h2 className="text-lg md:text-xl font-jura font-semibold">
          Select, preview, and print—effortless and professional.
        </h2>
        <p className="text-sm md:text-base text-[#999999] leading-relaxed font-poppins">
          Customize your prints exactly how you want them. Choose from a variety
          of paper sizes, types, and finishes to match your project. Whether
          it's vivid full-color brochures, crisp black-and-white reports, or
          high-quality custom merchandise, we provide flexible printing
          solutions for every requirement.
        </p>
      </div>

      {/* Options Panel */}
      <form className="bg-[#FCFAF8] max-w-6xl mx-auto p-6 md:p-10 rounded-xl shadow space-y-8">
        {/* Paper Size */}
        <div>
          <div className="text-right font-semibold mb-2 text-sm md:text-base font-poppins">
            Paper Size
          </div>
          <div className="flex flex-wrap justify-end gap-3 font-poppins">
            {["A0", "A1", "A2", "A3", "A4", "A5"].map((size) => (
              <label key={size} className="cursor-pointer">
                <input type="radio" name="size" className="peer hidden" />
                <div className="w-24 md:w-32 h-12 md:h-10 flex items-center justify-center rounded-md border border-red-200 peer-checked:border-yellow-400 text-[#FF002B] bg-white hover:bg-red-50 transition">
                  {size}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Paper Type */}
        <div>
          <div className="text-right font-semibold mb-2 text-sm md:text-base font-poppins">
            Paper Type
          </div>
          <div className="flex flex-wrap justify-end gap-3 font-poppins">
            {["Normal", "Sticker", "Thick", "Glossy"].map((type) => (
              <label key={type} className="cursor-pointer">
                <input type="radio" name="type" className="peer hidden" />
                <div className="px-4 py-2 rounded-md border border-red-200 peer-checked:border-yellow-400 text-[#FF002B] bg-white hover:bg-red-50 transition">
                  {type}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Color Options */}
        <div>
          <div className="text-right font-semibold mb-2 text-sm md:text-base font-poppins">
            Color Options
          </div>
          <div className="flex justify-end gap-3 font-poppins">
            {["Black & White", "Colored"].map((option) => (
              <label key={option} className="cursor-pointer">
                <input type="radio" name="color" className="peer hidden" />
                <div className="px-4 py-2 rounded-md border border-red-200 peer-checked:border-yellow-400 text-[#FF002B] bg-white hover:bg-red-50 transition">
                  {option}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Print Sides */}
        <div>
          <div className="text-right font-semibold mb-2 text-sm md:text-base font-poppins">
            Print Sides
          </div>
          <div className="flex justify-end gap-3 font-poppins">
            {["Double Sided", "Single Sided"].map((side) => (
              <label key={side} className="cursor-pointer">
                <input type="radio" name="side" className="peer hidden" />
                <div className="px-4 py-2 rounded-md border border-red-200 peer-checked:border-yellow-400 text-[#FF002B] bg-white hover:bg-red-50 transition">
                  {side}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <div className="text-right font-semibold mb-2 text-sm md:text-base font-poppins">
            Packaging Options
          </div>

          {/* Mobile View */}
          <div className="block sm:hidden grid grid-cols-2 gap-6 place-items-center">
            {packagingImages.map((img, index) => (
              <div
                key={index}
                className="w-36 h-40 bg-white rounded-lg shadow flex flex-col items-center justify-center p-2"
              >
                <img
                  src={img}
                  alt={`Packaging ${index + 1}`}
                  className="w-20 h-20 object-contain  hover:scale-125"
                />
                <p className="mt-2 text-sm text-center font-poppins text-gray-700">
                  {packagingTexts[index]}
                </p>
              </div>
            ))}
          </div>

          {/* Tablet & Desktop View */}
          {/* Top row: First 6 images */}
          <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
            {packagingImages.slice(0, 5).map((img, index) => (
              <div
                key={index}
                className="w-48 h-40 bg-white rounded-lg shadow flex flex-col items-center justify-center p-2"
              >
                <img
                  src={img}
                  alt={`Packaging ${index + 1}`}
                  className="w-32 h-20 object-contain hover:scale-125"
                />
                <p className="mt-2 text-sm text-center font-poppins text-gray-700">
                  {packagingTexts[index]}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom row: Last 2 images aligned right to left */}
          <div className="hidden sm:flex justify-end gap-6 mt-4">
            {[...packagingImages.slice(5)].reverse().map((img, i) => {
              const index = 5 + (1 - i);
              return (
                <div
                  key={index}
                  className="w-48 h-40 bg-white rounded-lg shadow flex flex-col items-center justify-center p-2"
                >
                  <img
                    src={img}
                    alt={`Packaging ${index + 1}`}
                    className="w-32 h-20 object-contain hover:scale-125"
                  />
                  <p className="mt-2 text-sm text-center font-poppins text-gray-700">
                    {packagingTexts[index]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Printingoptions;
