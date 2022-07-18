/* eslint-disable import/no-named-as-default */
import { configureStore } from "@reduxjs/toolkit";

// reducers
import userSlice from "./userSlice";
import productSlice from "./productSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    users: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
