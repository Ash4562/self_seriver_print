import { createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../hotel/userApi';

// Load hotelId from localStorage if it exists
const storedHotelId = localStorage.getItem('shopid');

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    hotelId: storedHotelId || null,
    user: null,
  },
  reducers: {
    setHotelId: (state, action) => {
      state.hotelId = action.payload;
      localStorage.setItem('shopid', action.payload); // keep in sync
    },
    clearHotelData: (state) => {
      state.hotelId = null;
      state.user = null;
      localStorage.removeItem('shopid'); // remove on logout or reset
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.generateQR.matchFulfilled,
      (state, { payload }) => {
        const { hotelId } = payload;
        state.user = payload;
        state.hotelId = hotelId;
        console.log('[QR Success] Hotel ID:', hotelId);
        localStorage.setItem('shopid', hotelId);
      }
    );
  },
});

export const { setHotelId, clearHotelData } = hotelSlice.actions;
export default hotelSlice.reducer;
