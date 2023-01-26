import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDudjWBeu-m1pOdF5Y-6u2subW2didLbN8",
    authDomain: "fire-chat-room-11252.firebaseapp.com",
    projectId: "fire-chat-room-11252",
    storageBucket: "fire-chat-room-11252.appspot.com",
    messagingSenderId: "465127532438",
    appId: "1:465127532438:web:2b91cc89d422b99eac9fb7"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

