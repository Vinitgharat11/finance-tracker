// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFwo1nHwoTg4VO7dTtZF7cjc1meekvclY",
  authDomain: "finance-tracker-ff59d.firebaseapp.com",
  projectId: "finance-tracker-ff59d",
  storageBucket: "finance-tracker-ff59d.appspot.com",
  messagingSenderId: "565344508497",
  appId: "1:565344508497:web:6b65e46b14e1b219b27670",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export {app,db,auth }