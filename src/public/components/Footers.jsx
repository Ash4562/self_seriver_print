import React from "react";
import {
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import Logo from "/PrintLogo.png";
import CompanyLogo from "/techlogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full text-white font-Poppins bg-[linear-gradient(to_right,_#FFF200,_#00AFEF,_#5F69C8,_#ED008C)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        {/* Top Row */}
        <div className="flex flex-row md:flex-row justify-between items-start md:items-center border-b border-white/30 pb-8 gap-6">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
            <h3 className="ml-3 text-2xl font-jura mt-2 md:mt-0 ">
              Print Crafter
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <p className="text-sm mt-4 font-dmsans ">Ready to get started?</p>
            <button className="px-4 py-2 rounded-md bg-[#FFF200] text-black font-semibold shadow font-dmsans ">
              Get Started
            </button>
          </div>
        </div>

        {/* Middle Links & Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm py-8 font-dmsans">
          <div>
            <div className="flex items-start">
              <FiMapPin className="text-xl mr-2 mt-1" />
              <p>
                Print.sa, Al Sadhan 90
                <br />
                Sulaymaniyah, Musa Ibn Nusair Street, Riyadh
              </p>
            </div>
            <div className="flex items-center mt-4">
              <BsTelephone className="text-xl mr-2" />
              <p>+91 666 6666 666</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-base font-dmsans">
              Services
            </h4>
            <ul className="space-y-2 cursor-pointer">
              <li className="hover:underline">Printing</li>
              <li className="hover:underline">Customised Printing</li>
              <li className="hover:underline">Educational Printing</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-base">About</h4>
            <ul className="space-y-2 cursor-pointer">
              <li className="hover:underline">Why Choose Us</li>
              <li className="hover:underline">Benefits</li>
              <li className="hover:underline">Team</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-base">Help</h4>
            <ul className="space-y-2 cursor-pointer flex flex-col">
              <Link to={"/faq"} className="hover:underline">
                FAQs
              </Link>
              <Link to="/contact-us" className="hover:underline">
                Contact Us
              </Link>
            </ul>
          </div>
        </div>

        {/* Bottom Terms + Socials */}
        <div className="flex flex-col  md:flex-row justify-between items-start md:items-center border-t border-white/30  pt-6 gap-6">
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <span className="cursor-pointer hover:underline">
              Terms & Conditions
            </span>
            <span className="cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </div>

          <div className="flex gap-6 text-xl">
            <FaFacebookF className="cursor-pointer hover:scale-110 transition-transform" />
            <FaTwitter className="cursor-pointer hover:scale-110 transition-transform" />
            <FaInstagram className="cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Footer Bottom Text */}
        <div className="flex flex-col md:flex-row justify-between items-start text-sm pt-6 mt-6 border-t border-white/30">
          <span className="mb-3 md:mb-0">@2025 All Rights Reserved</span>
          <div className="flex items-center gap-2">
            <span>Developed By</span>
            <img src={CompanyLogo} alt="Company Logo" className="h-12 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
