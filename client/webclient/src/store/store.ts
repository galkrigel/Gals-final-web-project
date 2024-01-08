import { configureStore } from "@reduxjs/toolkit";
import userIdReducer from "./UserIdSlice";

const store = configureStore({
    reducer: {
        userId: userIdReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;