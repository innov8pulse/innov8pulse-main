import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(); // Initialize Firestore

export const LoginAPI = (email, password) => {
  try {
    let response = signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (err) {
    return err;
  }
};

export const RegisterAPI = async (email, password, name) => {
  try {
    let response = await createUserWithEmailAndPassword(auth, email, password);
    
    // After user is created, save the name in Firestore
    await setDoc(doc(db, 'users', response.user.uid), {
      email: email,
      name: name, // Save the name field
    });

    return response;
  } catch (err) {
    return err;
  }
};

export const GoogleSignInAPI = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider); // Await for asynchronous handling
    
    // Optional: Save the user's information to Firestore if needed
    const user = res.user;
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      name: user.displayName || user.email.split('@')[0], // Use display name or email prefix as fallback
    });

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
