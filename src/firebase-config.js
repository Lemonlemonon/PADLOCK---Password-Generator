import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8Ro9u0Hz7-MUL7sYT9DaAceU8nj77EIA",
  authDomain: "password-generator-6d930.firebaseapp.com",
  databaseURL: "https://password-generator-6d930-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "password-generator-6d930",
  storageBucket: "password-generator-6d930.appspot.com",
  messagingSenderId: "176824243067",
  appId: "1:176824243067:web:503333142825525b0be3de",
  measurementId: "G-Y6CXYYKSSB"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

