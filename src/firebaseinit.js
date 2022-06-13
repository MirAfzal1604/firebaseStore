import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { firebaseConfig } from "./firebase-config.js";
import "firebase/firestore";

// firebase.initializeApp(firebaseConfig);
// export const db = firebase.firestore();

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();