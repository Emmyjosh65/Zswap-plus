// ===================================
// ZSWAP PLUS - FIREBASE PHONE LOGIN
// ===================================


console.log("ZSwap Firebase Auth Loaded");



import { auth } from "../firebase/firebase.js";


import {
    RecaptchaVerifier,
    signInWithPhoneNumber
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





const loginForm =
document.getElementById("loginForm");


const continueBtn =
document.getElementById("continueBtn");





// Create Firebase Recaptcha

window.recaptchaVerifier =
new RecaptchaVerifier(

    auth,

    "recaptcha-container",

    {

        size: "invisible",

        callback: () => {

            console.log("Recaptcha verified");

        }

    }

);






loginForm.addEventListener("submit", async (e)=>{


e.preventDefault();



const countryCode =
document.getElementById("countryCode").value;



const phoneNumber =
document.getElementById("phoneNumber").value.trim();



const fullPhoneNumber =
countryCode + phoneNumber;





if(phoneNumber.length < 7){

alert("Enter a valid phone number");

return;

}




try{


continueBtn.innerText = "Sending...";

continueBtn.disabled = true;





const confirmationResult =

await signInWithPhoneNumber(

    auth,

    fullPhoneNumber,

    window.recaptchaVerifier

);





// Save phone

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


console.error(error);


alert(error.message);



continueBtn.innerText = "Continue";

continueBtn.disabled = false;



}



});
