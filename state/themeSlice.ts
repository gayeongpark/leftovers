import { createSlice } from "@reduxjs/toolkit";

// Define a type for the theme state
interface ThemeState {
  isDarkMode: boolean;
}

// Define the initial theme state
const initialThemeState: ThemeState = {
  isDarkMode: false,
};

// Create the theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

// Export the theme actions and reducer
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
