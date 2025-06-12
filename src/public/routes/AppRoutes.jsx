import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";
import GenerateHotelsQr from "../pages/GenerateHotelsQr";
import UserHotelRegister from "../pages/UserHotelRegister";

const PublicLayout = React.lazy(() => import("./../../public/PublicLayout"));
const Homepage = React.lazy(() => import("../pages/Users"));
const About = React.lazy(() => import("../pages/About"));
const Signin = React.lazy(() => import("../pages/Signin"));
const Signup = React.lazy(() => import("../pages/Signup"));
const UploadNext = React.lazy(() => import("../pages/Uploadnext"));
const Customised = React.lazy(() => import("../pages/Customised"));
const Review = React.lazy(() => import("../pages/Review"));
const ReviewNext = React.lazy(() => import("../pages/Reviewnext"));
const Payment = React.lazy(() => import("../pages/Payment"));
const PrintingService = React.lazy(() => import("../pages/PrintingService"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Orders = React.lazy(() => import("../pages/Orders"));
const Transaction = React.lazy(() => import("../pages/Transaction"));
const Address = React.lazy(() => import("../pages/Address"));
const FAQ = React.lazy(() => import("../pages/FAQ"));
const ContactUs = React.lazy(() => import("../pages/ContactUs"));
const ServicesCustomised = React.lazy(() =>
  import("../pages/ServicesCustomised")
);
const OrderSuccessful = React.lazy(() =>
  import("../components/OrderSuccessful")
);

const AppRoutes = () => {
  return (
    <>
      <HashRouter>
        <Suspense fallback={<Loader />}>
          <ScrollToTop />
          <Toaster position="top-right" />
          <div className="mt-20">
            <Routes>
              <Route path="/" element={<PublicLayout />}>

                <Route index element={<Homepage />} />
                <Route path="Payment" element={<Payment />} />
                <Route path="GenerateHotelsQr" element={<GenerateHotelsQr />} />
                <Route path="UserHotelRegister" element={<UserHotelRegister />} />
                <Route path="signin/:shopid" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                <Route path="about" element={<About />} />
                <Route path="upload-next" element={<UploadNext />} />
                <Route path="Customised" element={<Customised />} />
                <Route path="Review" element={<Review />} />
                <Route path="ReviewNext" element={<ReviewNext />} />
                <Route path="OrderSuccessful" element={<OrderSuccessful />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="Profile" element={<Profile />} />
                <Route path="Orders" element={<Orders />} />
                <Route path="Transaction" element={<Transaction />} />
                <Route path="Address" element={<Address />} />
                <Route path="contact-us" element={<ContactUs />} />
                {/* SERVICES INTERNAL PAGES*/}
                <Route
                  path="/services/printing-service"
                  element={<PrintingService />}
                />
                <Route
                  path="/services/customised"
                  element={<ServicesCustomised />}
                />
              </Route>
            </Routes>
          </div>{" "}
        </Suspense>
      </HashRouter>
    </>
  );
};

export default AppRoutes;
