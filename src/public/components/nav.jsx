import React, { useState, useEffect, useRef } from "react";
import PrintLogo from "/PrintLogo.png";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import icon from "/Rectangle 44.png";
import { IoPersonOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showServiceMobile, setShowServiceMobile] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef();
  const userMenuRef = useRef(); // Add ref for user menu

  const { user } = useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out");
    navigate("/");
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    // console.log(data?.userData?.name);
  };

  const isHidden = ["/signup", "/signin"];

  useEffect(() => {
    setShowServices(false);
    setIsMenuOpen(false); // Optional: close mobile menu too
    setShowMenu(false);
  }, [location.pathname]);

  // Add click outside effect for user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  // Define background styles for different paths
  const getBackgroundStyle = (pathname) => {
    const pathStyles = {
      "/about": "bg-gradient-to-r from-[#ED008D] to-[#00CFFF]",
      "/faq": "bg-gradient-to-r from-[#ED008D] to-[#00CFFF]",
      "/contact-us": "bg-gradient-to-r from-[#ED008D] to-[#00CFFF]",
      "/OrderSuccessful": "bg-[#ED008D]", // Solid pink for order success
      // Add more paths as needed
      "/home": "bg-gradient-to-r from-[#ED008D] via-[#FFF200] to-[#00AFEF]",
      "/products": "bg-gradient-to-r from-[#ED008D] via-[#FFF200] to-[#00AFEF]",
    };

    // Return specific style if path exists, otherwise return default
    return (
      pathStyles[pathname] ||
      "bg-gradient-to-r from-[#ED008D] via-[#FFF200] to-[#00AFEF]"
    );
  };
  return (
    <div
      className={`${
        isHidden.includes(location.pathname) && "hidden"
      } flex flex-wrap justify-between items-center px-8 sm:px-8 py-4 w-full fixed top-0 z-50 ${getBackgroundStyle(
        location?.pathname
      )}`}
    >
      <Link to={"/"}>
        <div className="flex items-center gap-2">
          <img src={PrintLogo} className="h-8 sm:h-10" alt="Logo" />
          <h2 className="text-lg sm:text-2xl text-white font-jura">
            <span className="text-white">Print</span> Crafter
          </h2>
        </div>
      </Link>
      <nav
        className={`hidden sm:flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-2 sm:mt-0rounded-3xl px-4 sm:px-6 py-1 text-xs sm:text-sm`}
      >
        {/* <Link to={"/"}>
          <div className="text-[#00AFEF] font-semibold pb-1 text-lg">Home</div>
        </Link> */}
        {/* <div className="relative z-50" ref={dropdownRef}> */}
          {/* Services Button */}
          {/* <div
            onClick={(e) => {
              setShowServices((prev) => !prev);
              e.stopPropagation();
            }}
            className={`text-[#ED008C] text-lg flex items-center gap-1 cursor-pointer ${
              showServices ? "font-semibold" : ""
            }`}
          >
            Services <IoIosArrowDown className="mt-0.5" />
          </div> */}

          {/* Services Panel */}
          {showServices && (
            <div
              className="fixed inset-0 bg-black/20 z-40 flex justify-center items-start pt-24 "
              onClick={() => setShowServices(false)}
            >
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white shadow-xl p-8 rounded-xl flex gap-8 justify-between border max-w-5xl w-[90vw]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Column 1 */}
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Printing Service
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-pink-500 via-blue-400 to-yellow-400 mb-4"></div>
                  <ul className="space-y-1 text-[#999999] font-Poppins">
                    <li>Document Printing</li>
                    <li>Flyers, Brochures, Posters</li>
                    <li>Business Cards & Letterheads</li>
                    <li>Certificates & Reports</li>
                    <li>Binding & Laminating</li>
                  </ul>
                  {/* <Link
                    to={"/services/printing-service"}
                    onclick={() => setShowServices(!setShowServices)}
                    className="mt-4 bg-gray-100 w-10 h-10 text-xl rounded-full flex items-center justify-center hover:bg-gray-200"
                  >
                    →
                  </Link> */}
                </div>

                {/* Column 2 */}
                <div>
                  {/* <h3 className="text-xl font-semibold mb-2">Customised</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-pink-500 via-blue-400 to-yellow-400 mb-4"></div>
                  <ul className="space-y-1 text-[#999999]">
                    <li>T-Shirts & Hoodies</li>
                    <li>Coffee Mugs & Bottles</li>
                    <li>Tote Bags & Keychains</li>
                    <li>Mobile Covers</li>
                    <li>Corporate Gifts</li>
                  </ul> */}
                  {/* <Link
                    onclick={() => setShowServices(!setShowServices)}
                    to={"/services/customised"}
                    className="mt-4 bg-gray-100 w-10 h-10 text-xl rounded-full flex items-center justify-center hover:bg-gray-200"
                  >
                    →
                  </Link> */}
                </div>

                {/* Image + Text */}
                <div className="w-1/3">
                  <img src={icon} alt="Services" className="rounded-lg mb-4" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We offer a full spectrum of printing services tailored to
                    meet diverse needs. Whether you're a business seeking
                    professional materials, or an individual looking to
                    personalize products...
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        {/* </div> */}
        {/* <Link to="about" className="text-lg">
          <div className="text-[#ED008C] cursor-pointer text-lg">About</div>
        </Link>
        <Link to={"/upload-next"}>
          <div className="text-[#ED008C] text-lg">Print File</div>
        </Link> */}
        <div
          className={` ${
            user && "hidden"
          } ml-2 p-px rounded-full bg-gradient-to-r from-[#FFF200] to-[#FF002B] inline-block`}
        >
          <div className=" rounded-full text-lg">
            <Link to="/signin">
              <button className="px-4 cursor-pointer sm:px-6 py-1 text-sm sm:text-lg font-semibold rounded-full text-transparent bg-clip-text bg-gradient-to-r from-[#ED008D] to-[#00AFEF] hover:opacity-80 transition duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>
        {/* <div
          className={` ${
            !user && "hidden"
          } flex-wrap justify-center items-center gap-4 sm:gap-8 mt-2 sm:mt-0 bg-white rounded-3xl px-4 sm:px-6 py-1 text-xs sm:text-sm `}
        >
          <img src="/SearchIcon.svg" className="" alt="searchIcon" />
        </div> */}
      </nav>
      {/* User Menu Section - Wrap in div with ref */}
      <div
        className={`${user ? "block relative" : "hidden"}`}
        ref={userMenuRef}
      >
        <nav
          className={`flex-wrap justify-center items-center gap-2 sm:gap-4 mt-2 sm:mt-0 rounded-3xl px-4 sm:px-6 py-1 text-xs sm:text-sm`}
        >
          <div className="hidden sm:flex flex-row items-center gap-4 text-white text-xl">
            <p>{user?.user?.name}</p>
            <IoPersonOutline
              className="flex h-8 w-8 items-center text-white text-xl font-poppins cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
            />
          </div>
        </nav>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50">
            <div className="flex flex-col gap-3 p-4 text-black font-poppins text-right">
              {/* <Link
                to="/Profile"
                className="block p-3 border rounded hover:bg-gray-100 cursor-pointer bg-[#F8F8F8]"
                onClick={() => setShowMenu(false)}
              >
                Profile Setting
              </Link>

              <Link
                to="/Transaction"
                className="p-3 border rounded hover:bg-gray-100 cursor-pointer bg-[#F8F8F8]"
                onClick={() => setShowMenu(false)}
              >
                My Transactions
              </Link>

              <Link
                to="/Orders"
                className="p-3 border rounded hover:bg-gray-100 cursor-pointer bg-[#F8F8F8]"
                onClick={() => setShowMenu(false)}
              >
                My Orders
              </Link>

              <Link
                to="/Address"
                className="p-3 border rounded hover:bg-gray-100 cursor-pointer bg-[#F8F8F8]"
                onClick={() => setShowMenu(false)}
              >
                Address
              </Link> */}
              <button
                onClick={handleLogout}
                className=" text-right p-3 border rounded hover:bg-gray-100 cursor-pointer bg-[#F8F8F8]"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMenu}
        className="sm:hidden text-black bg-transparent text-2xl p-2 z-30"
      >
        {isMenuOpen ? (
          <HiOutlineX color="#fff" />
        ) : (
          <HiOutlineMenu color="#fff" />
        )}
      </button>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex sm:hidden absolute top-20 right-4 bg-white rounded-xl shadow-xl px-4 py-4 w-full max-w-xs flex-col items-center gap-4 text-sm animate-fadeIn z-30 text-center"
        >
          {/* <Link to={"/"} className="text-[#00AFEF] font-semibold">
            Home
          </Link> */}
          {/* <div
            onClick={() => setShowServiceMobile(!showServiceMobile)}
            className="text-[#ED008C] flex items-center gap-1"
          >
            Services
            <IoIosArrowDown className="mt-0.5" />
          </div> */}
          {/* {showServiceMobile && (
            <ul className="flex flex-col  gap-2">
              <Link
                to={"/services/printing-service"}
                className="text-center text-[#ED008C]"
              >
                Printing Service
              </Link>
              <Link
                to={"/services/customised"}
                className="text-center text-[#ED008C]"
              >
                Customised
              </Link>
            </ul>
          )} */}
          {/* <Link to={"/about"} className="text-[#ED008C]">
            About
          </Link>
          <Link to={"/customised"}>
            <div className="text-[#ED008C]">Print File</div>
          </Link> */}
          <div
            className={`${
              // user ? "hidden" : "block"
              ""
            } p-px rounded-xl bg-gradient-to-r from-[#FFF200] to-[#FF002B] inline-block`}
          >
            <Link to={"/signin"}>
              <div className="bg-white rounded-xl">
                <button className="px-6 py-2 text-sm font-semibold rounded-xl text-transparent bg-clip-text bg-gradient-to-r from-[#ED008D] to-[#00AFEF] hover:opacity-80 transition duration-300">
                  {user ? "Logout" : "Login"}
                </button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
