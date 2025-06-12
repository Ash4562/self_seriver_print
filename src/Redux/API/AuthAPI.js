import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/api/user/register",
        method: "POST",
        body: userData,
      }),
    }),
    registerVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/api/user/verify",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/api/user/login",
        method: "POST",
        body: userData,
      }),
    }),
    loginVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/api/user/login/verify",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useRegisterVerifyOtpMutation,
  useLoginMutation,
  useLoginVerifyOtpMutation,
} = AuthAPI;
