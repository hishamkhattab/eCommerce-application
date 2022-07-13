/* eslint-disable import/no-named-as-default */
import { configureStore } from "@reduxjs/toolkit";

// reducers
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
  },
});

export default store;
