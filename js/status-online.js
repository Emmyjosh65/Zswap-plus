// ===================================
// ZSWAP PLUS - ONLINE STATUS
// ===================================

import { auth, db } from "/Zswap-plus/firebase/firebase.js";


import {

onAuthStateChanged,

signOut

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

doc,

updateDoc,

serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





onAuthStateChanged(auth, async(user)=>{


if(user){


const userRef = doc(

db,

"users",

user.uid

);



await updateDoc(

userRef,

{

online:true,

lastSeen:serverTimestamp()

}

);



window.addEventListener(

"beforeunload",

async()=>{


await updateDoc(

userRef,

{

online:false,

lastSeen:serverTimestamp()

}

);


}

);



}



});
