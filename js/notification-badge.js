// ===================================
// ZSWAP PLUS - NOTIFICATION BADGE
// ===================================


import { auth, db } from "/Zswap-plus/firebase/firebase.js";


import {

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

collection,
query,
where,
onSnapshot

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const badge =
document.getElementById("notificationBadge");





onAuthStateChanged(auth,(user)=>{


if(!user){

return;

}





const notificationsQuery = query(

collection(db,"notifications"),

where("userId","==",user.uid)

);





onSnapshot(notificationsQuery,(snapshot)=>{


const count =
snapshot.size;




if(count > 0){


badge.innerText = count;


badge.style.display = "block";


}


else{


badge.style.display = "none";


}



});



});
