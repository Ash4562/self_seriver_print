import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setHotelId } from "../Slice/hotel/hotelSlice";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
        credentials: "include"

    }),
    tagTypes: ["users"],
    endpoints: (builder) => {
        return {
            UserHotelRegister: builder.mutation({
                query: (userData) => {
                    return {
                        url: "/api/get/info",
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["users"]
            }),

            generateQR: builder.mutation({
                query: (hotel_id) => ({
                  url: "/api/get/qr",
                  method: "POST",
                  body: hotel_id,
                }),
                invalidatesTags: ["users"],
                async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                  try {
                    const { data } = await queryFulfilled;
                    // Save hotelId to slice
                    dispatch(setHotelId(data.hotelId));
                  } catch (err) {
                    console.error("Failed to save hotelId:", err);
                  }
                },
              }),
            generateAadhaarOTP: builder.mutation({
                query: userData => {
                    return {
                        url: "/generateOTP",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["users"]
            }),
            SubmitAadhaarOTP: builder.mutation({
                query: userData => {
                    return {
                        url: "/submitOTP",

                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["users"]
            }),
            userDetailForm: builder.mutation({
                query: userData => {
                    return {
                        url: "/submitAadhaarDetails",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["users"]
            }),

            AddVerifiedData: builder.mutation({
                query: (verifiedData) => {
                    return {
                        url: "/verify/add-verify",
                        method: "POST",
                        body: verifiedData
                    };
                },
            }),
       

        }
    }
})

export const { useUserDetailFormMutation, useAddVerifiedDataMutation, useUserHotelRegisterMutation, useGenerateQRMutation, useGenerateAadhaarOTPMutation, useSubmitAadhaarOTPMutation } = userApi
