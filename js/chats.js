// ===================================
// ZSWAP PLUS - LOAD USERS FOR CHATS
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





const userList = document.getElementById("userList");





onAuthStateChanged(auth, async(currentUser)=>{


if(!currentUser){


window.location.href="../auth/login.html";


return;


}





try{


const usersSnapshot = await getDocs(

collection(db,"users")

);



userList.innerHTML = "";





usersSnapshot.forEach((userDoc)=>{


const user = userDoc.data();





// Don't show yourself

if(user.uid === currentUser.uid){

return;

}





const userCard = document.createElement("div");



userCard.className = "user-card";





userCard.innerHTML = `

<div class="avatar">

👤

</div>


<div>

<h3>${user.name}</h3>

<p>${user.email}</p>

</div>

`;





userCard.onclick = ()=>{


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





userList.appendChild(userCard);



});





if(userList.innerHTML === ""){


userList.innerHTML =

"<p>No other users found</p>";


}



}


catch(error){


userList.innerHTML = error.message;


}



});
