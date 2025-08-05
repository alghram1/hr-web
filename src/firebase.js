// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAcrFYDJtkloYW-zWX6vbkucox-DPfgpXg",
    authDomain: "employee-management-hr.firebaseapp.com",
    projectId: "employee-management-hr",
    storageBucket: "employee-management-hr.appspot.com", // ❗️صححت الامتداد
    messagingSenderId: "368627488067",
    appId: "1:368627488067:web:1905007e812df0c6ab4bf6",
    measurementId: "G-C6YXKP41MW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ هذه الإضافات مهمة للدردشة والرسائل
export const db = getFirestore(app);
export const auth = getAuth(app);
