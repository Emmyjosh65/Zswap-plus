import { auth } from "../firebase/firebase.js";

import {
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const form = document.getElementById("loginForm");


window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "loginForm",
    {
        size: "invisible"
    }
);


form.addEventListener("submit", async (e)=>{

    e.preventDefault();


    const country =
    document.getElementById("countryCode").value;


    const phone =
    document.getElementById("phoneNumber").value;


    const fullNumber = country + phone;


    try{

        const confirmation =
        await signInWithPhoneNumber(
            auth,
            fullNumber,
            window.recaptchaVerifier
        );


        window.confirmationResult = confirmation;


        alert("OTP sent successfully");


        window.location.href="verify.html";


    }catch(error){

        alert(error.message);

    }

});
