// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'
import 'firebase/compat/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDrr-vfbqfRcaYIo2WHbk8pAXGFyy9qugs",
    authDomain: "mymoney-bfae1.firebaseapp.com",
    projectId: "mymoney-bfae1",
    storageBucket: "mymoney-bfae1.appspot.com",
    messagingSenderId: "868947494443",
    appId: "1:868947494443:web:a8f1b50bd3326187e58c6e",
    measurementId: "G-4CFMT479JE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// FireStore
export const db = app.firestore()

// Firebase Auth
export const auth = app.auth()