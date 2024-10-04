import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { auth } from "../firebaseConfig";
  
  export const LoginAPI = (email, password) => {
    try {
      let response = signInWithEmailAndPassword(auth, email, password);
      return response;
    } catch (err) {
      return err;
    }
  };
  
  export const RegisterAPI = (email, password) => {
    try {
      let response = createUserWithEmailAndPassword(auth, email, password);
      return response;
    } catch (err) {
      return err;
    }
  };
  
  export const GoogleSignInAPI = async () => {
    try {
      const googleProvider = new GoogleAuthProvider(); 
      const res = await signInWithPopup(auth, googleProvider); // await for asynchronous handling
      return res;
    } catch (err) {
      console.error("Sign-in error: ", err); // Better error handling
      return null;
    }
  };
  
  export const onLogout = () => {
    try {
      signOut(auth);
    } catch (err) {
      return err;
    }
  };