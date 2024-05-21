import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-74e4b.firebaseapp.com",
  projectId: "reactchat-74e4b",
  storageBucket: "reactchat-74e4b.appspot.com",
  messagingSenderId: "634807544486",
  appId: "1:634807544486:web:c1106a9c760ea4f1c6e267"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()