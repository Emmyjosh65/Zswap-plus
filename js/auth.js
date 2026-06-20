// ===================================
// ZSWAP PLUS FIREBASE PHONE LOGIN
// ===================================


alert("AUTH FILE LOADED");


import { auth } from "/Zswap-plus/firebase/firebase.js";


import {

RecaptchaVerifier,

signInWithPhoneNumber

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





const loginForm = document.getElementById("loginForm");

const button = document.getElementById("continueBtn");





window.recaptchaVerifier = new RecaptchaVerifier(

auth,

"recaptcha-container",

{

size:"normal"

}

);





loginForm.addEventListener("submit", async(e)=>{


e.preventDefault();



console.log("Continue clicked");



const code =

document.getElementById("countryCode").value;



const phone =

document.getElementById("phoneNumber").value.trim();



const fullNumber = code + phone;




if(phone.length < 7){

alert("Enter a valid phone number");

return;

}




try{


button.innerText="Sending...";



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



window.location.href="verify.html";



}

catch(error){


console.error(error);


alert(error.message);



button.innerText="Continue";


}



});
