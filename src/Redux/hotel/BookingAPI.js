import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BookingAPI = createApi({
  reducerPath: "BookingAPI",
  baseQuery: fetchBaseQuery({ 
    // baseUrl: `https://back-qr-fuj7.onrender.com/api/v1/user`,
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,
    // baseUrl: `http://localhost:5000/api/v1/user`,
// 
    credentials: "include", 
  }),
  tagTypes: ["Bookings"], 
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => ({
        url: "/getbookings",
        method: "GET",
      }),
      providesTags: ["Bookings"], 
    }),

    createBooking: builder.mutation({
      query: (newBooking) => ({
        url: "/create-booking", 
        method: "POST",
        body: newBooking, 
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const { useGetBookingsQuery, useCreateBookingMutation } = BookingAPI;
