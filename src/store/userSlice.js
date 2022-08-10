/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkIfUserSignin = createAsyncThunk("user/checkIfUserSignin", async (_, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user;
    }
    return {};
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signoutUser = createAsyncThunk("user/signoutUser", async (_, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    // remove user from localstorage
    localStorage.removeItem("user");
    // remove user's cart from localstorage
    localStorage.removeItem("cart");
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signupUser = createAsyncThunk("user/signupUser", async ({ email, password, displayName }, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  let json;
  try {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, displayName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      return json;
    }
    throw Error(json.error);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signinUser = createAsyncThunk("user/signinUser", async ({ email, password }, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  let json;
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    json = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      return json;
    }
    throw Error(json.error);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  isLoading: false,
  error: null,
  currentUser: {},
  isReset: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(checkIfUserSignin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkIfUserSignin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    });
    builder.addCase(checkIfUserSignin.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = {};
      state.error = action.payload;
    });

    // sign out User
    builder.addCase(signoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.currentUser = {};
      state.error = null;
    });
    builder.addCase(signoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Sign up user with (email - password)
    builder.addCase(signupUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = {};
      state.error = action.payload;
    });

    builder.addCase(signinUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signinUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    });
    builder.addCase(signinUser.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = {};
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
