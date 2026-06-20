// ===================================
// ZSWAP PLUS - CREATE STATUS WITH EXPIRY
// ===================================


import { auth, db } from "/Zswap-plus/firebase/firebase.js";


import {

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

collection,
addDoc,
serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const statusText =
document.getElementById("statusText");


const postBtn =
document.getElementById("postBtn");



let currentUser = null;



onAuthStateChanged(auth,(user)=>{


if(!user){

window.location.href="../auth/login.html";

return;

}


currentUser = user;


});






postBtn.addEventListener("click", async()=>{


const text = statusText.value.trim();



if(text === ""){

alert("Write something first");

return;

}




try{


const now = new Date();


// 24 hours later

const expiry = new Date(

now.getTime() + 24 * 60 * 60 * 1000

);





await addDoc(

collection(db,"statuses"),

{


userId:currentUser.uid,


name:

currentUser.email.split("@")[0],


text:text,


createdAt:serverTimestamp(),


expiresAt:expiry,


views:[],


reactions:{


"❤️":0,


"😂":0,


"🔥":0,


"👍":0


}



}

);





alert("Status posted");


statusText.value="";


window.location.href="status.html";


}



catch(error){


alert(error.message);


}



});
