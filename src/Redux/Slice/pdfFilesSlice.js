import { createSlice } from "@reduxjs/toolkit";

const pdfFilesSlice = createSlice({
  name: "pdfFilesSlice",
  initialState: {
    files: [],
  },
  reducers: {
    setPdfFiles: (state, action) => {
      state.files = action.payload;
    },
    addPdfFiles: (state, action) => {
      state.files = [...state.files, ...action.payload];
    },
    removePdfFile: (state, action) => {
      state.files = state.files.filter((_, (i) => i !== action.payload));
    },
    clearPdfFiles: (state) => {
      state.files = [];
    },
  },
});

export const { setPdfFiles, addPdfFiles, removePdfFile, clearPdfFiles } =
  pdfFilesSlice.actions;
export default pdfFilesSlice.reducer;
