// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1aJxEL4wDqcoimVtMjP5YIzr5SF87L0Y",
    authDomain: "reels-clone-8a235.firebaseapp.com",
    projectId: "reels-clone-8a235",
    storageBucket: "reels-clone-8a235.appspot.com",
    messagingSenderId: "286480084908",
    appId: "1:286480084908:web:e34f483391c57070ba9409"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dbInstance = getFirestore(app);
export const auth = getAuth();
export const signInWithEmail = signInWithEmailAndPassword;
export const createUser = createUserWithEmailAndPassword;
export const logOut = signOut;
export const authStateChanged = onAuthStateChanged; 
export const firestoreCollection = collection;
export const addDocsFirestore = addDoc;