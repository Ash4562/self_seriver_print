import React from "react";
import Locimg from "/public/Location.png";
import Mapimg from "/public/Map.png";

const Location = () => {
  return (
    <div className="mx-auto  px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="flex-shrink-0 h-[569px]">
        <img
          src={Locimg}
          alt="Location Visual"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col gap-6 max-w-md">
        <div className="w-64 h-64">
          <img
            src={Mapimg}
            alt="Map Visual"
            className="w-full h-full object-contain"
          />
        </div>

        <h2 className="text-transparent bg-gradient-to-r from-[#00AFEF] to-[#ED008D] bg-clip-text text-2xl font-Jura leading-snug">
          Pick Your Location
          <br />
          We’re Everywhere You Need Us
        </h2>

        <p className="text-[#999999] font-Poppins text-base leading-relaxed">
          Get faster delivery and accurate pricing by choosing your nearest
          location.
          <br />
          Whether you're at home, the office, or campus — we deliver prints
          where you need them.
        </p>
      </div>
    </div>
  );
};

export default Location;
