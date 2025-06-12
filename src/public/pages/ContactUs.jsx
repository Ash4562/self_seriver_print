import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import icon from "/Rectangle 44.png";
import icon1 from "/g312.png";
import icon2 from "/g308(1).png";
import icon3 from "/g316(1).png";
import icon4 from "/g400(1).png";
import icon5 from "/g312(1).png";
import icon6 from "/Group 2.png";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "/PrintLogo.png";
import GetinTouch from "../components/GetInTouch";
// import Footer from "./Footers";

const ContactUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const dropdownRef = useRef();

  // Close menu on outside click or resize
  useEffect(() => {
    const handleClickOutside = () => setIsMenuOpen(false);
    const handleResize = () => setIsMenuOpen(false);
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowServices(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div>
      <div className="h-[90vh] md:h-auto md:min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-[#ED008D] to-[#00CFFF] relative text-white font-Poppins px-4 overflow-x-hidden">
        <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute md:top-56 md:left-16 top-32 left-2">
            <img src={icon1} alt="" />
          </div>
          <div className="absolute md:top-40 md:left-48 top-36 right-24">
            <img src={icon2} alt="" />
          </div>
          <div className="absolute md:bottom-28 md:left-64">
            <img src={icon3} alt="" />
          </div>
          <div className="absolute md:bottom-56 md:right-72">
            <img src={icon4} alt="" />
          </div>
          <div className="absolute md:top-72 md:right-24">
            <img src={icon5} alt="" />
          </div>
          <div className="absolute md:top-32 md:right-32">
            <img src={icon6} alt="" />
          </div>
        </div>
        {/* Mobile icons (< md) */}
        <div className="block md:hidden absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-4">
            <img src={icon1} alt="" className="w-8" />
          </div>
          <div className="absolute top-40 right-6">
            <img src={icon2} alt="" className="w-8" />
          </div>
          <div className="absolute bottom-28 left-1/4">
            <img src={icon3} alt="" className="w-8" />
          </div>
          <div className="absolute bottom-20 right-1/3">
            <img src={icon4} alt="" className="w-8" />
          </div>
          <div className="absolute top-2/3 right-6">
            <img src={icon5} alt="" className="w-8" />
          </div>
          <div className="absolute top-16 right-1/3">
            <img src={icon6} alt="" className="w-8" />
          </div>
        </div>

        {/* Desktop icons (md and above) */}
        <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-56 left-16">
            <img src={icon1} alt="" />
          </div>
          <div className="absolute top-40 left-48">
            <img src={icon2} alt="" />
          </div>
          <div className="absolute bottom-28 left-64">
            <img src={icon3} alt="" />
          </div>
          <div className="absolute bottom-56 right-72">
            <img src={icon4} alt="" />
          </div>
          <div className="absolute top-72 right-24">
            <img src={icon5} alt="" />
          </div>
          <div className="absolute top-32 right-32">
            <img src={icon6} alt="" />
          </div>
        </div>

        <div className="text-center z-10 ">
          <h1 className="text-3xl font-jura mt-8 md:mt-0">Contact Us</h1>
          <h3 className="font-poppins hidden md:block ">
            {" "}
            We're here to help! Whether you have a question about our services,
            need assistance<br></br> with an order, or want a custom quote, our
            team is ready to assist you. Reach out to us<br></br> via phone,
            email, or by filling out the contact form—we’ll get back to you as
            soon as<br></br> possible. Let’s bring your ideas to life!
          </h3>

          <h3 className="block sm:hidden font-poppins text-sm leading-relaxed px-4 text-justify mt-4">
            We're here to help! Whether you have a question about our services,
            need assistance with an order, or want a custom quote, our team is
            ready to assist you. Reach out to us via phone, email, or by filling
            out the contact form — we’ll get back to you as soon as possible.
            Let’s bring your ideas to life!
          </h3>
        </div>
      </div>
      <GetinTouch />
      {/* <Footer></Footer> */}
    </div>
  );
};
export default ContactUs;
