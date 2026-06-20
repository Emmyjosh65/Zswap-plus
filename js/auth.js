// ===================================
// ZSWAP PLUS - LOGIN
// ===================================

import { auth } from "/Zswap-plus/firebase/firebase.js";

import {
signInWithEmailAndPassword
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async(e)=>{

e.preventDefault();


const email =
document.getElementById("email").value.trim();


const password =
document.getElementById("password").value;



try{


await signInWithEmailAndPassword(
auth,
email,
password
);



alert("Login successful");



// Clear old profile cache

sessionStorage.clear();



// Open home

window.location.assign(
"../pages/home.html"
);



}

catch(error){

alert(error.message);

}


});
