// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN500EAU6RQIyNTVzuawIQpVSsh1R1F1w",
  authDomain: "aiyla-91094.firebaseapp.com",
  projectId: "aiyla-91094",
  storageBucket: "aiyla-91094.appspot.com",
  messagingSenderId: "361236932639",
  appId: "1:361236932639:web:225002c0279cee56b9cd2a",
  measurementId: "G-77TPPVEYHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);