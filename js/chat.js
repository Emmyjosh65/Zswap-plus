// ===================================
// ZSWAP PLUS - CHAT WITH SEEN STATUS
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
orderBy,
onSnapshot,
serverTimestamp,
doc,
updateDoc
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const messagesBox =
document.getElementById("messages");

const messageInput =
document.getElementById("messageInput");

const sendBtn =
document.getElementById("sendBtn");


const chatName =
document.getElementById("chatName");



const receiverId =
sessionStorage.getItem("chatUserId");


const receiverName =
sessionStorage.getItem("chatUserName");


chatName.innerText =
receiverName || "Chat";



let currentUserId;



onAuthStateChanged(auth,(user)=>{


if(!user){

window.location.href="../auth/login.html";

return;

}


currentUserId = user.uid;

loadMessages();


});





function loadMessages(){


const messagesQuery = query(

collection(db,"messages"),

orderBy("createdAt","asc")

);



onSnapshot(messagesQuery,(snapshot)=>{


messagesBox.innerHTML="";



snapshot.forEach(async(docSnap)=>{


const msg = docSnap.data();



if(

(msg.senderId === currentUserId &&
msg.receiverId === receiverId)

||

(msg.senderId === receiverId &&
msg.receiverId === currentUserId)

){



if(msg.receiverId === currentUserId && !msg.seen){


await updateDoc(

doc(db,"messages",docSnap.id),

{

seen:true

}

);


}




const div =
document.createElement("div");



div.className="message";



if(msg.senderId === currentUserId){


div.classList.add("my-message");


}





div.innerHTML = `

${msg.text}

<br>

<small>

${msg.senderId === currentUserId

?

(msg.seen ? "✓✓ Seen" : "✓ Sent")

:

""

}

</small>

`;





messagesBox.appendChild(div);



}



});



messagesBox.scrollTop =
messagesBox.scrollHeight;



});



}






sendBtn.addEventListener("click",async()=>{


const text =
messageInput.value.trim();



if(text==="") return;



await addDoc(

collection(db,"messages"),

{

senderId:currentUserId,

receiverId:receiverId,

text:text,

seen:false,

createdAt:serverTimestamp()

}

);



messageInput.value="";


});
