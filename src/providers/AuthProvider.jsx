import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import app from "../firebase/firebase.config";
import axios from 'axios';


export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const googleSingIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    };

    const singIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const restPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email);
    }

    const authInfo = {
        loading,
        user,
        googleSingIn,
        logOut,
        createUser,
        singIn,
        restPassword,
        setLoading
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // * Get and set token:
            if (currentUser) {
                axios.post("http://localhost:5000/jwt", { email: currentUser.email })
                    .then(data => {
                        localStorage.setItem("access-token", data.data.token)
                        setLoading(false)
                    })
            }
            else {
                localStorage.removeItem("access-token")
                setLoading(false)
            }
            setUser(currentUser);
        });
        return () => {
            return unsubscribe();
        };
    }, []);


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;