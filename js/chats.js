// ===================================
// ZSWAP PLUS - CHATS WITH PROFILE DATA
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
updateDoc

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






const snapshot = await getDocs(

collection(db,"users")

);






userList.innerHTML = "";







snapshot.forEach(async(userDoc)=>{



const user = userDoc.data();





if(user.uid === currentUser.uid){

return;

}





const image =

user.photoURL ||

"../assets/default-avatar.png";






const name =

user.name ||

"User";





const username =

user.username

?

"@" + user.username

:

"";






const status =

user.online

?

"🟢 Online"

:

"⚫ Offline";






const card =

document.createElement("div");





card.className="user-card";






card.innerHTML = `



<img

src="${image}"

class="avatar"



>



<div class="user-info">



<div class="username">

${name}

</div>



<div class="email">

${username}

</div>



<div class="online">

${status}

</div>



</div>



`;








card.onclick = ()=>{





sessionStorage.setItem(

"chatUserId",

user.uid

);





sessionStorage.setItem(

"chatUserName",

name

);





sessionStorage.setItem(

"chatUserImage",

image

);





window.location.href="chat.html";



};






userList.appendChild(card);





});



});
