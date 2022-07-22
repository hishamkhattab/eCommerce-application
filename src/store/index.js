/* eslint-disable import/no-named-as-default */
import { configureStore } from "@reduxjs/toolkit";

// reducers
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    users: userSlice,
    carts: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
