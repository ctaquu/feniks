import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCD16wJmOc_Eye7u0BUTpGnOBRCMXgZxX8",
  authDomain: "biblioteka-feniks.firebaseapp.com",
  projectId: "biblioteka-feniks",
  storageBucket: "biblioteka-feniks.appspot.com",
  messagingSenderId: "267912260670",
  appId: "1:267912260670:web:ab7a8f2fdca145a0c9f56f"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
