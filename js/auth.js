// ===================================
// ZSWAP PLUS - FIREBASE PHONE LOGIN
// ===================================

import { auth } from "../firebase/firebase.js";


import {
    RecaptchaVerifier,
    signInWithPhoneNumber
} 
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const loginForm =
document.getElementById("loginForm");



// Firebase Recaptcha

window.recaptchaVerifier =
new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
        size: "invisible"
    }
);



loginForm.addEventListener("submit", async (e)=>{


e.preventDefault();



const countryCode =
document.getElementById("countryCode").value;



const phoneNumber =
document.getElementById("phoneNumber").value;



const fullPhoneNumber =
countryCode + phoneNumber;



if(phoneNumber.length < 7){

alert("Enter a valid phone number");

return;

}



try{


const confirmationResult =

await signInWithPhoneNumber(
    auth,
    fullPhoneNumber,
    window.recaptchaVerifier
);



// Save phone number

sessionStorage.setItem(
    "zswapPhone",
    fullPhoneNumber
);



// Save verification ID

sessionStorage.setItem(
    "verificationId",
    confirmationResult.verificationId
);



alert("OTP sent successfully");



window.location.href =
"verify.html";



}

catch(error){

alert(error.message);

}



});
