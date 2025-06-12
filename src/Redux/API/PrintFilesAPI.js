import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PrintFilesAPI = createApi({
  reducerPath: "PrintFilesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
  }),
  tagTypes: ["Files"],
  endpoints: (builder) => ({
    getUploadedFiles: builder.query({
      query: () => ({
        url: "/api/order/sub",
        method: "GET",
      }),
      providesTags: ["Files"],
    }),
    uploadFiles: builder.mutation({
      query: (data) => ({
        url: "/api/test",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Files"],
    }),
    deleteUploadedFiles: builder.mutation({
      query: (id) => ({
        url: `/api/user/order/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Files"],
    }),
    deleteUploadedSubFiles: builder.mutation({
      query: ({ FileId, SubFileId }) => ({
        url: `/api/delete/suborder/${FileId}/file/${SubFileId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Files"],
    }),
    uploadFilesWithDrive: builder.mutation({
      query: (data) => ({
        url: "/api/email/test",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Files"],
    }),
  }),
});

export const {
  useGetUploadedFilesQuery,
  useUploadFilesMutation,
  useDeleteUploadedFilesMutation,
  useDeleteUploadedSubFilesMutation,
  useUploadFilesWithDriveMutation,
} = PrintFilesAPI;
