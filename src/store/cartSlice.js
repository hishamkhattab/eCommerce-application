import { createSlice } from "@reduxjs/toolkit";

// helper function

// check if item exist in the cart
const existingContent = (prevItems, nextItem) => prevItems.find((item) => item.documentID === nextItem.documentID);

// add item to the cart
const handleAddToCart = (prevItems, nextItems) => {
  const initialQty = 1;
  const isItemExists = existingContent(prevItems, nextItems);

  if (isItemExists) {
    return prevItems.map((cartItem) =>
      cartItem.documentID === nextItems.documentID ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
    );
  }

  return [
    ...prevItems,
    {
      ...nextItems,
      qty: initialQty,
    },
  ];
};

// remove item from cart
const handelRemoveCartItem = (prevItems, nextItem) =>
  prevItems.filter((item) => item.documentID !== nextItem.documentID);

// decrease the quantity of an item in cart
const handleReduceCartItem = (prevItems, nextItem) => {
  const existingCartItem = prevItems.find((item) => item.documentID === nextItem.documentID);

  // if the quantity is 1 then remove the item from cart
  if (existingCartItem.qty === 1) {
    return prevItems.filter((item) => item.documentID !== existingCartItem.documentID);
  }

  return prevItems.map((cartItem) =>
    cartItem.documentID === existingCartItem.documentID
      ? {
          ...cartItem,
          qty: cartItem.qty - 1,
        }
      : cartItem
  );
};

// increase the quantity of an item in cart
const handleIncreaseCartItem = (prevItems, nextItem) => {
  const existingCartItem = prevItems.find((item) => item.documentID === nextItem.documentID);

  // if there is still stock available
  if (existingCartItem.qty < existingCartItem.stock) {
    return prevItems.map((cartItem) =>
      cartItem.documentID === existingCartItem.documentID
        ? {
            ...cartItem,
            qty: cartItem.qty + 1,
          }
        : cartItem
    );
  }
  //   return prevItems.filter((item) => item.documentID !== existingCartItem.documentID);
};
const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add item to the cart
    addToCart: (state, action) => ({
      // ...state,
      cart: handleAddToCart(state.cart, action.payload),
    }),
    // reduce the quantity of an existing item
    reduceCartItem: (state, action) => ({
      ...state,
      cart: handleReduceCartItem(state.cart, action.payload),
    }),
    // increase the quantity of an existing item
    increaseCartItem: (state, action) => ({
      ...state,
      cart: handleIncreaseCartItem(state.cart, action.payload),
    }),
    // remove an item from the cart
    removeCartItem: (state, action) => ({
      ...state,
      cart: handelRemoveCartItem(state.cart, action.payload),
    }),
    // remove all item from the cart
    clearCart: () => ({
      ...initialState,
    }),
  },
});

export const { addToCart, reduceCartItem, removeCartItem, increaseCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
