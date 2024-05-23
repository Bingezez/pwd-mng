import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    manager: {
        items: [],
        status: "loading",
    },
};

const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {},
});

export const managerReducer = managerSlice.reducer;
