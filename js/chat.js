// ===================================
// ZSWAP PLUS - FIRESTORE CHAT
// ===================================


import { auth, db } from "/Zswap-plus/firebase/firebase.js";


import {

onAuthStateChanged

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

collection,
addDoc,
query,
where,
orderBy,
onSnapshot,
serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const messagesBox = document.getElementById("messages");

const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

const chatName = document.getElementById("chatName");





const receiverId = sessionStorage.getItem("chatUserId");

const receiverName = sessionStorage.getItem("chatUserName");





chatName.innerText = receiverName || "Chat";





onAuthStateChanged(auth,(user)=>{


if(!user){

window.location.href="../auth/login.html";

return;

}



loadMessages(user.uid);


});





function loadMessages(userId){


const messagesQuery = query(

collection(db,"messages"),

orderBy("createdAt","asc")

);



onSnapshot(messagesQuery,(snapshot)=>{


messagesBox.innerHTML = "";



snapshot.forEach((doc)=>{


const msg = doc.data();



if(

(msg.senderId === userId && msg.receiverId === receiverId)

||

(msg.senderId === receiverId && msg.receiverId === userId)

){



const div = document.createElement("div");



div.className = "message";



if(msg.senderId === userId){

div.classList.add("my-message");

}



div.innerText = msg.text;



messagesBox.appendChild(div);



}



});



messagesBox.scrollTop = messagesBox.scrollHeight;



});



}






sendBtn.addEventListener("click", async()=>{


const text = messageInput.value.trim();



if(text === "") return;



const user = auth.currentUser;



await addDoc(

collection(db,"messages"),

{

senderId:user.uid,

receiverId:receiverId,

text:text,

createdAt:serverTimestamp()

}

);



messageInput.value = "";


});
