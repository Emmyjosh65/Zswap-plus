// ===================================
// ZSWAP PLUS - CONTACTS WITH ONLINE STATUS
// ===================================

import { auth, db } from "/Zswap-plus/firebase/firebase.js";

import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
getDoc
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const contactsBox =
document.getElementById("contacts");



onAuthStateChanged(auth, async(user)=>{


if(!user){

window.location.href="../auth/login.html";

return;

}



const userSnap = await getDoc(

doc(db,"users",user.uid)

);



if(userSnap.exists()){


const contacts =
userSnap.data().contacts || [];



contactsBox.innerHTML="";



if(contacts.length === 0){

contactsBox.innerHTML =
"No contacts added yet";

return;

}



contacts.forEach(async(contact)=>{



const contactSnap = await getDoc(

doc(db,"users",contact.uid)

);



const data = contactSnap.data();



const online =
data.online ? "🟢 Online" : "⚫ Offline";



const card =
document.createElement("div");



card.className="contact-card";



card.innerHTML=`

<div class="avatar">
👤
</div>


<div>

<h3>${contact.name}</h3>

<p>${online}</p>

</div>


<button>
Chat
</button>

`;



card.querySelector("button").onclick=()=>{


sessionStorage.setItem(
"chatUserId",
contact.uid
);


sessionStorage.setItem(
"chatUserName",
contact.name
);


window.location.href="chat.html";


};



contactsBox.appendChild(card);



});



}


});
