/* eslint-disable no-use-before-define */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  where,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firestore/utils";

export const addProduct = createAsyncThunk("products/addProduct", async (product, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const createdDate = new Date();
    const productAdminUserUID = auth.currentUser.uid;

    await addDoc(collection(db, "products"), {
      ...product,
      createdDate,
      productAdminUserUID,
    });
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ filterType, startAfterDoc, persistsProduct = [] }, APIThunk) => {
    const { rejectWithValue } = APIThunk;

    const pageSize = 6;
    let q = query(collection(db, "products"), orderBy("createdDate", "desc"), limit(pageSize));
    try {
      if (filterType)
        q = query(collection(db, "products"), where("productCategory", "==", filterType), limit(pageSize));
      if (filterType && startAfterDoc) {
        q = query(
          collection(db, "products"),
          where("productCategory", "==", filterType),
          startAfter(startAfterDoc),
          limit(pageSize)
        );
      } else if (startAfterDoc) {
        q = query(collection(db, "products"), startAfter(startAfterDoc), limit(pageSize));
      }

      let totalCount;
      let data = [];
      let queryDoc;
      await getDocs(q).then((snaphoot) => {
        totalCount = snaphoot.size;
        data = [
          ...persistsProduct,
          ...snaphoot.docs.map((document) => ({
            ...document.data(),
            createdDate: document.data().createdDate.toDate().toDateString(),
            documentID: document.id,
          })),
        ];
        queryDoc = snaphoot.docs[totalCount - 1];
      });

      return { data, queryDoc, isLastPage: totalCount < 1 };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (productId, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const docRef = doc(db, "products", productId);
    await deleteDoc(docRef);
    return productId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchSingleProduct = createAsyncThunk("products/fetchSingleProduct", async (productId, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const docRef = doc(db, "products", productId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists)
      return {
        ...snapshot.data(),
        documentID: productId,
      };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  isLoading: false,
  products: [],
  singleProduct: {},
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = [action.payload, ...state.products];
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.payload;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isLoading = true;
      state.products = action.payload.data;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.products = [];
      state.error = action.payload;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = true;
      state.products = state.products.filter((product) => product.documentID !== action.payload);
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.payload;
    });

    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.isLoading = true;
      state.singleProduct = action.payload;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.singleProduct = {};
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
