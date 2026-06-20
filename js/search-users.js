// ===================================
// ZSWAP PLUS - SEARCH USERS + CONTACT NOTIFICATIONS
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

arrayUnion,

addDoc,

serverTimestamp

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const searchInput =
document.getElementById("searchInput");


const results =
document.getElementById("results");



let allUsers = [];

let currentUser = null;







onAuthStateChanged(auth, async(user)=>{


if(!user){


window.location.href="../auth/login.html";


return;


}



currentUser = user;




const snapshot = await getDocs(

collection(db,"users")

);




allUsers = [];



snapshot.forEach((docSnap)=>{


const data = docSnap.data();



if(data.uid !== user.uid){


allUsers.push(data);


}



});



});








searchInput.addEventListener("input",()=>{


const value =

searchInput.value.toLowerCase();



results.innerHTML = "";





const filtered = allUsers.filter((user)=>{


return (

user.name.toLowerCase().includes(value)

||

user.email.toLowerCase().includes(value)

);


});






filtered.forEach((user)=>{



const card =

document.createElement("div");



card.className =

"user-card";





const image =

user.photoURL ||

"../assets/default-avatar.png";





card.innerHTML = `


<img

src="${image}"

style="width:50px;height:50px;border-radius:50%;object-fit:cover;"

>



<div>

<h3>

${user.name}

</h3>


<p>

${user.email}

</p>


</div>



<button class="addBtn">

Add

</button>


`;






card.querySelector(".addBtn")

.onclick = async()=>{



try{



// Add contact to current user's contacts


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







// Send notification to searched user


await addDoc(

collection(db,"notifications"),

{


userId:user.uid,


title:"New Contact Request",


message:

currentUser.email + " added you as a contact",


createdAt:serverTimestamp()


}

);





alert("Contact added successfully");



}



catch(error){


alert(error.message);


}



};







results.appendChild(card);



});



});
