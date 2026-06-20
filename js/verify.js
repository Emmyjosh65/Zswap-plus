// ===================================
// ZSWAP PLUS - VERIFY OTP
// ===================================


import { auth } from "../firebase/firebase.js";

import {
    PhoneAuthProvider,
    signInWithCredential
} 
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const verifyForm =
document.getElementById("verifyForm");



verifyForm.addEventListener("submit", async (e)=>{


e.preventDefault();



const otp =
document.getElementById("otp").value;



if(otp.length !== 6){

alert("Enter a 6 digit code");

return;

}



const verificationId =
sessionStorage.getItem("verificationId");



if(!verificationId){

alert("Verification expired. Please login again.");

window.location.href="login.html";

return;

}




try{


const credential =

PhoneAuthProvider.credential(

verificationId,

otp

);



await signInWithCredential(

auth,

credential

);



alert("Phone verified successfully");



window.location.href="profile.html";



}

catch(error){


alert("Invalid OTP");

}



});
