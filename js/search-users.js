// ===================================
// ZSWAP PLUS - SEARCH + ADD CONTACTS
// ===================================

import { auth, db } from "/Zswap-plus/firebase/firebase.js";

import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
collection,
getDocs,
doc,
updateDoc,
arrayUnion
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const searchInput =
document.getElementById("searchInput");

const results =
document.getElementById("results");


let allUsers = [];

let currentUser;



onAuthStateChanged(auth, async(user)=>{


if(!user){

window.location.href="../auth/login.html";

return;

}


currentUser = user;



const snapshot = await getDocs(
collection(db,"users")
);



snapshot.forEach((doc)=>{


const data = doc.data();


if(data.uid !== user.uid){

allUsers.push(data);

}


});


});





searchInput.addEventListener("input",()=>{


const value =
searchInput.value.toLowerCase();


results.innerHTML="";



allUsers.filter(user=>

user.name.toLowerCase().includes(value)

||

user.email.toLowerCase().includes(value)

).forEach(user=>{


const card =
document.createElement("div");


card.className="user-card";



card.innerHTML=`

<div class="avatar">
👤
</div>

<div>

<h3>${user.name}</h3>

<p>${user.email}</p>

</div>

<button class="addBtn">
Add
</button>

`;




card.querySelector(".addBtn")
.onclick = async()=>{


await updateDoc(

doc(db,"users",currentUser.uid),

{

contacts: arrayUnion({

uid:user.uid,

name:user.name,

email:user.email

})

}

);


alert("Contact added");


};



results.appendChild(card);



});


});
