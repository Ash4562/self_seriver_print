import React, { useState } from "react";
import icon1 from "/g2.png";
import icon2 from "/g308.png";
import icon3 from "/g314.png";
import icon4 from "/g400.png";
import icon5 from "/g316.png";
import icon6 from "/Rectangle 23(1).png";
import icon7 from "/textback.png";
import icon8 from "/Rectangle 23(2).png";

const testimonials = [
  {
    image: icon6,
    name: "Sally Wily – Customer Print Crafter",
    text: `Lorem ipsum dolor sit amet consectetur.Non commodo mi elit ut convallis.
Tempor facilisi pellentesque sem praesent tortor venenatis.
Diam volutpat interdum quis senectus. Quam eros nunc habitant
placerat arcu accumsan lacinia erat. Porttitor neque pharetra viverra in rhoncus.
Diam dignissim facilisis consequat quisque pharetra.`,
  },
  {
    image: icon8,
    name: "Sammy Jammy – Customer Print Crafter",
    text: `Amazing service and outstanding print quality! The attention to detail,
timely delivery, and customer care made the experience top-notch.
Would definitely recommend to anyone needing reliable printing solutions.`,
  },
];

const Testimonial = () => {
  const [current, setCurrent] = useState(0);

  const toggleTestimonial = (direction) => {
    setCurrent((prev) =>
      direction === "next"
        ? (prev + 1) % testimonials.length
        : (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="relative bg-white px-4 md:px-24 py-16 md:py-32 -mt-32 overflow-hidden">
      {/* Background icons */}
      <img
        src={icon1}
        className="absolute top-64 right-10 w-10 hidden md:block"
        alt=""
      />
      <img
        src={icon2}
        className="absolute bottom-12 left-[50%] w-10 hidden md:block"
        alt=""
      />
      <img
        src={icon3}
        className="absolute bottom-0 left-[95%] w-14 hidden md:block"
        alt=""
      />
      <img
        src={icon4}
        className="absolute bottom-72 left-4 w-10 hidden md:block"
        alt=""
      />
      <img
        src={icon5}
        className="absolute bottom-8 left-28 w-10 hidden md:block"
        alt=""
      />
      <img
        src={icon7}
        className="absolute top-80 left-20 z-10 hidden md:block"
        alt=""
      />

      <div className="flex flex-col lg:flex-row justify-between items-start gap-16 z-20 relative">
        {/* Text Section */}
        <div className="max-w-xl">
          <p className="text-black font-bold mb-2 font-poppins">Testimonials</p>
          <h3 className="hidden md:block text-[#00AFEF] text-3xl md:text-4xl leading-tight font-bold font-jura mb-2">
            Get To Know Our Printing
            <br />
            Services Closer Through
            <br />
            <span className="text-[#ED008D]">Customer Reviews</span>
          </h3>

          <h3 className="block md:hidden text-[#00AFEF] text-3xl md:text-4xl leading-tight font-bold font-jura mb-2 whitespace-nowrap">
            Get To Know Our
            <br />
            Printing Services
            <br /> Closer Through
            <br />
            <span className="text-[#ED008D]">Customer Reviews</span>
          </h3>
          <p className="text-sm text-[#999999] leading-relaxed mb-6 z-30 relative font-poppins">
            {testimonials[current].text}
          </p>
          <p className="font-semibold text-black font-poppins">
            {testimonials[current].name}
          </p>
        </div>

        {/* Image Section with Controls */}
        <div className="flex flex-col md:flex-row -mt-8 items-center gap-4">
          <img
            src={testimonials[current].image}
            alt="testimonial"
            className="w-80 md:w-96 h-auto rounded-lg transition duration-500 ease-in-out"
          />

          <div className="flex flex-row md:flex-col gap-4">
            <button
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              onClick={() => toggleTestimonial("prev")}
            >
              <span className="text-lg">←</span>
            </button>
            <button
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              onClick={() => toggleTestimonial("next")}
            >
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
