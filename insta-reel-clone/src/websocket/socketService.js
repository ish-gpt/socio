import { io } from "socket.io-client";
import { auth, authStateChanged } from "../firebase";


let socket = null;
let loggedInUser = null;


authStateChanged(auth, (user) => {
    if (user) {
        loggedInUser = user;
        connectWebScoket();
    }
})

export function connectWebScoket() {
    if (socket?.connected)
        return;
    socket = io("http://localhost:8080", {
        query: {
            userId: loggedInUser.uid
        }
    });
    socket.on("connect", () => { });

    socket.on("connectedClientID", (data) => {
        console.log(Object.keys(data));
    });
}

export function disConnectSocket() {
    if (socket?.connected) {
        socket.disconnect();
    }
    socket.on("disconnect", () => {
        // console.log("disconnected-", socket.id);
        //do something which you want to do on diconnect
    });
}