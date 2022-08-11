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
    return rejectWithValue({ error: json.error, empty: json.emptyFields });
  }
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category, page = 0, oldData = [], adminID }, APIThunk) => {
    const { rejectWithValue } = APIThunk;

    // eslint-disable-next-line no-nested-ternary
    const url = category
      ? `/api/ecommerce/products/${category}?page=${page}`
      : adminID
      ? `/api/ecommerce/products/user/${adminID}?page=${page}`
      : `/api/ecommerce/products?page=${page}`;
    // const url = category ? `/api/ecommerce/products/${category}?page=${page}` : `/api/ecommerce/products?page=${page}`;
    try {
      const response = await fetch(url);
      const json = await response.json();

      if (response.ok) {
        if (oldData.length > 0) {
          return [...oldData, ...json];
        }
        return json;
      }
      throw Error("Something went wrong!");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk("products/deleteProduct", async ({ productId }, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const response = await fetch(`/api/ecommerce/product/${productId}`, {
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

export const updateProduct = createAsyncThunk("products/updateProduct", async (cartItem, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const response = await fetch(`/api/ecommerce/product`, {
      method: "PATCH",
      body: JSON.stringify(cartItem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      return json;
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchSingleProduct = createAsyncThunk("products/fetchSingleProduct", async (productId, APIThunk) => {
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
  deletedProduct: null,
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
      state.error = null;
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
      state.msg = null;
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.products = [];
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.msg = null;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.payload;
      state.msg = null;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      const { productId, product } = action.payload;
      state.products = state.products.filter((item) => item._id !== productId);
      state.deletedProduct = product;
      state.msg = null;
      state.error = null;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.products = {};
      state.deletedProduct = {};
      state.error = action.payload;
      state.msg = null;
    });

    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleProduct = action.payload;
      state.msg = null;
      state.error = null;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.singleProduct = {};
      state.error = action.payload;
      state.msg = null;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.msg = action.payload;
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.singleProduct = {};
      state.error = action.payload;
      state.msg = null;
    });
  },
});

export default productSlice.reducer;
