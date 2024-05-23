import { configureStore } from "@reduxjs/toolkit";

import { managerReducer } from "./slices/manager";

const store = configureStore({
    reducer: {
        manager: managerReducer,
    },
});

export default store;
