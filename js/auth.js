// ===================================
// ZSWAP PLUS - LOGIN
// ===================================


import { auth } from "/Zswap-plus/firebase/firebase.js";


import {

signInWithEmailAndPassword

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





const loginForm =

document.getElementById("loginForm");



const loginBtn =

document.getElementById("loginBtn");





loginForm.addEventListener("submit", async(e)=>{


e.preventDefault();




const email =

document.getElementById("email").value.trim();



const password =

document.getElementById("password").value;





try{


loginBtn.innerText = "Logging in...";



await signInWithEmailAndPassword(

auth,

email,

password

);




// Save login details

sessionStorage.setItem(

"zswapEmail",

email

);



// Show name from email until Firestore profile is added

sessionStorage.setItem(

"zswapName",

email.split("@")[0]

);




alert("Login successful");



window.location.href =

"../pages/profile.html";



}



catch(error){


alert(error.message);



}



loginBtn.innerText = "Login";



});
