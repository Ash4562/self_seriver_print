import { createSlice } from "@reduxjs/toolkit";
import { AuthAPI } from "../API/AuthAPI";
import { ProfileAPI } from "../API/ProfileAPI";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: JSON.parse(localStorage.getItem("User_token")) || null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("User_token"); // Clear from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        AuthAPI.endpoints.loginVerifyOtp.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
          localStorage.setItem("User_token", JSON.stringify(payload)); // Save to localStorage
        }
      )
      .addMatcher(
        ProfileAPI.endpoints.updateProfile.matchFulfilled,
        (state, { payload }) => {
          console.log(payload);
          console.log(payload.userData);
          const updatedUser = payload.user;
          console.log(updatedUser);
          if (state.user && state.user.user) {
            state.user.user = {
              ...state.user.user,
              ...updatedUser, // merge updated fields like name, email, contact
            };

            localStorage.setItem("User_token", JSON.stringify(state.user));
          }
        }
      );
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
