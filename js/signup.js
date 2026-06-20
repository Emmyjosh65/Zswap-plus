// ===================================
// ZSWAP PLUS - SIGNUP WITH FIRESTORE
// ===================================


import { auth, db } from "/Zswap-plus/firebase/firebase.js";


import {
createUserWithEmailAndPassword
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
doc,
setDoc
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const signupForm = document.getElementById("signupForm");



if (signupForm) {


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





try {


// Create Firebase account

const userCredential =

await createUserWithEmailAndPassword(

auth,

email,

password

);



const user = userCredential.user;





// Save user profile

await setDoc(

doc(db, "users", user.uid),

{

name: fullName,

email: email,

uid: user.uid,

createdAt: new Date()

}

);





alert("ZSwap account created successfully");



window.location.href =

"../pages/profile.html";




}

catch(error){


alert(error.message);


}



});


}
