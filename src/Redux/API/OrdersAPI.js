import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const OrderAPI = createApi({
  reducerPath: "OrderAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/api/get/order",
      providesTags: ["Orders"],
    }),
    // createOrder: builder.mutation({
    //   query: (data) => ({
    //     url: `/api/order/create/${data?.id}`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `/api/order/ForSelf`,
        method: "POST",
        body: data,
      }),
    }),
    getCountry: builder.query({
      query: () => "/api/get/country",
    }),
    getShops: builder.query({
      query: ({ addressId, ...data }) => ({
        url: `/api/shop/country/${addressId}`,
        method: "POST",
        body: data,
      }),
    }),
    getShop: builder.query({
      query: (data) => ({
        url: "/api/shop/country",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useGetCountryQuery,
  useGetShopsQuery,
} = OrderAPI;
