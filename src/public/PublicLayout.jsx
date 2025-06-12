import React from "react";
import Navbar from "./components/nav";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footers";
import { Toaster } from "react-hot-toast";

function PublicLayout() {
  const location = useLocation();

  const hideLayout = ["/signin", "/signup"].includes(
    location.pathname.toLowerCase()
  );

  return (
    <>
      {!hideLayout && <Navbar />}
      <Outlet />
      <Toaster position="top-right" />
      {/* {!hideLayout && <Footer />} */}
    </>
  );
}

export default PublicLayout;
