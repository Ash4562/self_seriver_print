import React from "react";
import Hero from "./Heropage";
import Howworks from "../components/Howworks";
import Chprint from "../components/Chprint";
import Location from "../components/Location";
import Printingoptions from "../components/Printingoptions";
import Services from "../components/Services";
import Testimonial from "../components/Testimonial";
import GetStarted from "../components/GetStarted";

const HomePage = () => {
  return (
    <div className="max-w-[100vw] overflow-x-hidden">
      <Hero></Hero>
      <Services></Services>
      <Howworks></Howworks>
      <Chprint></Chprint>
      {/* <Location></Location> */}
      <Printingoptions></Printingoptions>
      <GetStarted></GetStarted>
      <Testimonial></Testimonial>
    </div>
  );
};
export default HomePage;
