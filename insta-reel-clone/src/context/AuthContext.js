import React, { useState, useEffect, useMemo } from "react";
import { auth, createUser, signInWithEmail, logOut, authStateChanged } from "../firebase";
import { io } from "socket.io-client";


let socket = null;
let loggedInUser = null;
export const AuthContext = React.createContext();


export function AuthProvider(props) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [onlineUser, setOnlineUser] = useState([]);

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
        disConnectSocket();
        return logOut(auth);
    }

    function connectWebScoket() {
        if (socket?.connected)
            return;
        socket = io("http://localhost:8080", {
            query: {
                userId: loggedInUser.uid
            }
        });
        socket.on("connect", () => { });

        socket.on("connectedClientID", (data) => {
            setOnlineUser([...data]);
            console.log("+++",[...data]);
        });
    }

    function disConnectSocket() {
        if (socket?.connected) {
            socket.disconnect();
        }
        socket.on("disconnect", () => {
            // console.log("disconnected-", socket.id);
            //do something which you want to do on diconnect
        });
    }

    useEffect(() => {
        let authObserver = authStateChanged(auth, (user) => {
            if (user) {
                loggedInUser = user;
                connectWebScoket();
            }
            setUser(user);
            setLoading(false);
        })

        return () => {
            authObserver();
        }
    }, [])

    const store = useMemo(() => ({
        user,
        login,
        signup,
        logout,
        connectWebScoket,
        disConnectSocket,
        onlineUser
    }), [user, login, signup, logout, connectWebScoket, disConnectSocket, onlineUser]);


    return (
        <AuthContext.Provider value={store}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}