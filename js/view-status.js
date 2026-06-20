// ===================================
// ZSWAP PLUS - STATUS VIEWS
// ===================================


import { auth, db } from "/Zswap-plus/firebase/firebase.js";


import {

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

doc,
updateDoc,
arrayUnion

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





let currentUser = null;




onAuthStateChanged(auth,(user)=>{


if(user){

currentUser = user;

}


});






export async function addStatusView(statusId){



if(!currentUser){

return;

}





await updateDoc(

doc(db,"statuses",statusId),

{


views: arrayUnion(currentUser.uid)


}

);



}
