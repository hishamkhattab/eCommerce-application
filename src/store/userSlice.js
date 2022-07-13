/* eslint-disable no-use-before-define */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db, provider } from "../firestore/utils";

export const checkIfUserSignin = createAsyncThunk("user/checkIfUserSignin", async (_, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    const user = auth.currentUser;
    if (user) {
      return user;
    }
    return {};
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signinWithGoogle = createAsyncThunk("user/signinWithGoogle", async (_, APIThunk) => {
  const { rejectWithValue, dispatch } = APIThunk;
  provider.getCustomParameters({
    prompt: "select_account",
  });

  try {
    const { user } = await signInWithPopup(auth, provider);

    dispatch(addUserToDataBase({ userAuth: user, additionalData: {} }));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signoutUser = createAsyncThunk("user/signoutUser", async (_, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  try {
    await auth.signOut();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signupUser = createAsyncThunk("user/signupUser", async (userData, APIThunk) => {
  const { rejectWithValue, dispatch } = APIThunk;

  const { displayName, email, password } = userData;
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {
      displayName,
      photoURL: "https://wellbeingchirony.com/wp-content/uploads/2021/03/Deafult-Profile-Pitcher.png",
    });

    dispatch(addUserToDataBase({ userAuth: user }));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signinUser = createAsyncThunk("user/signinUser", async ({ email, password }, APIThunk) => {
  const { rejectWithValue, dispatch } = APIThunk;

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch(getSnapshotFromDB(user));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addUserToDataBase = createAsyncThunk(
  "user/addUserToDataBase",
  async ({ userAuth, additionalData }, APIThunk) => {
    const { rejectWithValue, dispatch } = APIThunk;

    /**
     * basiclly this method is to check if there is a user sign-in or not
     * if no user sign-in return
     * else:
     * 1) get id, name, and email of the user
     * 2) create a refrence of a document of the user
     * 3) then check if there is a document with the same user-id or not
     * 4) if yes return
     * 5) if not, create a new document with id is the same as user-id
     * 6)
     */

    // if (!userAuth) return;
    const { uid, displayName, email, photoURL } = userAuth;
    const userDoc = doc(db, "users", uid);
    const timestamp = new Date();
    const userRoles = ["user"];

    try {
      const snapshot = await getDoc(userDoc);

      if (!snapshot.exists()) {
        await setDoc(userDoc, {
          displayName,
          email,
          createdDate: timestamp,
          userRoles,
          photoURL,
          ...additionalData,
        });
      }

      dispatch(getSnapshotFromDB(userAuth));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk("user/resetPassword", async (email, APIThunk) => {
  const { rejectWithValue } = APIThunk;

  // if the email was sent successfully, it will direct you to that
  // specific url
  try {
    await sendPasswordResetEmail(auth, email, {
      url: "http://localhost:3000/login",
    });
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getSnapshotFromDB = createAsyncThunk("user/getSnapshot", async (user, APIThunk) => {
  const { rejectWithValue } = APIThunk;
  const { uid } = user;
  const userRef = doc(db, "users", uid);
  try {
    const snapshot = await getDoc(userRef);
    return { ...snapshot.data(), createdDate: snapshot.data().createdDate.toDate().toDateString() };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  isLoading: false,
  error: [],
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
      state.username = action.payload.username ? action.payload.username : "";
      state.currentUser = action.payload;
      state.error = [];
    });
    builder.addCase(checkIfUserSignin.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = {};
      state.username = "";
      state.error = action.payload;
    });

    // sign-in with google
    builder.addCase(signinWithGoogle.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signinWithGoogle.fulfilled, (state) => {
      state.isLoading = false;
      state.error = [];
    });
    builder.addCase(signinWithGoogle.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = {};
      state.username = "";
      state.error = action.payload;
    });

    // sign out User
    builder.addCase(signoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.currentUser = {};
    });
    builder.addCase(signoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = {};
      state.error = action.payload;
    });

    // add user to database
    builder.addCase(addUserToDataBase.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUserToDataBase.fulfilled, (state) => {
      state.isLoading = false;
      state.error = [];
    });
    builder.addCase(addUserToDataBase.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Sign up user with (email - password)
    builder.addCase(signupUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupUser.fulfilled, (state) => {
      state.isLoading = false;
      state.error = [];
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = {};
      state.username = "";
      state.error = action.payload;
    });

    builder.addCase(signinUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signinUser.fulfilled, (state) => {
      state.isLoading = false;
      state.error = [];
    });
    builder.addCase(signinUser.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = {};
      state.username = "";
      state.error = action.payload;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.isReset = true;
      state.error = [];
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.isReset = false;
      state.error = action.payload;
    });

    builder.addCase(getSnapshotFromDB.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSnapshotFromDB.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = { ...action.payload, createdDate: new Date(action.payload.createdDate) };
      state.error = [];
    });
    builder.addCase(getSnapshotFromDB.rejected, (state, action) => {
      state.isLoading = false;
      state.currentUser = {};
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
