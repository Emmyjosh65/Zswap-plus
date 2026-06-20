// ===============================
// ZSWAP PLUS APP
// ===============================

console.log("ZSwap Plus Loaded");

// Welcome animation
window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    setTimeout(() => {
        document.body.style.transition = "0.5s";
        document.body.style.opacity = "1";
    }, 100);

});

// Feature cards hover effect

const cards =
document.querySelectorAll(".feature-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-5px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

// Future ZSwap Notifications

function showNotification(message){

    alert(message);

}
