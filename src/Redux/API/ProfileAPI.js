import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProfileAPI = createApi({
  reducerPath: "ProfileAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: () => ({
        url: "/api/user",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/api/user/profile",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ gender, contactNo, ...data }) => ({
        url: "/api/user/update/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = ProfileAPI;
