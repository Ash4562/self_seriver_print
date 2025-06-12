import React, { useState, useEffect } from "react";
import { SlPrinter } from "react-icons/sl";
import { GoPencil, GoBook } from "react-icons/go";
import { FiArrowRightCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import icon1 from "/public/sicon1.png";
import icon2 from "/public/sicon2.png";
import icon3 from "/public/sicon3.png";
import icon4 from "/public/sicon4.png";
import icon5 from "/public/sicon5.png";
import icon6 from "/public/sicon6.png";
import icon7 from "/Rectangle 9.png";
import icon8 from "/Rectangle 8.png";
import icon9 from "/Rectangle 7(1).png";

const contentData = [
  {
    leftText: "Professional Printing Simplified",
    leftTextSplitIndex: 6,
    leftPosition: "left-[14rem]",
    heading: "Printing Services",
    description: `Business cards, brochures, flyers, posters \ndone right, right here. \nTop quality. On time. Every time.`,
    topImg: icon1,
    bottomImg: icon2,
  },
  {
    leftText: "Your Design. Your Way.",
    leftTextSplitIndex: 2,
    leftPosition: "left-[18rem]",
    heading: "Customised Printing",
    description: `Print on t-shirts, cups, and more with live \npreview before you order. \nPersonalized gifts made effortless.`,
    topImg: icon3,
    bottomImg: icon4,
  },
  {
    leftText: "For Every Student, Every Subject.",
    leftTextSplitIndex: 7,
    leftPosition: "left-[13rem]",
    heading: "Educational Printing",
    description: `Workbooks, guides, and textbooks printed \nfor clarity, durability, and impact.`,
    topImg: icon5,
    bottomImg: icon6,
  },
];

const iconList = [
  { icon: <SlPrinter size={48} />, label: "Printer" },
  { icon: <GoPencil size={48} />, label: "Pencil" },
  { icon: <GoBook size={48} />, label: "Book" },
];

const Services = () => {
  const [showGradient, setShowGradient] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const isForward = activeIndex >= prevIndex;

  const handleIconClick = (index) => {
    if (index !== activeIndex) {
      setPrevIndex(activeIndex);
      setActiveIndex(index);
    }
  };

  const {
    leftText,
    leftTextSplitIndex,
    heading,
    leftPosition,
    description,
    topImg,
    bottomImg,
  } = contentData[activeIndex];

  useEffect(() => {
    setShowGradient(false);

    const timeout = setTimeout(() => {
      setShowGradient(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [activeIndex]);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-evenly h-screen px-4 mt-4 sm:px-16 bg-white relative">
      <div className="flex flex-row sm:flex-col items-center gap-6 sm:mr-12 sm:relative sm:mb-48">
        <motion.div
          className="hidden sm:block absolute  left-40 text-[#FF002B]"
          initial={false}
          animate={{ top: `${activeIndex * 100 + 56}px` }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          <FiArrowRightCircle size={32} />
        </motion.div>

        {iconList.map((item, i) => (
          <div
            key={item.label}
            onClick={() => handleIconClick(i)}
            className={`w-24 h-24 rounded-2xl flex items-center justify-center text-2xl cursor-pointer transition-colors duration-300 
      ${
        i === activeIndex
          ? "bg-gradient-to-b from-[#00AFEF] to-[#ED008D] text-white"
          : "bg-gray-100 text-[#FF002B]"
      }`}
          >
            {item.icon}
          </div>
        ))}
      </div>
      <div className="flex items-center overflow-hidden sm:mb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: isForward ? 100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isForward ? 100 : 100 }}
            transition={{
              duration: 0.6,
              ease: [0.05, 0.1, 0.05, 0.1],
            }}
            className="relative w-full flex items-center justify-center"
          >
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: isForward ? 300 : 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isForward ? 100 : 100 }}
              transition={{
                duration: 0.6,
                ease: [0.05, 0.1, 0.05, 0.1],
              }}
              className={`sm:w-[400px] sm:h-[400px] rounded-[3rem] sm:ml-32 z-10 transition-colors duration-500
        ${
          showGradient
            ? "bg-gradient-to-b from-[#00AFEF] to-[#ED008D]"
            : "bg-black"
        }`}
            />
            <div
              className={`hidden sm:block absolute ${leftPosition} text-4xl font-light leading-snug tracking-wide z-40 pointer-events-none whitespace-pre-line`}
            >
              <span className="text-white">
                {leftText.slice(0, leftTextSplitIndex)}
              </span>
              <span className="text-[#00AFEF]">
                {leftText.slice(leftTextSplitIndex)}
              </span>
            </div>

            <div className="sm:w-[500px] sm:h-[400px] rounded-[3rem] bg-white shadow-lg sm:p-6 p-12 m-4 flex flex-col justify-between z-30 sm:-ml-48">
              <div className="flex sm:flex-row flex-col justify-between items-start">
                <img
                  src={topImg}
                  alt="print sample"
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <h2 className="text-4xl font-semibold text-right bg-gradient-to-b from-[#00AFEF] to-[#ED008D] text-transparent bg-clip-text">
                  {heading.split(" ").map((word, i) => (
                    <span key={i}>
                      {word}
                      {i < heading.split(" ").length - 1 ? <br /> : ""}
                    </span>
                  ))}
                </h2>
              </div>

              <p className="text-gray-400 sm:mt-16 my-2 text-xl leading-relaxed whitespace-pre-line">
                {description}
              </p>

              <div className="flex justify-end">
                <img
                  src={bottomImg}
                  alt="bottom image"
                  className="w-32 h-16 object-cover rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-0 ">
        <img src="/CirlcesImage.png" className="object-cover" alt="" />
      </div>
      {/* <div className="flex items-center justify-center"> */}
      {/* <div className="absolute bottom-0 w-full mx-auto h-[120px] overflow-hidden pointer-events-none z-0">
        <div className="absolute bottom-0 left-[0%] w-[900px] h-[70px] z-30">
          <img src={icon7} alt="" />
        </div>
        <div className="absolute bottom-0 left-[10%] w-[900px] h-[120px]  z-10">
          <img src={icon9} alt="" />
        </div>
        <div className="absolute bottom-0 left-[25%] w-[1500px] h-[120px]  z-20">
          <img src={icon8} alt="" />
        </div>
      </div> */}
      {/* </div>{" "} */}
    </div>
  );
};

export default Services;
