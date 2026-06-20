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





const nameInput =
document.getElementById("name");


const usernameInput =
document.getElementById("username");


const bioInput =
document.getElementById("bio");


const saveBtn =
document.getElementById("saveBtn");





let userId = null;







onAuthStateChanged(auth, async(user)=>{


if(!user){


window.location.href="../auth/login.html";


return;


}



userId = user.uid;





const userRef = doc(

db,

"users",

user.uid

);





const snap = await getDoc(userRef);





if(snap.exists()){


const data = snap.data();



nameInput.value =

data.name || "";



usernameInput.value =

data.username || "";



bioInput.value =

data.bio || "";



}



});








saveBtn.addEventListener("click", async()=>{



try{



await updateDoc(

doc(db,"users",userId),

{


name:nameInput.value.trim(),


username:usernameInput.value.trim(),


bio:bioInput.value.trim()


}

);





alert("Profile updated successfully");



window.location.href="settings.html";



}



catch(error){


alert(error.message);


}



});
