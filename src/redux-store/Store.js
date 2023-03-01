import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ExpenseSlice from "./ExpenseSlice";

const Store = configureStore({
    reducer: {auth: AuthSlice, expenses: ExpenseSlice}
});

export default Store;