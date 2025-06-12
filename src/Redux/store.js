import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/AuthSlice";
import pdfFilesReducer from "./Slice/pdfFilesSlice";
import { AuthAPI } from "./API/AuthAPI";
import { OrderAPI } from "./API/OrdersAPI";
import { PrintFilesAPI } from "./API/PrintFilesAPI";
import { ProfileAPI } from "./API/ProfileAPI";
import { AddressAPI } from "./API/AddressAPI";
import { userApi } from "./hotel/userApi";
import hotelSlice from "./Slice/hotel/hotelSlice";
// import { userApi } from "./hotelUserApi.jsx/userApi";

const store = configureStore({
  reducer: {
    auth: authSlice,
    hotel:hotelSlice,
    pdfFiles: pdfFilesReducer,
    [ProfileAPI.reducerPath]: ProfileAPI.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [AddressAPI.reducerPath]: AddressAPI.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [OrderAPI.reducerPath]: OrderAPI.reducer,
    [PrintFilesAPI.reducerPath]: PrintFilesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["pdfFiles/addPdfFiles"],
        ignoredPaths: ["pdfFiles.files"],
      },
    }).concat(
      ProfileAPI.middleware,
      AddressAPI.middleware,
      AuthAPI.middleware,
      OrderAPI.middleware,
      PrintFilesAPI.middleware,
      userApi.middleware
    ),
});

export default store;
