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





if (!loginForm) {

    console.error("Login form not found");

}





// Setup Firebase Recaptcha

window.recaptchaVerifier = new RecaptchaVerifier(

    auth,

    "recaptcha-container",

    {

        size: "invisible"

    }

);





loginForm.addEventListener("submit", async (event)=>{


    event.preventDefault();



    console.log("Continue button clicked");



    const countryCode =
    document.getElementById("countryCode").value;



    const phoneNumber =
    document.getElementById("phoneNumber").value.trim();



    const fullPhoneNumber =
    countryCode + phoneNumber;




    if(phoneNumber.length < 7){

        alert("Please enter a valid phone number");

        return;

    }





    try{


        if(continueBtn){

            continueBtn.innerText = "Sending OTP...";

            continueBtn.disabled = true;

        }





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





        console.log("OTP sent");



        alert("OTP sent successfully");





        window.location.href =
        "verify.html";



    }



    catch(error){


        console.error(
            "Firebase Error:",
            error
        );


        alert(error.message);



        if(continueBtn){

            continueBtn.innerText = "Continue";

            continueBtn.disabled = false;

        }


    }



});
