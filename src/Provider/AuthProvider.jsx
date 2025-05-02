import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null); // Ensure default value is null

const axiosPublic = useAxiosPublic();

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [currentUser, setCurrentUser] = useState(null);

  const signUpUser = async (email, password, displayName, photoURL) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Update user profile with displayName and photoURL
    await updateProfile(user, {
      displayName,
      photoURL,
    });

    // Prepare user data for the database
    const newUser = {
      _id: user.uid, // Firebase UID
      displayName: displayName,
      email: email.trim(),
      role: "user",
      photoURL: photoURL,
    };

    // Save user to the database
    await axios.post(`${import.meta.env.VITE_API_URL}/users`, newUser);

    // Manually update currentUser state
    setCurrentUser(newUser);

    return user;
  };

  const signUpGoogleUser = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.error("Error during login:", error);
      throw error; // Propagate the error for handling in the calling function
    });
  };

  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const fetchUserDataWithRetry = async (email, token, retries = 2) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await axiosPublic.get(`/user/${email}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Return user data if successful
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn(`User not found for email: ${email}. Stopping retries.`);
          throw new Error("User not found");
        } else if (attempt < retries) {
          console.warn(`Retrying fetch user data (Attempt ${attempt})...`);
          await new Promise((resolve) => setTimeout(resolve, 500)); // Reduced wait time
        } else {
          throw error; // Throw error if retries are exhausted or another error occurs
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          localStorage.setItem("authToken", token);

          const userData = await fetchUserDataWithRetry(user.email, token, 1); // Reduced retries
          console.log(userData);

          setCurrentUser(userData);
        } catch (error) {
          if (error.message === "User not found") {
            console.warn(
              "User not found in the database. Proceeding with default user data."
            );
            setCurrentUser({
              email: user.email,
              name: user.displayName || "Unknown",
              role: "user",
            });
          } else {
            console.error("Error fetching user data:", error);
            setCurrentUser(null);
          }
        }
      } else {
        setCurrentUser(null);
        localStorage.removeItem("authToken");
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    currentUser,
    signUpUser,
    logInUser,
    updateUser,
    signOutUser,
    signUpGoogleUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
