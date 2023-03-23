import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  activatePremium: false,
  isLoading: false,
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state) {
      state.darkMode = !state.darkMode;
    },

    actPremium(state, action) {
      state.activatePremium = action.payload;
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export default ThemeSlice.reducer;
export const ThemeActions = ThemeSlice.actions;
