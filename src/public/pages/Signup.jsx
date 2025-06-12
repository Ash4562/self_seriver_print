import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation, Link } from "react-router-dom";
import * as Yup from "yup";
import img1 from "/Saly-1.png";
import PrintLogo from "/PrintLogo.png";
import icon1 from "/print1.png";
import icon2 from "/print2.png";
import icon3 from "/print3.png";
import icon4 from "/print4.png";
import icon5 from "/print5.png";
import icon6 from "/print6.png";
import OtpInput from "react-otp-input";
import {
  useRegisterMutation,
  useRegisterVerifyOtpMutation,
} from "../../Redux/API/AuthAPI";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  contact: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
    .required("Contact number is required"),
  name: Yup.string().required("name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Signup = () => {
  const [otp, setOtp] = useState("");
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  const [
    verifyRegisterUser,
    {
      isLoading: isLoadingVerifyRegisterUser,
      isSuccess: isSuccessVerifyRegisterUser,
      isError: isErrorVerifyRegisterUser,
      error: errorVerifyRegisterUser,
    },
  ] = useRegisterVerifyOtpMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (values) => {
    try {
      // Determine if we're in OTP verification stage
      const isVerificationStage = otp.length === 6;

      if (isVerificationStage) {
        // OTP Verification
        const response = await verifyRegisterUser({
          contact: values.contact,
          otp,
        }).unwrap();

        toast.success("Logged in successfully!");
        navigate("/upload-next");
        setOtp(""); // Reset OTP after successful verification
      } else {
        // Initial OTP Request
        await registerUser(values).unwrap();
        toast.success("OTP sent successfully! Please verify.");
      }
    } catch (error) {
      // Unified error handling
      const errorMessage =
        error?.data?.message ||
        (isErrorVerifyRegisterUser
          ? "OTP verification failed"
          : "Failed to send OTP");

      toast.error(errorMessage);
      console.error("Authentication error:", error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col sm:-mt-20">
      {/* Top Gradient Section */}
      <div className="bg-gradient-to-b from-blue-500 to-pink-500 text-white p-10 relative overflow-hidden md:h-96 h-72 w-screen">
        <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Left text content */}
          <div className="z-20">
            <div className="flex whitespace-nowrap">
              <img
                src={PrintLogo}
                className="md:mt-4 -mt-8 h-16 w-16 -ml-6"
                alt=""
              />
              <h2 className="flex md:mt-8 -mt-4 text-2xl font-Jura">
                <span className="text-[#FFF200]">Print&nbsp;</span>Crafter
              </h2>
            </div>
            <h1 className="text-3xl font-bold mb-2 mt-4">Sign Up to</h1>
            <p className="text-xl mb-4">Print Crafter is simply</p>
            <p className="text-sm opacity-90 md:max-w-md max-w-xl whitespace-nowrap -mx-2 md:mx-0">
              Lorem Ipsum is simply dummy text of the printing <br /> and
              typesetting industry. Lorem Ipsum has been <br /> the industry’s
              standard dummy text ever since <br /> the 1500s.
            </p>
          </div>

          <div className="hidden md:flex justify-start absolute md:left-96 top-4 z-10">
            <img src={img1} alt="Rocket Girl" className="w-60 md:w-96" />
          </div>
        </div>
      </div>

      {/* Bottom White Section */}
      <div className="bg-white flex justify-center p-6 flex-1">
        {/* Floating Icons */}
        <img
          src={icon1}
          alt=""
          className="hidden h-10 w-10 sm:block sm:absolute left-0 bottom-40"
        />
        <img
          src={icon2}
          alt=""
          className="hidden h-10 w-10 sm:block sm:absolute left-40 bottom-40"
        />
        <img
          src={icon3}
          alt=""
          className="hidden h-8 w-8 sm:block sm:absolute left-28 bottom-12"
        />
        <img
          src={icon4}
          alt=""
          className="hidden h-6 w-6 sm:block sm:absolute left-96 bottom-24"
        />
        <img
          src={icon5}
          alt=""
          className="hidden h-8 w-8 sm:block sm:absolute left-2/4 bottom-40"
        />
        <img
          src={icon6}
          alt=""
          className="hidden h-10 w-10 sm:block sm:absolute left-2/4 bottom-8"
        />

        {/* Form Card */}
        <div className="md:w-2/3 sm:ml-8 md:ml-0 md:max-w-sm max-w-xl rounded-2xl p-8 border border-gray-200 md:mt-[-260px]   sm:absolute sm:right-16 bg-white z-30 -my-4">
          <div className="flex gap-12">
            <p className="flex flex-col text-sm mt-1 mb-6 text-gray-500 whitespace-nowrap">
              Welcome to{" "}
              <span className="bg-gradient-to-b from-[#00AFEF] to-[#ED008D] bg-clip-text text-transparent">
                PRINT CRAFTER
              </span>
            </p>
            <p className="text-sm text-right text-gray-500">
              Have an Account?{" "}
              <Link to={"/signin"} className="text-sm text-gray-500 text-right">
                Have an Account?{" "}
                <a href="signin" className="text-pink-500 font-medium">
                  Sign in
                </a>
              </Link>
            </p>
          </div>

          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-b from-[#00AFEF] to-[#ED008D] bg-clip-text pb-4">
            Sign up
          </h2>

          <Formik
            initialValues={{ contact: "", name: "", email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-4">
                {/* Contact No */}
                <div>
                  <label className="block text-sm mb-1 font-bold">
                    Enter your Contact No
                  </label>
                  <Field
                    type="text"
                    name="contact"
                    placeholder="Contact No"
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage
                    name="contact"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
                {/* name & Email */}
                <div className="grid grid-cols-2 gap-4  ">
                  <div>
                    <label className="block text-sm mb-1 text-gray-600 font-bold">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-600 font-bold">
                      Email
                    </label>
                    <h2 className="flex "></h2>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
                {/* OTP */}
                {/* <div className={${!isSuccess && "hidden"}}> */}
                {isSuccess && (
                  <div>
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
                      inputStyle="h-12 w-12 border border-[#0060EC8C] rounded-lg mx-1 text-center text-xl"
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
                )}{" "}
                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading || isLoadingVerifyRegisterUser}
                  className="w-full py-2 mt-4 bg-gradient-to-b from-blue-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
                >
                  {isLoading || isLoadingVerifyRegisterUser
                    ? "Signing up..."
                    : "Sign up"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
