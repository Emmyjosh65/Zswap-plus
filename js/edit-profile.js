// ===================================
// ZSWAP PLUS - EDIT PROFILE
// ===================================


import { auth, db } from "/Zswap-plus/firebase/firebase.js";


import {

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

doc,
getDoc,
updateDoc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const nameInput = document.getElementById("name");

const profileImage = document.getElementById("profileImage");

const saveBtn = document.getElementById("saveBtn");



let userId;

let avatar =
"../assets/default-avatar.png";





onAuthStateChanged(auth, async(user)=>{


if(user){


userId = user.uid;



const userData = await getDoc(

doc(db,"users",user.uid)

);



if(userData.exists()){


const data = userData.data();



nameInput.value = data.name;



if(data.photoURL){

profileImage.src = data.photoURL;

avatar = data.photoURL;

}



}



}

else{


window.location.href="../auth/login.html";


}



});






window.changeAvatar = function(image){


avatar = image;


profileImage.src = image;


}







saveBtn.addEventListener("click", async()=>{


await updateDoc(

doc(db,"users",userId),

{

name:nameInput.value,

photoURL:avatar

}

);



alert("Profile updated successfully");



window.location.href="settings.html";



});
