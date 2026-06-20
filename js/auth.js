alert("ZSwap auth.js is running");
// ===================================
// ZSWAP PLUS - FIREBASE PHONE LOGIN
// ===================================

console.log("ZSwap Auth Loaded");


import { auth } from "../firebase/firebase.js";


import {
    RecaptchaVerifier,
    signInWithPhoneNumber
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const loginForm = document.getElementById("loginForm");

const continueBtn = document.getElementById("continueBtn");




// Visible Recaptcha for testing

window.recaptchaVerifier = new RecaptchaVerifier(

    auth,

    "recaptcha-container",

    {

        size: "normal"

    }

);




loginForm.addEventListener("submit", async (e)=>{


    e.preventDefault();



    console.log("Continue clicked");



    const countryCode =
    document.getElementById("countryCode").value;



    const phoneNumber =
    document.getElementById("phoneNumber").value.trim();



    const fullNumber =
    countryCode + phoneNumber;



    if(phoneNumber.length < 7){

        alert("Enter a valid phone number");

        return;

    }



    try{


        continueBtn.innerText = "Sending...";



        const confirmationResult =

        await signInWithPhoneNumber(

            auth,

            fullNumber,

            window.recaptchaVerifier

        );



        sessionStorage.setItem(

            "verificationId",

            confirmationResult.verificationId

        );



        sessionStorage.setItem(

            "zswapPhone",

            fullNumber

        );



        alert("OTP sent successfully");



        window.location.href =
        "verify.html";



    }



    catch(error){


        console.error(error);


        alert(error.message);



        continueBtn.innerText =
        "Continue";


    }



});
