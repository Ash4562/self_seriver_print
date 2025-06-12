import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AddressAPI = createApi({
  reducerPath: "AddressAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
    credentials: "include",
  }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (address) => ({
        url: "/api/add/address",
        method: "PATCH",
        body: address,
      }),
      invalidatesTags: ["Address"],
    }),
    getAddress: builder.query({
      query: () => ({
        url: `/api/get/address`, // Use the correct endpoint URL
        method: "GET",
      }),
      providesTags: ["Address"],
    }),
    // deleteAddress: builder.mutation({
    //   query: (addressId) => ({
    //     url: `/delete/${addressId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Address"],
    // }),
    // updateAddress: builder.mutation({
    //   query: (address) => {
    //     const { _id, ...updatedAddress } = address;
    //     return {
    //       url: `/update/${_id}`,
    //       method: "PUT",
    //       body: updatedAddress,
    //     };
    //   },
    //   invalidatesTags: ["Address"],
    //   transformResponse: (res) => {
    //     console.log(res);
    //     return res;
    //   },
    // }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAddressQuery,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = AddressAPI;
