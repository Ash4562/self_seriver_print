import React from "react";
import CommitmentVideo from "/Printing.mp4";
import Ellipseimg from "/Ellipse 1(1).png";

export default function CommitmentSection() {
  return (
    <section className="bg-white py-16 relative overflow-hidden">
      <div className="absolute top-10 left-2/3 translate-x-1/2 lg:translate-x-0 lg:right-16 w-8 h-8 border-2 border-orange-400 rounded-full"></div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-4">
        <div className="w-[560px] h-[416px] px-4 flex items-center justify-center">
          <video
            src={CommitmentVideo}
            autoPlay
            muted
            loop
            playsInline
            className="rounded-lg w-full h-full object-cover"
          />
        </div>

        {/* Right: Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl mb-4 font-jura font-medium tracking-wide text-transparent bg-[linear-gradient(to_right,_#00AFEF_0%,_#ED008D_30%)] bg-clip-text">
            Our Commitment
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-poppins">
            We are dedicated to delivering top-notch printing solutions with a
            focus on quality, efficiency, and customer satisfaction. Our team of
            experienced professionals works closely with clients to understand
            their needs and provide tailored solutions that exceed expectations.
          </p>
        </div>

        {/* Decorative Ellipse */}
        <img
          src={Ellipseimg}
          alt=""
          className="hidden sm:block absolute bottom-32 right-0 "
        />
      </div>
    </section>
  );
}
