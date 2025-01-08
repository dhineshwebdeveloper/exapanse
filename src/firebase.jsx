// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc, setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoDN0sdvg_3f5a_zuXDWQsUvKHdPXORv4",
  authDomain: "personal-finance-taracker.firebaseapp.com",
  projectId: "personal-finance-taracker",
  storageBucket: "personal-finance-taracker.firebasestorage.app",
  messagingSenderId: "1004172453934",
  appId: "1:1004172453934:web:9732767275b203cb2017bf",
  measurementId: "G-GEF740WLB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};