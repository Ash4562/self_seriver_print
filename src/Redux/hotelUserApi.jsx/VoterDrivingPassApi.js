import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const Voterdrivingpass = createApi({
    reducerPath: "Voterdrivingpass",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`,
        credentials: "include"

    }),
    tagTypes: ["Allinone"],
    endpoints: (builder) => {

        return {
            submitDriving: builder.mutation({
                query: (data) => {
                    return {
                        url: "driving-license/fetch-save",
                        method: "POST",
                        body: data
                    };
                },
                invalidatesTags: ["Allinone"]
            }),
            
            submitvoterId: builder.mutation({
                query: (data) => {
                    return {
                        url: "voter/fetch",
                        method: "POST",
                        body: data
                    };
                },
                invalidatesTags: ["Allinone"]
            }),
            submitPassport: builder.mutation({
           
                query: (data) => {
                    return {
                        url: "passport/storepass",
                        method: "POST",
                        body: data
                    };
                },
                invalidatesTags: ["Allinone"]
            }),
            getBookings: builder.query({
                query: () => ({
                  url: "user/fetchAllData",
                  method: "GET",
                }),
                providesTags: ["Bookings"], 
              }),
              

        }
    }
})

export const {useSubmitDrivingMutation,useSubmitvoterIdMutation,useGetBookingsQuery,useSubmitPassportMutation} = Voterdrivingpass
