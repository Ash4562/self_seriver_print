import React from "react";
import { motion } from "framer-motion";

const PrintingService = () => {
  const cards = [
    { name: "Business Materials" },
    { name: "Reports & Manuals" },
    { name: "Marketing Collateral" },
    { name: "Color Printing" },
    { name: "Spiral Binding" },
    { name: "Wire Binding (Wire-O)" },
    { name: "2-Ring Binders" },
    { name: "3-Ring Binders" },
  ];
  return (
    <div>
      {/* <div className="flex flex-row h-screen bg-gradient-to-br from-25% from-[#ED008D] via-775% via-[#FFF200] to-[#00AFEF]"> */}
      <div className="flex flex-row sm:h-screen bg-gradient-to-r  from-[#ED008D] via-[#FFF200] to-[#00AFEF]">
        <div className="flex flex-col sm:flex-row justify-between sm:items-start w-full gap-4">
          {/* Left side: Text content */}
          <motion.div
            className="flex flex-col sm:px-40 sm:w-2/3 gap-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-4 px-4">
              <p className="font-medium text-white text-3xl sm:text-7xl sm:text-left flex">
                PRINTING
                <span className="text-[#D9D9D9] sm:block hidden">
                  ___________
                </span>
              </p>
              <p className="font-medium text-white text-3xl sm:text-7xl sm:text-right">
                SERVICE
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
              <img
                src="/Printing-Service-Papers.png"
                className="object-cover w-60 h-80 py-4"
                alt=""
              />
              <div className="flex flex-col gap-4 text-white px-4">
                <p className="font-medium text-2xl sm:text-3xl font-poppins">
                  Professional Printing for Every Need{" "}
                </p>
                <p>
                  We handle all your standard printing requirements with
                  precision and speed. Whether you need black & white or color,
                  single or bulk quantity, we’ve got you covered. Choose your
                  paper size, type, and finish – we ensure top-notch quality
                  with every print.{" "}
                </p>
              </div>{" "}
            </div>{" "}
          </motion.div>

          {/* Right side: Image */}
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: -100, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center sm:w-1/3 items-center ml-48 sm:ml-0"
          >
            <img
              src="/Printing-Service-Printer.svg"
              alt="Customised Printing"
              className="h-auto max-w-full mx-auto "
            />
            <button className="flex bg-white px-12 py-2 font-poppins my-4 sm:my-0">
              Upload Your File
            </button>
          </motion.div>
        </div>
      </div>

      <div className="py-8">
        <div className="flex flex-col gap-4">
          <p className="text-[#00AFEF] font-jura font-medium text-3xl text-center">
            Your <span className="text-[#ED008D]">One-Stop Destination</span>{" "}
            for All Printing Needs
          </p>
          <p className="text-center font-poppins text-[#999999] font-normal text-lg px-4">
            we offer a diverse range of printing services designed to meet the
            unique <br /> needs of businesses, educators, and individuals. Our
            commitment to quality <br /> ensures that every project, big or
            small, is handled with precision and care.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 items-center justify-center px-4 sm:px-20 py-8 gap-4 gap-x-7">
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center relative"
              >
                <img
                  src={`/${card.name}.png`}
                  alt={card.name}
                  className="object-contain w-full"
                />
                <p className="absolute bottom-0 bg-gradient-to-r from-[#ED008D] to-[#00AFEF] text-white w-full text-center py-2 sm:py-5 ">
                  {card.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrintingService;
