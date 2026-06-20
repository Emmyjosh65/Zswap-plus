// ===================================
// ZSWAP PLUS - CHATS WITH ONLINE STATUS
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
getDoc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const userList = document.getElementById("userList");





onAuthStateChanged(auth, async(currentUser)=>{


if(!currentUser){


window.location.href="../auth/login.html";


return;


}




const usersSnapshot = await getDocs(

collection(db,"users")

);



userList.innerHTML = "";





for(const userDoc of usersSnapshot.docs){



const user = userDoc.data();



if(user.uid === currentUser.uid){

continue;

}



const statusSnap = await getDoc(

doc(db,"users",user.uid)

);



const data = statusSnap.data();



const status =
data.online ? "🟢 Online" : "⚫ Offline";





const userCard = document.createElement("div");



userCard.className="user-card";





userCard.innerHTML = `


<div class="avatar">

👤

</div>



<div>

<h3>${user.name}</h3>

<p>${status}</p>

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



}



});
