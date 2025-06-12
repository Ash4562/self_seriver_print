import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import OtpInput from "react-otp-input";
import img1 from "/Saly-1.png";
import PrintLogo from "/PrintLogo.png";
import icon1 from "/print1.png";
import icon2 from "/print2.png";
import icon3 from "/print3.png";
import icon4 from "/print4.png";
import icon5 from "/print5.png";
import icon6 from "/print6.png";
import {
  useLoginMutation,
  useLoginVerifyOtpMutation,
} from "../../Redux/API/AuthAPI";
import toast from "react-hot-toast";

const SignIn = () => {
  const pathname = location.pathname; // "/signin/683fed0772e0db571e8af7b5"
  const parts = pathname.split("/"); // ["", "signin", "683fed0772e0db571e8af7b5"]
  const shopId = parts[2];
  console.log("shopId:", shopId); // 683fed0772e0db571e8af7b5
  const [otp, setOtp] = useState("");
  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const [
    verifyOtp,
    {
      isLoading: isLoadingVerifyOtp,
      isSuccess: isSuccessVerifyOtp,
      isError: isErrorVerifyOtp,
      error: errorVerifyOtp,
    },
  ] = useLoginVerifyOtpMutation();
  console.log(isLoading, isSuccess, isError, error);
  const navigate = useNavigate();

  const initialValues = {
    contact: "",
    otp: "",
  };

  const validationSchema = Yup.object({
    contact: Yup.string()
      .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
      .required("Contact number is required"),
  });

  const handleSubmit = async (values) => {
    // Check if OTP is being verified (when isSuccess is true from the initial login)
    if (isSuccess) {
      // Validate OTP length
      if (!otp || otp.length !== 6) {
        toast.error("Please enter a valid 6-digit OTP");
        return;
      }

      // Verify OTP
      try {
        const response = await verifyOtp({
          contact: values.contact,
          otp,
        }).unwrap();

        toast.success("Logged in successfully!");
        setOtp("");

        // Navigate to home page
        navigate("/upload-next", { state: { shopId } });

      } catch (error) {
        const errorMessage = error?.data?.message || "OTP verification failed";
        toast.error(errorMessage);
        console.error("OTP verification error:", error);
      }
    } else {
      // Initial login to trigger OTP
      try {
        const res = await loginUser(values).unwrap();
        toast.success("OTP sent successfully! Please verify.");
        // Note: You don't need setIsOtpSent since you're using isSuccess to show OTP field
      } catch (error) {
        const errorMessage = error?.data?.message || "Failed to send OTP";
        toast.error(errorMessage);
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:-mt-20">
      {/* Top Section */}
      <div className="bg-gradient-to-b from-[#00AFEF] to-pink-500 text-white px-6 py-10 relative overflow-hidden md:h-96 w-full">
        {/* <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-4"> */}
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <div className="z-20">
            <div className="flex items-center gap-2 -ml-4 ">
              <img src={PrintLogo} className="h-12 w-12" alt="" />
              <h2 className="text-2xl font-Jura">
                <span className="text-[#FFF200]">Print&nbsp;</span>Crafter
              </h2>
            </div>
            <h1 className="text-3xl font-bold mb-2 mt-4">Sign In to</h1>
            <p className="text-xl mb-4">Print Crafter is simply</p>
            <p className="text-sm opacity-90 max-w-80">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s.
            </p>
          </div>

          <div className="hidden md:flex justify-center absolute left-96 top-4 z-10">
            <img src={img1} alt="Rocket Girl" className="w-60 md:w-96" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white relative flex justify-center items-center px-4 py-10 flex-1">
        {/* Background icons - only show on larger screens */}
        {[icon1, icon2, icon3, icon4, icon5, icon6].map((icon, i) => (
          <img
            key={i}
            src={icon}
            alt=""
            className="hidden sm:block absolute h-8 w-8"
            style={{
              left: [0, 160, 112, 384, "50%", "50%"][i],
              bottom: [160, 160, 48, 96, 160, 32][i],
              transform: i >= 4 ? "translateX(-50%)" : undefined,
            }}
          />
        ))}

        {/* Form Card */}
        <div className="w-full sm:w-2/3 max-w-md bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 sm:absolute sm:mt-[-360px] sm:right-16 z-30 shadow-lg">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <p className="text-sm text-gray-500">
              Welcome to{" "}
              <span className="bg-gradient-to-b from-[#00AFEF] to-[#ED008D] bg-clip-text text-transparent font-bold">
                PRINT CRAFTER
              </span>
            </p>
            <Link to={"/signup"} className="text-sm text-gray-500 text-right">
              Have an Account?{" "}
              <a href="signup" className="text-pink-500 font-medium">
                Sign up
              </a>
            </Link>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-b from-[#00AFEF] to-[#ED008D] bg-clip-text mb-4">
            Sign In
          </h2>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 font-bold">
                    Enter your Contact No
                  </label>
                  <Field
                    name="contact"
                    type="text"
                    placeholder="Contact No"
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="contact"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* OTP Field */}
                <div className={`${!isSuccess && "hidden"}`}>
                  <label className="block text-sm mb-1 font-bold">
                    Enter OTP Sent To You
                  </label>
                  <OtpInput
                    value={values.otp}
                    onChange={(val) => {
                      setOtp(val);
                      setFieldValue("otp", val);
                    }}
                    numInputs={6}
                    skipDefaultStyles
                    renderInput={(props) => <input {...props} />}
                    inputStyle="h-10 sm:h-12 w-8 sm:w-12 border border-[#0060EC8C] rounded-lg mx-1 text-center text-xl"
                  />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-sm text-red-500"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Didn't Receive? <span className="font-bold">Resend</span>
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4 sm:pt-20">
                  <button
                    type="submit"
                    disabled={isLoading || isLoadingVerifyOtp}
                    className="w-full py-2 bg-gradient-to-b from-blue-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    {isLoading || isLoadingVerifyOtp
                      ? "Signing in..."
                      : "Sign in"}
                  </button>
                </div>

                {isError && (
                  <p className="text-red-500">
                    {error?.data?.message || "Something went wrong"}
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
