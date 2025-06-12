import React from "react";
import { motion } from "framer-motion";
import "../components/Chprint.css";

const images = [
  "/Rectangle 21.png",
  "/Rectangle 22.png",
  "/Rectangle 23.png",
  "/Rectangle 24(1).png",
];

const ChoosePrint = () => {
  return (
    <div className="relative max-w-[100vw] bg-white py-4 sm:py-20 overflow-hidden z-0">
      {/* Center Heading */}
      {/*Laptop screen*/}
      <div className="hidden md:block mx-auto text-center max-w-xl h-auto bg-[#F8F8F8] rounded-md shadow px-4 py-6">
        <h2 className="text-lg md:text-xl font-semibold text-[#00AFEF] font-jura">
          Choose Your Print –{" "}
          <span className="text-[#ED008D]">Your Way, Your Style</span>
        </h2>
        <p className="mt-2 text-sm text-gray-700 leading-relaxed font-Poppins">
          Whether it's a single page or a full booklet, we let you customize
          every detail.
          <br />
          Customize every detail — from size and paper to color and quantity.
          <br />
          One simple step, your perfect print.
        </p>
      </div>

      {/* Mobile view*/}
      <div className="block mx-4 md:hidden text-center max-w-xl h-auto bg-[#F8F8F8] rounded-md shadow px-2 py-6">
        <h2 className="text-base font-semibold text-[#00AFEF] font-jura">
          Choose Your Print –{" "}
          <span className="text-[#ED008D]">Your Way, Your Style</span>
        </h2>
        <p className="mt-2 text-sm text-gray-700 leading-snug font-poppins whitespace-nowrap">
          Whether it's a single page or a full booklet, we let <br />
          you customize every detail. Customize size, paper,<br></br> color &
          quantity. Just one step to perfect prints.
        </p>
      </div>

      <div className="swiper">
        <motion.div
          className="scroll-wrapper flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...images, ...images].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`img-${i}`}
              className="w-48 sm:w-72 md:w-80 lg:w-96 h-96 rounded-xl object-cover shadow-md"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ChoosePrint;
