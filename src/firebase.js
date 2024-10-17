// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-359e7.firebaseapp.com",
  projectId: "mern-estate-359e7",
  storageBucket: "mern-estate-359e7.appspot.com",
  messagingSenderId: "660482473761",
  appId: "1:660482473761:web:653cb75b31144c08e80860"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);