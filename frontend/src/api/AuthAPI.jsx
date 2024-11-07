import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(); // Initialize Firestore

// Refactored RegisterAPI to include the user role
export const RegisterAPI = async (email, password, name = "Anonymous", role = "participant") => {
  try {
    let response = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', response.user.uid), {
      email: email,
      name: name || "Anonymous",
      role: role || "participant",
      uid: response.user.uid
    }, { merge: true });
    return response;

  } catch (err) {

    console.error("Registration error:", err.code, err.message); // Log the error code and message
    throw new Error(err.message); // Throw the error to be handled upstream
  }
};


// Refactored LoginAPI to fetch user role after login
export const LoginAPI = async (email, password) => {
  try {
    let response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;

    // Fetch the user's role from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { ...response, role: userData.role }; // Return login response with the user role
    } else {
      throw new Error("User data not found in Firestore.");
    }
  } catch (err) {
    return err;
  }
};

// Refactored GoogleSignInAPI to store user role (default 'mentor' in this case)
export const GoogleSignInAPI = async (role = "mentor") => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleProvider);

    const user = res.user;
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    // If the user is not already in Firestore, add them with a role
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: user.displayName || user.email.split('@')[0], // Use displayName or email prefix
        role: role, // Assign default role for Google sign-in
        uid: user.uid // Store the unique ID
      });
    }

    return res;
  } catch (err) {
    console.error("Google Sign-in error: ", err);
    return null;
  }
};

// Logout function remains unchanged
export const onLogout = () => {
  try {
    signOut(auth);
  } catch (err) {
    return err;
  }
};
