// ===================================
// ZSWAP PLUS - CONTACTS WITH PROFILE IMAGE
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





for(const contact of contacts){



const contactSnap = await getDoc(

doc(db,"users",contact.uid)

);



const data = contactSnap.data();



const image =

data.photoURL ||

"../assets/default-avatar.png";



const status =

data.online ? "🟢 Online" : "⚫ Offline";





const card = document.createElement("div");



card.className="contact-card";



card.innerHTML = `


<img

src="${image}"

style="width:50px;height:50px;border-radius:50%;object-fit:cover;"

>



<div>

<h3>${contact.name}</h3>

<p>${status}</p>

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



}



}



});
