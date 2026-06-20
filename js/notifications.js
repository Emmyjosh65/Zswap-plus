// ===================================
// ZSWAP PLUS - NOTIFICATIONS
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
orderBy,
onSnapshot

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const notificationsBox =
document.getElementById("notifications");





onAuthStateChanged(auth,(user)=>{


if(!user){

window.location.href="../auth/login.html";

return;

}





const notificationsQuery = query(

collection(db,"notifications"),

where("userId","==",user.uid),

orderBy("createdAt","desc")

);





onSnapshot(notificationsQuery,(snapshot)=>{


notificationsBox.innerHTML="";





if(snapshot.empty){


notificationsBox.innerHTML =

`

<p class="empty">

No notifications yet

</p>

`;

return;

}





snapshot.forEach((doc)=>{


const data = doc.data();



const card =
document.createElement("div");



card.className =
"notification-card";



card.innerHTML = `

<h3>

${data.title}

</h3>


<p>

${data.message}

</p>

`;



notificationsBox.appendChild(card);



});



});



});
