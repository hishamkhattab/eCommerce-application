import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db, provider} from "./../firestore/utils";

export const signinWithGoogle = createAsyncThunk("user/signinWithGoogle", async (_, APIThunk) => {
    const { rejectWithValue,dispatch } = APIThunk;
    provider.getCustomParameters({
        prompt: "select_account"
    });

    try {
        const { user } = await signInWithPopup(auth, provider);
        dispatch(addUserToDataBase({ userAuth: user, additionalData: {} }));
        const { uid, email, displayName, photoURL} = user;
        const userInfo = {
            uid,
            email,
            photoURL
        }
        return { displayName, userInfo };
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

export const addUserToDataBase = createAsyncThunk("user/addUserToDataBase", async ({userAuth,additionalData}, APIThunk) => {
    const { rejectWithValue } = APIThunk;

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
    const { uid, displayName, email } = userAuth;
    const userDoc = doc(db, "users", uid)
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
                ...additionalData
            });
        };

    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const signupUser = createAsyncThunk("user/signupUser", async (userData, APIThunk) => {
    const { rejectWithValue, dispatch } = APIThunk;


    const { displayName, email, password } = userData;
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const userInfo = {
            uid: user.uid,
            email: user.email
        };
        const additionalData = { displayName };
        dispatch(addUserToDataBase({ userAuth: user, additionalData }));

        return { displayName, userInfo };
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState = {
    isLoading: false,
    currentUser: {},
    error: [],
    username: "",
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: builder => {
        //sign-in with google
        builder.addCase(signinWithGoogle.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(signinWithGoogle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.username = action.payload.displayName;
            state.currentUser = action.payload.userInfo;
            state.error = [];
        });
        builder.addCase(signinWithGoogle.rejected, (state, action) => {
            state.isLoading = false;
            state.currentUser = {};
            state.username = "";
            state.error = action.payload;
        });

        // sign out User
        builder.addCase(signoutUser.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(signoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.currentUser = {};
            state.username = "";
        });
        builder.addCase(signoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.currentUser = {};
            state.username = "";
            state.error = action.payload;
        });

        // add user to database
        builder.addCase(addUserToDataBase.pending, state => {
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
        builder.addCase(signupUser.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            console.log("Sign-up success");
            console.log(action.payload);
            state.isLoading = false;
            state.username = action.payload.displayName;
            state.currentUser = action.payload.userInfo;
            state.error = [];
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.currentUser = {};
            state.username = "";
            state.error = action.payload;
        });
    }
});

export default userSlice.reducer;