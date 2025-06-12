import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Navbar from "./NavLogin";
import AccountSidebar from "../components/AccountSidebar";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../Redux/API/ProfileAPI";
import { toast } from "react-hot-toast";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  // contactNo: Yup.string()
  //   .matches(/^[0-9+\-\s()]+$/, "Invalid contact number format")
  //   .min(10, "Contact number must be at least 10 digits")
  //   .max(15, "Contact number must be less than 15 digits")
  //   .required("Contact number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  // gender: Yup.string()
  //   .oneOf(["Male", "Female", "Other"], "Please select a valid gender")
  //   .required("Gender is required"),
});

const Profile = () => {
  const { data } = useGetProfileQuery();

  console.log(data);
  const [updateProfile, { isLoading, isError, isSuccess }] =
    useUpdateProfileMutation();

  // Initial form values
  const initialValues = {
    name: data ? data?.userData?.name : "",
    contactNo: data ? data?.userData?.contact : "",
    email: data ? data?.userData?.email : "",
    gender: data ? data?.userData?.gender : "",
  };

  // Form submission handler
  const handleSubmit = async (values) => {
    console.log({ values: values });
    updateProfile(values);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* <Navbar /> */}

      <div className="flex flex-col md:flex-row gap-6 px-6 py-4 w-full min-h-screen">
        {/* Sidebar */}
        <AccountSidebar />

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-gray-300"></div>

        {/* Main Content */}
        <div className="md:w-3/4 md:space-y-4 w-80">
          <div className="border rounded-xl shadow-sm p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched, handleChange }) => (
                <Form>
                  <div className="md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <label htmlFor="name" className="block mb-1 font-medium">
                        Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        // value={initialValues?.name}
                        className={`w-full border px-4 py-2 rounded bg-gray-50 ${
                          errors.name && touched.name
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-blue-500"
                        } focus:outline-none transition-colors`}
                        placeholder="Enter Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contactNo"
                        className="block mt-1 font-medium"
                      >
                        Contact No
                      </label>
                      <Field
                        type="text"
                        id="contactNo"
                        name="contactNo"
                        disabled
                        className={`w-full border opacity-70 px-4 py-2 rounded bg-gray-50 ${
                          errors.contactNo && touched.contactNo
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-blue-500"
                        } focus:outline-none transition-colors`}
                        placeholder="Enter Contact No"
                      />
                      <ErrorMessage
                        name="contactNo"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block md:mb-0 mt-1 font-medium"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full border  px-4 py-2 rounded bg-gray-50 ${
                          errors.email && touched.email
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-blue-500"
                        } focus:outline-none transition-colors`}
                        placeholder="Enter Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block mb-1 font-medium"
                      >
                        Gender
                      </label>
                      <Field
                        as="select"
                        id="gender"
                        disabled
                        name="gender"
                        className={`w-full opacity-70 border px-4 py-2 rounded bg-gray-50 ${
                          errors.gender && touched.gender
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-blue-500"
                        } focus:outline-none transition-colors`}
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex md:justify-end justify-center md:mt-64 mt-16">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-lg font-semibold transition-opacity ${
                        isSubmitting
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:opacity-90"
                      }`}
                    >
                      {isSubmitting ? "Updating..." : "Update"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
