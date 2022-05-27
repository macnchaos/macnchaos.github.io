// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9mRwSJe9-72z7dLrmSUov8JjPO0K-ZQo",
  authDomain: "macnchaosblog.firebaseapp.com",
  projectId: "macnchaosblog",
  storageBucket: "macnchaosblog.appspot.com",
  messagingSenderId: "683015655098",
  appId: "1:683015655098:web:48ba3842dbdcc339497c83",
  measurementId: "G-9B0P3X0JQ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();