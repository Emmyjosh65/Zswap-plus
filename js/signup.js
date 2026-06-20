// ===================================
// ZSWAP PLUS SIGNUP
// ===================================

import { auth } from "/Zswap-plus/firebase/firebase.js";

import {
createUserWithEmailAndPassword
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const signupForm =
document.getElementById("signupForm");



signupForm.addEventListener("submit", async (e)=>{

e.preventDefault();



const fullName =
document.getElementById("fullName").value.trim();



const email =
document.getElementById("email").value.trim();



const password =
document.getElementById("password").value;



const confirmPassword =
document.getElementById("confirmPassword").value;



if(password !== confirmPassword){

alert("Passwords do not match");

return;

}



if(password.length < 6){

alert("Password must be at least 6 characters");

return;

}



try{


const userCredential =

await createUserWithEmailAndPassword(

auth,

email,

password

);



sessionStorage.setItem(

"zswapName",

fullName

);



sessionStorage.setItem(

"zswapEmail",

email

);



alert("Account created successfully");



window.location.href =
"../pages/profile.html";



}

catch(error){

alert(error.message);

}


});
