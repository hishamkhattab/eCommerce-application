/* eslint-disable no-use-before-define */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addProduct = createAsyncThunk("products/addProduct", async ({ product }, APIThunk) => {
  const { rejectWithValue } = APIThunk;
  let json;
  try {
    const response = await fetch("/api/ecommerce/product", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    json = await response.json();

    if (response.ok) {
      return "Added successfully";
    }

    throw Error("Something went wrong!");
  } catch (error) {
    // if (json) {
    // return { error: json.error, empty: json.emptyFields };
    // }
    return rejectWithValue({ error: json.error, empty: json.emptyFields });
  }
});

export const fetchProducts = createAsyncThunk("products/fetchProducts", async ({ category, page = 0 }, APIThunk) => {
  const { rejectWithValue } = APIThunk;
  const url = category ? `/api/ecommerce/products/${category}?page=${page}` : `/api/ecommerce/products?page=${page}`;
  try {
    const response = await fetch(url);
    const json = await response.json();

    if (response.ok) {
      return json;
    }
    throw Error("Something went wrong!");
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async ({ productId }, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const response = await fetch(`/api/workouts/${productId}`, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      return { productId, product: json };
    }
    throw Error("Could not delete!");
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchSingleProduct = createAsyncThunk("products/fetchSingleProduct", async ({ productId }, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  const url = `/api/ecommerce/product/${productId}`;
  try {
    const response = await fetch(url);
    const json = await response.json();

    if (response.ok) {
      return json;
    }
    throw Error("There's no such product!");
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  isLoading: true,
  products: [],
  deletedProduct: {},
  singleProduct: {},
  error: null,
  emptyFields: [],
  msg: null,
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
      state.msg = action.payload;
      state.error = null;
      state.emptyFields = [];
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.emptyFields = action.payload.empty;
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
      state.isLoading = false;
      state.products = [];
      state.error = action.payload;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      const { productId, product } = action.payload;
      state.products = state.products.filter((item) => item._id !== productId);
      state.deletedProduct = product;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.products = {};
      state.deletedProduct = {};
      state.error = action.payload;
    });

    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false;
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
