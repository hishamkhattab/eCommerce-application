/* eslint-disable import/no-named-as-default */
import { configureStore } from "@reduxjs/toolkit";

// reducers
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import { orderSlice } from "./orderSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    users: userSlice,
    carts: cartSlice,
    orders: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
