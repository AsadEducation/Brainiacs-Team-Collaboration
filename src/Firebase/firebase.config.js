// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyQRcmNRgN9OiqEoZ35eeiO7aib1ZaM_E",
  authDomain: "brainiacs-3218b.firebaseapp.com",
  projectId: "brainiacs-3218b",
  storageBucket: "brainiacs-3218b.firebasestorage.app",
  messagingSenderId: "871180085914",
  appId: "1:871180085914:web:5d83b2fb229896e8054d23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
