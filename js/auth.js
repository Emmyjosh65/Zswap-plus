// ===================================
// ZSWAP PLUS - EMAIL PASSWORD LOGIN
// ===================================


import { auth } from "/Zswap-plus/firebase/firebase.js";


import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";





const loginForm = document.getElementById("loginForm");

const button = document.getElementById("loginBtn");





loginForm.addEventListener("submit", async (e)=>{


e.preventDefault();




const email =

document.getElementById("email").value.trim();



const password =

document.getElementById("password").value.trim();





if(password.length < 6){

alert("Password must be at least 6 characters");

return;

}





try{


button.innerText = "Loading...";



// Try login first

await signInWithEmailAndPassword(

auth,

email,

password

);



alert("Login successful");


window.location.href =
"../pages/profile.html";



}



catch(error){



// If account does not exist, create one

if(error.code === "auth/user-not-found"){



try{


await createUserWithEmailAndPassword(

auth,

email,

password

);



alert("Account created successfully");


window.location.href =
"../pages/profile.html";



}

catch(createError){

alert(createError.message);

}


}



else{


alert(error.message);


}



}



button.innerText = "Continue";



});
