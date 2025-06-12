// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   uploadedFiles: [],
// //   filePageCounts: {},
// //   filePreferences: {},
// //   activeFileIndex: 0,
// // };

// // export const preferencesSlice = createSlice({
// //   name: "preferences",
// //   initialState,
// //   reducers: {
// //     setUploadedFiles: (state, action) => {
// //       state.uploadedFiles = action.payload;
// //     },
// //     addUploadedFiles: (state, action) => {
// //       state.uploadedFiles = [...state.uploadedFiles, ...action.payload];
// //     },
// //     removeFile: (state, action) => {
// //       const indexToRemove = action.payload;
// //       state.uploadedFiles = state.uploadedFiles.filter(
// //         (_, i) => i !== indexToRemove
// //       );

// //       // Remove page count and preferences for the removed file
// //       const { [indexToRemove]: _, ...restPageCounts } = state.filePageCounts;
// //       state.filePageCounts = restPageCounts;

// //       const { [indexToRemove]: __, ...restPreferences } = state.filePreferences;
// //       state.filePreferences = restPreferences;

// //       // Adjust active index if needed
// //       if (state.uploadedFiles.length === 0) {
// //         state.activeFileIndex = 0;
// //       } else if (state.activeFileIndex >= state.uploadedFiles.length) {
// //         state.activeFileIndex = state.uploadedFiles.length - 1;
// //       }
// //     },
// //     setActiveFileIndex: (state, action) => {
// //       state.activeFileIndex = action.payload;
// //     },
// //     setFilePageCount: (state, action) => {
// //       const { index, count } = action.payload;
// //       state.filePageCounts = { ...state.filePageCounts, [index]: count };
// //     },
// //     updateFilePreference: (state, action) => {
// //       const { index, preferences } = action.payload;
// //       state.filePreferences = {
// //         ...state.filePreferences,
// //         [index]: {
// //           ...state.filePreferences[index],
// //           ...preferences,
// //         },
// //       };
// //     },
// //   },
// // });

// // export const {
// //   setUploadedFiles,
// //   addUploadedFiles,
// //   removeFile,
// //   setActiveFileIndex,
// //   setFilePageCount,
// //   updateFilePreference,
// // } = preferencesSlice.actions;

// // // Selectors
// // export const selectUploadedFiles = (state) => state.preferences.uploadedFiles;
// // // export const selectUploadedFiles = "";
// // export const selectActiveFileIndex = (state) =>
// //   state.preferences.activeFileIndex;
// // export const selectActiveFile = (state) => {
// //   const files = state.preferences.uploadedFiles;
// //   const index = state.preferences.activeFileIndex;
// //   return files.length > 0 ? files[index] : null;
// // };
// // export const selectFilePageCounts = (state) => state.preferences.filePageCounts;
// // export const selectActiveFilePageCount = (state) => {
// //   const index = state.preferences.activeFileIndex;
// //   return state.preferences.filePageCounts[index] || 0;
// // };
// // export const selectFilePreferences = (state) =>
// //   state.preferences.filePreferences;
// // export const selectActiveFilePreferences = (state) => {
// //   const index = state.preferences.activeFileIndex;
// //   return state.preferences.filePreferences[index] || {};
// // };

// // export default preferencesSlice.reducer;

// // import { createSlice } from "@reduxjs/toolkit";

// // const initialState = {
// //   uploadedFiles: [],
// //   activeFileIndex: 0,
// //   filePageCounts: {},
// //   filePreferences: {},
// // };

// // export const preferencesSlice = createSlice({
// //   name: "preferences",
// //   initialState,
// //   reducers: {
// //     addUploadedFiles: (state, action) => {
// //       // Add new files to the uploaded files array
// //       state.uploadedFiles = [...state.uploadedFiles, ...action.payload];

// //       // Initialize preferences for each new file
// //       action.payload.forEach((_, index) => {
// //         const newIndex =
// //           state.uploadedFiles.length - action.payload.length + index;
// //         if (!state.filePreferences[newIndex]) {
// //           state.filePreferences[newIndex] = {
// //             paperSize: "",
// //             paperType: "",
// //             printColor: "",
// //             printSide: "",
// //             packagingOption: "",
// //             sheetsCount: 1,
// //             layoutOption: "1",
// //             readingDirection: "left-to-right",
// //           };
// //         }
// //       });
// //     },
// //     removeFile: (state, action) => {
// //       // Get the file to remove
// //       const indexToRemove = action.payload;

// //       // Remove the file
// //       state.uploadedFiles = state.uploadedFiles.filter(
// //         (_, index) => index !== indexToRemove
// //       );

// //       // Reindex the filePageCounts and filePreferences
// //       const newFilePageCounts = {};
// //       const newFilePreferences = {};

// //       Object.keys(state.filePageCounts).forEach((oldIndex) => {
// //         const numIndex = Number(oldIndex);
// //         if (numIndex !== indexToRemove) {
// //           const newIndex = numIndex > indexToRemove ? numIndex - 1 : numIndex;
// //           newFilePageCounts[newIndex] = state.filePageCounts[oldIndex];
// //         }
// //       });

// //       Object.keys(state.filePreferences).forEach((oldIndex) => {
// //         const numIndex = Number(oldIndex);
// //         if (numIndex !== indexToRemove) {
// //           const newIndex = numIndex > indexToRemove ? numIndex - 1 : numIndex;
// //           newFilePreferences[newIndex] = state.filePreferences[oldIndex];
// //         }
// //       });

// //       state.filePageCounts = newFilePageCounts;
// //       state.filePreferences = newFilePreferences;

// //       // Update activeFileIndex
// //       if (state.activeFileIndex >= state.uploadedFiles.length) {
// //         state.activeFileIndex = Math.max(0, state.uploadedFiles.length - 1);
// //       }
// //     },
// //     setActiveFileIndex: (state, action) => {
// //       state.activeFileIndex = action.payload;
// //     },
// //     setFilePageCount: (state, action) => {
// //       const { index, count } = action.payload;
// //       state.filePageCounts[index] = count;
// //     },
// //     updateFilePreference: (state, action) => {
// //       const { index, preferences } = action.payload;
// //       // Initialize preferences object if it doesn't exist
// //       if (!state.filePreferences[index]) {
// //         state.filePreferences[index] = {};
// //       }

// //       // Update preferences
// //       state.filePreferences[index] = {
// //         ...state.filePreferences[index],
// //         ...preferences,
// //       };
// //     },
// //   },
// // });

// // // Export actions
// // export const {
// //   addUploadedFiles,
// //   removeFile,
// //   setActiveFileIndex,
// //   setFilePageCount,
// //   updateFilePreference,
// // } = preferencesSlice.actions;

// // // Selectors
// // export const selectUploadedFiles = (state) => state.preferences.uploadedFiles;
// // export const selectActiveFileIndex = (state) =>
// //   state.preferences.activeFileIndex;
// // export const selectActiveFile = (state) => {
// //   const files = state.preferences.uploadedFiles;
// //   const index = state.preferences.activeFileIndex;
// //   return files[index] || null;
// // };
// // export const selectFilePageCounts = (state) => state.preferences.filePageCounts;
// // export const selectActiveFilePageCount = (state) => {
// //   const counts = state.preferences.filePageCounts;
// //   const index = state.preferences.activeFileIndex;
// //   return counts[index] || 0;
// // };
// // export const selectFilePreferences = (state) =>
// //   state.preferences.filePreferences;
// // export const selectActiveFilePreferences = (state) => {
// //   const prefs = state.preferences.filePreferences;
// //   const index = state.preferences.activeFileIndex;
// //   return prefs[index] || {};
// // };

// // export default preferencesSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   uploadedFiles: [],
//   activeFileIndex: 0,
//   filePageCounts: {},
//   filePreferences: {},
// };

// export const preferencesSlice = createSlice({
//   name: "preferences",
//   initialState,
//   reducers: {
//     addUploadedFiles: (state, action) => {
//       // Add new files to the uploaded files array
//       state.uploadedFiles = [...state.uploadedFiles, ...action.payload];

//       // Initialize preferences for each new file
//       action.payload.forEach((_, index) => {
//         const newIndex =
//           state.uploadedFiles.length - action.payload.length + index;
//         if (!state.filePreferences[newIndex]) {
//           state.filePreferences[newIndex] = {
//             paperSize: "",
//             paperType: "",
//             printColor: "",
//             printSide: "",
//             packagingOption: "",
//             sheetsCount: 1,
//             layoutOption: "1",
//             readingDirection: "left-to-right",
//           };
//         }
//       });
//     },
//     removeFile: (state, action) => {
//       // Get the file to remove
//       const indexToRemove = action.payload;

//       // Remove the file
//       state.uploadedFiles = state.uploadedFiles.filter(
//         (_, index) => index !== indexToRemove
//       );

//       // Reindex the filePageCounts and filePreferences
//       const newFilePageCounts = {};
//       const newFilePreferences = {};

//       Object.keys(state.filePageCounts).forEach((oldIndex) => {
//         const numIndex = Number(oldIndex);
//         if (numIndex !== indexToRemove) {
//           const newIndex = numIndex > indexToRemove ? numIndex - 1 : numIndex;
//           newFilePageCounts[newIndex] = state.filePageCounts[oldIndex];
//         }
//       });

//       Object.keys(state.filePreferences).forEach((oldIndex) => {
//         const numIndex = Number(oldIndex);
//         if (numIndex !== indexToRemove) {
//           const newIndex = numIndex > indexToRemove ? numIndex - 1 : numIndex;
//           newFilePreferences[newIndex] = state.filePreferences[oldIndex];
//         }
//       });

//       state.filePageCounts = newFilePageCounts;
//       state.filePreferences = newFilePreferences;

//       // Update activeFileIndex
//       if (state.activeFileIndex >= state.uploadedFiles.length) {
//         state.activeFileIndex = Math.max(0, state.uploadedFiles.length - 1);
//       }
//     },
//     setActiveFileIndex: (state, action) => {
//       state.activeFileIndex = action.payload;
//     },
//     setFilePageCount: (state, action) => {
//       const { index, count } = action.payload;
//       state.filePageCounts[index] = count;
//     },
//     updateFilePreference: (state, action) => {
//       const { index, preferences } = action.payload;
//       // Initialize preferences object if it doesn't exist
//       if (!state.filePreferences[index]) {
//         state.filePreferences[index] = {};
//       }

//       // Update preferences
//       state.filePreferences[index] = {
//         ...state.filePreferences[index],
//         ...preferences,
//       };
//     },
//   },
// });

// // Export actions
// export const {
//   addUploadedFiles,
//   removeFile,
//   setActiveFileIndex,
//   setFilePageCount,
//   updateFilePreference,
// } = preferencesSlice.actions;

// // Selectors - Fixed to properly access the state structure
// export const selectUploadedFiles = (state) => state.preferences.uploadedFiles;
// export const selectActiveFileIndex = (state) =>
//   state.preferences.activeFileIndex;
// export const selectActiveFile = (state) => {
//   const files = state.preferences.uploadedFiles;
//   const index = state.preferences.activeFileIndex;
//   return files[index] || null;
// };
// export const selectFilePageCounts = (state) => state.preferences.filePageCounts;
// export const selectActiveFilePageCount = (state) => {
//   const counts = state.preferences.filePageCounts;
//   const index = state.preferences.activeFileIndex;
//   return counts[index] || 0;
// };
// export const selectFilePreferences = (state) =>
//   state.preferences.filePreferences;
// export const selectActiveFilePreferences = (state) => {
//   const prefs = state.preferences.filePreferences;
//   const index = state.preferences.activeFileIndex;
//   return prefs[index] || {};
// };

// export default preferencesSlice.reducer;
