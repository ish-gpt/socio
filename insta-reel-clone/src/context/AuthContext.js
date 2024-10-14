import React, { useState, useEffect } from "react";
import { auth, createUser, signInWithEmail, logOut, authStateChanged } from "../firebase";

export const AuthContext = React.createContext();

export function AuthProvider(props) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function login(email,password) {
        return signInWithEmail(auth,email,password)
    }

    function signup(email, password) {
        try {
            return createUser(auth, email, password)
        } catch (error) {
            console.log("ERROR",error);
            throw error;
        }
    }

    function logout() {
        return logOut(auth);
    }

    useEffect(() => {
        let authObserver = authStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })

        return () => {
            authObserver();
        }
    })

    const store = {
        user,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={store}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}