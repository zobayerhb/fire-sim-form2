import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYdQgvraRJ2IleeTCARarExnD46YFdFVU",
  authDomain: "simple-register-433d0.firebaseapp.com",
  projectId: "simple-register-433d0",
  storageBucket: "simple-register-433d0.firebasestorage.app",
  messagingSenderId: "518424013587",
  appId: "1:518424013587:web:8b04b2330d893e5200c8e6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)