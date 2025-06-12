import React from "react";
import { FaUser } from "react-icons/fa";
import icon1 from "/g312.png";
import icon2 from "/g308(1).png";
import icon3 from "/g316(1).png";
import icon4 from "/g400(1).png";
import icon5 from "/g312(1).png";
import icon6 from "/Group 2.png";
import printgif from "/print.gif";
import tickgif from "/tick.gif";
import Logo from "/PrintLogo.png";
import { CiUser } from "react-icons/ci";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#ED008D] to-[#00CFFF] relative text-white font-Poppins px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute hidden sm:block top-56 left-16">
          <img src={icon1} alt="" />
        </div>
        <div className="absolute hidden sm:block top-40 left-48">
          <img src={icon2} alt="" />
        </div>
        <div className="absolute hidden sm:block bottom-28 left-64">
          <img src={icon3} alt="" />
        </div>
        <div className="absolute hidden sm:block bottom-56 right-72">
          <img src={icon4} alt="" />
        </div>
        <div className="absolute hidden sm:block top-72 right-24">
          <img src={icon5} alt="" />
        </div>
        <div className="absolute hidden sm:block top-32 right-32">
          <img src={icon6} alt="" />
        </div>
      </div>

      <div className="text-center z-10 mt-20">
        <img
          src={printgif}
          alt="Printer Icon"
          className="w-48 h-48 mx-auto mb-6"
        />
        <img
          src={tickgif}
          alt="Tick Icon"
          className="absolute sm:w-40 w-20 sm:h-40 h-20 mx-auto z-30 bottom-80 sm:bottom-56 ml-8 left-2/4"
        />

        <h2 className="text-xl font-semibold mb-2">✨ Order Successful!</h2>
        <p className="text-sm mb-1">Thank you for your order!</p>
        <p className="text-sm mb-1">
          We've received your request and our team has started processing it.
        </p>
        <p className="text-sm mb-1">
          <span className="underline text-white">Order ID: #123456</span>
        </p>
        <p className="text-sm">
          You’ll receive a confirmation email and updates as your order
          progresses.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
