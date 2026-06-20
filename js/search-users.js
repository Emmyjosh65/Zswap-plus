// ===================================
// ZSWAP PLUS - SEARCH USERS
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





const searchInput = document.getElementById("searchInput");

const results = document.getElementById("results");


let allUsers = [];

let currentUserId;





onAuthStateChanged(auth, async(user)=>{


if(!user){

window.location.href="../auth/login.html";

return;

}


currentUserId = user.uid;


const snapshot = await getDocs(

collection(db,"users")

);



allUsers = [];



snapshot.forEach((doc)=>{


const data = doc.data();



if(data.uid !== currentUserId){

allUsers.push(data);

}


});



});






searchInput.addEventListener("input",()=>{


const value = searchInput.value.toLowerCase();



results.innerHTML = "";



const filtered = allUsers.filter((user)=>{


return (

user.name.toLowerCase().includes(value)

||

user.email.toLowerCase().includes(value)

);


});





filtered.forEach((user)=>{



const card = document.createElement("div");



card.className = "user-card";



card.innerHTML = `

<div class="avatar">

👤

</div>


<div>

<h3>${user.name}</h3>

<p>${user.email}</p>

</div>


<button>

Chat

</button>

`;





card.querySelector("button").onclick = ()=>{


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





results.appendChild(card);



});



});
