import React from "react";
import Ellipse from "/Ellipse 2.png";
import Triangle from "/g308(1).png";
import Zigzag from "/g316(1).png";

const features = [
  {
    image: "/Crown.png",
    title: "Modern Technology",
    description:
      "Lorem ipsum dolor sit amet consectetur. Non commodo mi elit ut",
  },
  {
    image: "/digital marketing.png",
    title: "Speed And Accuracy",
    description:
      "Lorem ipsum dolor sit amet consectetur. Non commodo mi elit ut",
  },
  {
    image: "/digital_audience.png",
    title: "Professional Team",
    description:
      "Lorem ipsum dolor sit amet consectetur. Non commodo mi elit ut",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-20 bg-white text-center overflow-hidden">
      {/* Floating Icons */}
      <img
        src={Triangle}
        alt="triangle"
        className=" hidden sm:block absolute top-24 left-[18%] w-6 h-6"
      />
      <img
        src={Zigzag}
        alt="zigzag"
        className=" hidden sm:block absolute top-20 right-20 w-8 h-8"
      />

      {/* Ellipse Background Shape (Left) */}
      <img
        src={Ellipse}
        alt="Ellipse"
        className=" hidden sm:block absolute top-16 left-0  z-10"
      />

      {/* Heading */}
      <h2 className="text-2xl px-4 md:text-3xl font-semibold mb-16 text-transparent bg-gradient-to-r from-[#00AFEF] to-[#ED008D] bg-clip-text font-jura z-10">
        Fast, Cheap And High-Quality
        <br /> Prints Why Not?
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-300 max-w-6xl mx-auto z-10">
        {features.map((feature, index) => (
          <div key={index} className="px-6 py-10">
            <div className="mb-4 flex justify-center">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-32 h-32 object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-sky-500 mb-2">
              {feature.title.split(" ")[0]} <br />{" "}
              {feature.title.split(" ").slice(1).join(" ")}
            </h3>
            <p className="text-sm text-gray-700 max-w-xs mx-auto">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
