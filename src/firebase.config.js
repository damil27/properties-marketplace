// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByZt4FfHu73iBZfxIUnrH2VI11bgJ3Nig",
  authDomain: "propeties-marketplace-app.firebaseapp.com",
  projectId: "propeties-marketplace-app",
  storageBucket: "propeties-marketplace-app.appspot.com",
  messagingSenderId: "972135364021",
  appId: "1:972135364021:web:eeafd21d35cf749a1cd5fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
