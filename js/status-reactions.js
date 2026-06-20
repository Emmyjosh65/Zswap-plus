// ===================================
// ZSWAP PLUS - STATUS REACTIONS
// ===================================


import { db } from "/Zswap-plus/firebase/firebase.js";


import {

doc,
updateDoc,
increment

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





export async function addReaction(statusId, emoji){


const statusRef = doc(

db,

"statuses",

statusId

);




await updateDoc(

statusRef,

{


[`reactions.${emoji}`]:

increment(1)


}

);



}
