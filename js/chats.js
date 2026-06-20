// ===================================
// ZSWAP PLUS - CHATS WITH PROFILE IMAGE
// ===================================

import { auth, db } from "/Zswap-plus/firebase/firebase.js";

import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
getDocs
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const userList =
document.getElementById("userList");


onAuthStateChanged(auth, async(currentUser)=>{


if(!currentUser){

window.location.href="../auth/login.html";

return;

}



const snapshot =
await getDocs(collection(db,"users"));



userList.innerHTML="";



snapshot.forEach((doc)=>{


const user = doc.data();



if(user.uid === currentUser.uid){

return;

}



const status =
user.online ? "🟢 Online" : "⚫ Offline";



const image =
user.photoURL || "../assets/default-avatar.png";




const card =
document.createElement("div");



card.className="user-card";



card.innerHTML = `

<img

src="${image}"

style="width:50px;height:50px;border-radius:50%;object-fit:cover;"

>


<div>

<h3>${user.name}</h3>

<p>${status}</p>

</div>

`;



card.onclick=()=>{


sessionStorage.setItem(
"chatUserId",
user.uid
);


sessionStorage.setItem(
"chatUserName",
user.name
);


window.location.href="chat.html";


};



userList.appendChild(card);



});



});
