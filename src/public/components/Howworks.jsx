import React from "react";
import { SlidersHorizontal, Eye, Truck } from "lucide-react";
import book from "/public/book.png";
import Bgimg from "/public/Rectangle7.png";
import sideimg from "/public/rectangle8.png";
import icon1 from "/public/icon1.png";
import icon2 from "/public/icon2.svg";
import icon3 from "/public/icon3.png";
import icon4 from "/public/icon4.png";

const steps = [
  {
    id: 1,
    icon: <img src={icon1} alt="Upload" className="w-12 h-12 " />,
    title: "Upload Your File",
    desc: "Choose your document or design in PDF, PNG, JPG or DOC format.",
  },
  {
    id: 2,
    icon: <img src={icon2} alt="Upload" className="w-8 h-8 " />,
    title: "Customize Your Print",
    desc: "Select paper type, size, quantity, color options, and more.",
  },
  {
    id: 3,
    icon: <img src={icon4} alt="Upload" className="w-12 h-12 " />,
    title: "Preview & Pay",
    desc: "Review the print preview, then pay securely online.",
  },
  {
    id: 4,
    icon: <img src={icon3} alt="Upload" className="w-12 h-12 " />,
    title: "We Print & Deliver",
    desc: "We print your order and deliver it right to your doorstep.",
  },
];

const Info = () => {
  return (
    <div
      className={`z-50 w-full h-full bg-no-repeat bg-center bg-contain sm:bg-[url(/Rectangle7.png)] px-10 sm:mt-12 py-10 md:px-16 sm:flex flex-col md:flex-row items-center justify-center gap-12 relative overflow-hidden`}
    >
      {/* Left Book + Title */}
      {/* <div className="relative w-72 h-[500px] md:mt-20 z-30"> */}
      <div className="relative sm:w-72 sm:h-[500px] md:mt-20 z-30">
        <img src={book} alt="Book" className="w-full h-full object-contain" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-black text-2xl font-bold space-y-2">
          <span className="mr-8">HOW</span>
          <span className="mr-16">IT</span>
          <span>WORKS?</span>
        </div>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full h-full sm:w-[600px] sm:relative">
        {steps.map((step) => (
          <div key={step.id} className="relative h-full w-full">
            {/* Step Number */}
            <div className="absolute top-0 sm:-left-10 sm:top-1/2 transform -translate-y-1/2 z-20">
              <div className="w-10 h-10 bg-black/20 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm text-white shadow">
                {step.id}
              </div>
            </div>

            {/* Back Yellow Layer */}
            <div className="absolute inset-0 bg-yellow-400 w-5/6 rounded-xl rotate-[4deg] translate-x-2 translate-y-2 z-0" />

            {/* Front White Card */}
            <div className="relative bg-white rounded-xl p-5 ml-4 shadow-xl space-y-2 h-full w-4/5 rotate-[12deg] z-10">
              <div className="flex items-center gap-2">{step.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block md:w-1/4 mt-20">
        <img
          src={sideimg}
          alt="Steps Visual"
          className="w-full h-auto rounded-2xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default Info;
