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
import Aboutnext from "../components/Aboutnext";
import CommitmentSection from "../components/Commitment";
import GetStarted from "../components/GetStarted";
import Faq from "../components/Faq";
import Footer from "../components/Footers";
import Testimonial from "../components/Testimonial";

const FAQ = () => {
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
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#ED008D] to-[#00CFFF] relative text-white font-Poppins px-4">
        {/* Navbar */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hidden sm:block absolute top-56 left-16">
            <img src={icon1} alt="" />
          </div>
          <div className="hidden sm:block absolute top-40 left-48">
            <img src={icon2} alt="" />
          </div>
          <div className="hidden sm:block absolute bottom-28 left-64">
            <img src={icon3} alt="" />
          </div>
          <div className="hidden sm:block absolute bottom-56 right-72">
            <img src={icon4} alt="" />
          </div>
          <div className="hidden sm:block absolute top-72 right-24">
            <img src={icon5} alt="" />
          </div>
          <div className="hidden sm:block absolute top-32 right-32">
            <img src={icon6} alt="" />
          </div>
        </div>

        <div className="text-center absolute top-28 z-10 flex flex-col items-center gap-8">
          <h1 className="text-3xl">FAQ’s</h1>

          <h3 className="">
            we believe in the power of print to bring ideas to life. Established
            in [Year], our mission <br /> has been to provide high-quality,
            reliable, and innovative printing solutions that cater to <br /> the
            diverse needs of our clients. From business essentials to
            personalized creations <br />, we're here to make your vision
            tangible.{" "}
          </h3>
        </div>
      </div>
      <Faq></Faq>
      <GetStarted></GetStarted>
      <Testimonial></Testimonial>
    </div>
  );
};
export default FAQ;
