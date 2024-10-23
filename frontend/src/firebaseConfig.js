import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKZPp1gkfuDS_FUHSI62ftOz9QIhVnb1k",
  authDomain: "innov8-d5f52.firebaseapp.com",
  projectId: "innov8-d5f52",
  storageBucket: "innov8-d5f52.appspot.com",
  messagingSenderId: "639791012441",
  appId: "1:639791012441:web:86a1c98a799356e03e2f48",
  measurementId: "G-4B0NZY4VZG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { app, firestore, storage, db };