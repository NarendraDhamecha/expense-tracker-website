import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenses: [],
};

const ExpenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        addExpense(state, action){
           state.expenses = [...action.payload];
        }
    }
})

export const ExpenseAction = ExpenseSlice.actions;
export default ExpenseSlice.reducer;