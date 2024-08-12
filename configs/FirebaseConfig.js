// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAaII0jM7GFnew0f8cqFHNkbBCuLGYB-U",
  authDomain: "ai-travel-planner-2529c.firebaseapp.com",
  projectId: "ai-travel-planner-2529c",
  storageBucket: "ai-travel-planner-2529c.appspot.com",
  messagingSenderId: "135184897126",
  appId: "1:135184897126:web:9df85b9b2fee990fd749a7",
  measurementId: "G-ZBWVYFEYHG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);