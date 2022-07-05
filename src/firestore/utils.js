import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth";

import firebaseConfig from "./config";

//connect to firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});
