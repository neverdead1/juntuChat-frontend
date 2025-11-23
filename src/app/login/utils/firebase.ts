
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDdeH4JQsibDGuiHxnvnT1MlUBv5GrBocg",
    authDomain: "chatcolaborativo-327d3.firebaseapp.com",
    projectId: "chatcolaborativo-327d3",
    storageBucket: "chatcolaborativo-327d3.firebasestorage.app",
    messagingSenderId: "296395297590",
    appId: "1:296395297590:web:0895d6ae4354eb1a4f5997",
    measurementId: "G-PNEXW2L1CC"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
