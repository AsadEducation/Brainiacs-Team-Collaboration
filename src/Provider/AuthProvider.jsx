import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null); // Initialize as null instead of an empty array
    const [loading, setLoading] = useState(true)

    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signUpGoogleUser = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const authInfo = {
        currentUser: user, // Provide currentUser for consistency
        loading,
        signUpUser,
        logInUser,
        updateUser,
        signOutUser,
        signUpGoogleUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;