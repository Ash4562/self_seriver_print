import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const AccountSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [active, setActive] = useState("");

  const sections = [
    { label: "Account Settings", route: "/Profile" },
    { label: "My Orders", route: "/Orders" },
    { label: "My Transactions", route: "/Transaction" },
    { label: "Address", route: "/Address" },
  ];

  useEffect(() => {
    const matchedSection = sections.find((section) =>
      location.pathname.includes(section.route.split("/")[1])
    );
    if (matchedSection) {
      setActive(matchedSection.label);
    }
  }, [location.pathname]);

  const handleClick = (section) => {
    setActive(section.label);
    navigate(section.route);
  };

  const renderTab = (section) => {
    const isActive = active === section.label;
    return (
      <div
        key={section.label}
        onClick={() => handleClick(section)}
        className={`md:p-[2px] rounded-lg transition ${
          isActive
            ? "bg-gradient-to-r from-pink-500 to-blue-500"
            : "bg-transparent"
        }`}
      >
        <div
          className={`p-3 rounded-lg border cursor-pointer h-16 text-center sm:h-auto sm:text-left ${
            isActive
              ? "bg-white text-black border-transparent"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {section.label === "Account Settings" ? (
            <div className="flex justify-between p-2 items-start mt-1 font-poppins">
              <div>
                <p className="md:text-sm">{user?.user?.name || "John Doe"}</p>
                <p className="md:text-sm text-gray-600">
                  {user?.user?.contact || 999999999}
                </p>
              </div>
              <img
                src="/Vector(1).png"
                className="w-4 h-4 mt-2 ml-1"
                alt="Edit Icon"
              />
            </div>
          ) : (
            <span className="font-poppins">{section.label}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full sm:w-1/4 md:border-2 md:p-4 rounded-lg text-[10px] sm:text-sm font-poppins">
      {/* Desktop Layout */}
      <div className="hidden sm:flex flex-col space-y-3">
        <div className="hidden md:block text-lg mb-2">Account Settings</div>
        {sections.map(renderTab)}
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col space-y-2">
        {/* John Doe full-width row */}
        <div
          className={`w-full rounded-lg transition border cursor-pointer ${
            active === "Account Settings"
              ? "bg-white text-black border-blue-500"
              : "border-gray-300 hover:border-blue-500 hover:bg-gray-100"
          }`}
          onClick={() => handleClick(sections[0])}
        >
          <div className="p-3 flex justify-between items-start font-poppins">
            <div>
              <p className="text-sm">{user?.user?.name || "John Doe"}</p>
              <p className="text-sm text-gray-600">
                {user?.user?.contact || 99999999}
              </p>
            </div>
            <img
              src="/Vector(1).png"
              className="w-4 h-4 mt-1 ml-2"
              alt="Edit Icon"
            />
          </div>
        </div>

        {/* Other tabs in one horizontal row, equal size */}
        <div className="flex flex-row gap-3">
          {sections.slice(1).map((section) => {
            const isActive = active === section.label;

            return (
              <div
                key={section.label}
                onClick={() => handleClick(section)}
                className={`flex-1 rounded-lg transition border ${
                  isActive
                    ? "bg-white text-black border-blue-500"
                    : "border-gray-300 hover:border-blue-500 hover:bg-gray-100"
                }`}
              >
                <div className="h-20 flex items-center justify-center text-center p-2 font-poppins text-sm">
                  {section.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
