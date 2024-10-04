// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKZPp1gkfuDS_FUHSI62ftOz9QIhVnb1k",
  authDomain: "innov8-d5f52.firebaseapp.com",
  projectId: "innov8-d5f52",
  storageBucket: "innov8-d5f52.appspot.com",
  messagingSenderId: "639791012441",
  appId: "1:639791012441:web:86a1c98a799356e03e2f48",
  measurementId: "G-4B0NZY4VZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export { app};