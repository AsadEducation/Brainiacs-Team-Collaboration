import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signUpUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signUpGoogleUser = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // User is signed in, fetch additional user data from the server
                try {
                    const token = await user.getIdToken(); // Get Firebase token
                    localStorage.setItem("authToken", token); // Store token in localStorage

                    const response = await axios.get("http://localhost:5000/user", {
                        headers: { Authorization: `Bearer ${token}` }, // Include token in Authorization header
                        params: { email: user.email }, // Optional: Pass email as a query parameter
                    });

                    setCurrentUser(response.data); // Set user data from the server
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setCurrentUser(null);
                }
            } else {
                // User is signed out
                setCurrentUser(null);
                localStorage.removeItem("authToken"); // Remove token from localStorage
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching user
    }

    const authInfo = {
        currentUser,
        loading,
        signUpUser,
        logInUser,
        updateUser,
        signOutUser,
        signUpGoogleUser,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;