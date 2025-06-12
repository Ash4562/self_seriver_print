import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GrLocation } from "react-icons/gr";

const GetinTouch = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^\+?\d{7,15}$/, "Phone number is not valid"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      // here you can send data to backend or reset form
      formik.resetForm();
    },
  });

  const fields = [
    { label: "First Name", name: "firstName", type: "text" },
    { label: "Last Name", name: "lastName", type: "text" },
    { label: "Phone", name: "phone", type: "text" },
    { label: "Email", name: "email", type: "email" },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-16 bg-white">
      {/* Left: Form Section */}
      <div className="flex-1 max-w-lg h-auto ">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-6 font-jura">
          Let's Get In Touch
        </h2>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {fields.map(({ label, name, type }) => (
              <div key={name} className="rounded-md p-[2px]">
                <label
                  htmlFor={name}
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  {label}
                </label>
                <div className="rounded-md p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-pink-500 focus-within:to-blue-500">
                  <input
                    id={name}
                    name={name}
                    type={type}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[name]}
                    className={`w-full rounded-md px-4 py-2 bg-[#F8F8F8] border-2 border-transparent focus:outline-none ${
                      formik.touched[name] && formik.errors[name]
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched[name] && formik.errors[name] ? (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors[name]}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="rounded-md p-[2px]">
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Message
            </label>
            <div className="rounded-md p-[2px] bg-transparent focus-within:bg-gradient-to-r focus-within:from-pink-500 focus-within:to-blue-500">
              <textarea
                id="message"
                name="message"
                rows={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                className={`w-full rounded-md px-4 py-2 bg-[#F8F8F8] border-2 border-transparent focus:outline-none ${
                  formik.touched.message && formik.errors.message
                    ? "border-red-500"
                    : ""
                }`}
              />
            </div>
            {formik.touched.message && formik.errors.message ? (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.message}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-pink-600 to-red-500 text-white font-semibold hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Right: Contact Info Section */}
      <div className="flex-1 max-w-lg h-[32rem] bg-gray-50 p-6 rounded-md shadow-md relative">
        <h3 className="text-2xl font-semibold mb-4 font-jura">
          Need More Help ?
        </h3>
        <p className="text-gray-600 text-base mb-6 font-poppins">
          Lorem ipsum dolor sit amet consectetur. Non commodo mi elit ut
          convallis. Tempor facilisi pellentesque sem praesent tortor.
        </p>
        <div className="text-base text-gray-700 space-y-4 font-poppins">
          <div className="flex items-start gap-3">
            <GrLocation className="w-6 h-6" />
            <p>
              Print.sa, Al Sadhan 90
              <br />
              Sulaymaniyah, Musa Ibn Nusair
              <br />
              Street, Riyadh
            </p>
          </div>
          <div className="flex items-center gap-3 text-base font-poppins">
            <span>📞</span>
            <p>+91 666 6666 666</p>
          </div>
        </div>

        {/* Decorative icons */}
        <div className="mt-6 flex gap-4 text-xl text-gray-400 ">
          <img src="/g316.png" className="w-8 h-8" alt="icon1" />
          <img
            src="/g314.png"
            className="absolute md:bottom-32 bottom-14 left-48 w-8 h-8"
            alt="icon2"
          />
          <img
            src="/g316(1).png"
            className="absolute md:bottom-48 md:left-96 bottom-4 left-32 w-8 h-8"
            alt="icon3"
          />
        </div>
      </div>
    </div>
  );
};

export default GetinTouch;
