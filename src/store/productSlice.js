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
import { act } from "react-dom/test-utils";
import { auth, db } from "../firestore/utils";

export const addProduct = createAsyncThunk("products/addProduct", async ({ product, collectionName }, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const createdDate = new Date();
    const productAdminUserUID = auth.currentUser.uid;

    await addDoc(collection(db, collectionName), {
      ...product,
      createdDate,
      productAdminUserUID,
    });

    return { product, collectionName };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ filterType, startAfterDoc, persistsProduct = [] }, APIThunk) => {
    const { rejectWithValue } = APIThunk;

    const pageSize = 4;
    let q = query(collection(db, "products"), orderBy("createdDate", "desc"), limit(pageSize));
    try {
      if (filterType)
        q = query(collection(db, "products"), where("productCategory", "array-contains", filterType), limit(pageSize));
      if (filterType && startAfterDoc) {
        q = query(
          collection(db, "products"),
          where("productCategory", "==", filterType),
          startAfter(startAfterDoc),
          limit(pageSize)
        );
      } else if (startAfterDoc) {
        q = query(
          collection(db, "products"),
          orderBy("createdDate", "desc"),
          startAfter(startAfterDoc),
          limit(pageSize)
        );
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
  isLoading: true,
  products: {},
  hotDeals: [],
  newArrival: [],
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
      const { product, collectionName } = action.payload;
      switch (collectionName) {
        case "products":
          state.products = { ...state.products, data: [product, ...state.products.data] };
          state.isLoading = false;
          break;
        case "hotDeals":
          state.hotDeals = [product, ...state.products];
          state.isLoading = false;
          break;
        case "newArrival":
          state.products = [product, ...state.products];
          state.isLoading = false;
          break;
        default:
          state.isLoading = false;
      }
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.payload;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.products = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
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
