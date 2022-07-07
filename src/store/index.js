import { configureStore } from "@reduxjs/toolkit";

//reducers
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {
        "users" : userSlice
    }
});

export default store;