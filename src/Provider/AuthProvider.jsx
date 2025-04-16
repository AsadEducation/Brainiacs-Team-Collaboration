import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [currentUser, setCurrentUser] = useState(null);

    const signUpUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signUpGoogleUser = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
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
                const response = await axios.get(`https://new-server-brainaics.onrender.com/user/${email}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                return response.data; // Return user data if successful
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.warn(`User not found for email: ${email}. Stopping retries.`);
                    throw new Error("User not found");
                } else if (attempt < retries) {
                    console.warn(`Retrying fetch user data (Attempt ${attempt})...`);
                    await new Promise(resolve => setTimeout(resolve, 500)); // Reduced wait time
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
                    console.log(userData.email);

                    setCurrentUser(userData);
                } catch (error) {
                    if (error.message === "User not found") {
                        console.warn("User not found in the database. Proceeding with default user data.");
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
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;