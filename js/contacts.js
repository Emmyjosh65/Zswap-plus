// ===================================
// ZSWAP PLUS - CONTACTS
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




const contactsBox = document.getElementById("contacts");





onAuthStateChanged(auth, async(user)=>{


if(!user){

window.location.href="../auth/login.html";

return;

}





const userRef = doc(

db,

"users",

user.uid

);



const userSnap = await getDoc(userRef);





if(userSnap.exists()){


const data = userSnap.data();



const contacts = data.contacts || [];



contactsBox.innerHTML = "";





if(contacts.length === 0){


contactsBox.innerHTML =

"No contacts added yet";


return;


}






contacts.forEach((contact)=>{


const card = document.createElement("div");


card.className = "contact-card";



card.innerHTML = `

<div class="avatar">

👤

</div>


<div>

<h3>${contact.name}</h3>

<p>${contact.email}</p>

</div>


<button>

Chat

</button>

`;





card.querySelector("button").onclick = ()=>{


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
