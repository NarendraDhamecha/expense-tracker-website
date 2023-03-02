import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ExpenseSlice from "./ExpenseSlice";
import ThemeSlice from "./ThemeSlice";

const Store = configureStore({
    reducer: {auth: AuthSlice, expenses: ExpenseSlice, theme: ThemeSlice}
});

export default Store;