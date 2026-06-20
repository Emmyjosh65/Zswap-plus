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





// Save login details

sessionStorage.setItem(

"zswapEmail",

email

);




sessionStorage.setItem(

"zswapName",

email.split("@")[0]

);





alert("Login successful");





// Go to ZSwap Plus home page

window.location.href =

"../pages/home.html";





}


catch(error){


alert(error.message);


}



});
