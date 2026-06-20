// ===================================
// ZSWAP PLUS - FIREBASE SETUP
// ===================================

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { getAuth } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import { getFirestore } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const firebaseConfig = {

  apiKey: "AIzaSyCy8VqqsgpDKpa0FkHmOKqM6EjLAOFlqiA",

  authDomain: "zswap-plus.firebaseapp.com",

  projectId: "zswap-plus",

  storageBucket: "zswap-plus.firebasestorage.app",

  messagingSenderId: "810316847652",

  appId: "1:810316847652:web:4e23d267ca21e45aded6b",

  measurementId: "G-BVC97F73TT"

};




// Initialize Firebase

const app = initializeApp(firebaseConfig);




// Authentication

export const auth = getAuth(app);




// Firestore Database

export const db = getFirestore(app);
