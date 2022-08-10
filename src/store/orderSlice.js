import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProduct } from "./productSlice";

export const getOrderHistory = createAsyncThunk("orders/getOrderHistory", async (uid, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const data = [];
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getOrderDetails = createAsyncThunk("orders/getOrderDetails", async (orderID, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const data = {};

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getPaymentURL = createAsyncThunk("orders/getOrderDetails", async ({ cart, userID }, APIThunk) => {
  const { rejectWithValue, dispatch } = APIThunk;
  const obj = {
    cart,
    userID,
  };

  try {
    localStorage.setItem("cart", JSON.stringify(cart));
    const url = fetch("/api/payment/create-checkout-session", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
    if (url) return url;
    dispatch(updateProduct(cart));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  isLoading: false,
  orderHistory: [],
  orderDetails: {},
  error: null,
  message: "",
  url: null,
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    // builder.addCase(saveOrder.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(saveOrder.fulfilled, (state) => {
    //   state.isLoading = false;
    //   state.message = "Added Successfully";
    // });
    // builder.addCase(saveOrder.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.message = "";
    //   state.error = action.payload;
    // });

    // builder.addCase(getOrderHistory.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getOrderHistory.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.orderHistory = action.payload;
    // });
    // builder.addCase(getOrderHistory.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.orderHistory = [];
    //   state.error = action.payload;
    // });

    // builder.addCase(getOrderDetails.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getOrderDetails.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.orderDetails = action.payload;
    // });
    // builder.addCase(getOrderDetails.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.orderDetails = {};
    //   state.error = action.payload;
    // });

    builder.addCase(getPaymentURL.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPaymentURL.fulfilled, (state, action) => {
      state.isLoading = false;
      state.url = action.payload;
    });
    builder.addCase(getPaymentURL.rejected, (state, action) => {
      state.isLoading = false;
      state.orderDetails = {};
      state.error = action.payload;
    });
  },
});

export default orderSlice.reducer;
