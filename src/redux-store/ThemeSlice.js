import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
    activatePremium: false
}

const ThemeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme(state){
          state.darkMode = !state.darkMode;
        },

        actPremium(state, action) {
           state.activatePremium = action.payload;
        }
    }
})

export default ThemeSlice.reducer;
export const ThemeActions = ThemeSlice.actions;