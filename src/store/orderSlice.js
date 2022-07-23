import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";

import { clearCart } from "./cartSlice";
import { auth, db } from "../firestore/utils";

export const saveOrder = createAsyncThunk("orders/saveOrder", async (order, APIThunk) => {
  const { rejectWithValue, dispatch } = APIThunk;

  const collectionRef = collection(db, "orders");
  const timeStamp = new Date();

  try {
    await addDoc(collectionRef, {
      ...order,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timeStamp,
    });

    dispatch(clearCart());
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getOrderHistory = createAsyncThunk("orders/getOrderHistory", async (uid, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  const collectionRef = collection(db, "orders");
  const q = query(collectionRef, where("orderUserID", "==", uid), orderBy("orderCreatedDate"));

  try {
    let data = [];
    await getDocs(q).then((snapshoot) => {
      data = [
        ...snapshoot.docs.map((document) => ({
          ...document.data(),
          documentID: document.id,
        })),
      ];
    });

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getOrderDetails = createAsyncThunk("orders/getOrderDetails", async (orderID, APIThunk) => {
  const { rejectWithValue, dispatch } = APIThunk;

  const collectionRef = collection(db, "orders");
  const docRef = doc(collection, orderID);

  try {
    let data = {};
    await getDoc(docRef).then((snapshoot) => {
      if (snapshoot.exists) {
        data = {
          ...snapshoot.data(),
          documentID: orderID,
        };
      }
    });

    return data;
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
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(saveOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(saveOrder.fulfilled, (state) => {
      state.isLoading = false;
      state.message = "Added Successfully";
    });
    builder.addCase(saveOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "";
      state.error = action.payload;
    });

    builder.addCase(getOrderHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderHistory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderHistory = action.payload;
    });
    builder.addCase(getOrderHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.orderHistory = [];
      state.error = action.payload;
    });

    builder.addCase(getOrderDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orderDetails = action.payload;
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.orderDetails = {};
      state.error = action.payload;
    });
  },
});
