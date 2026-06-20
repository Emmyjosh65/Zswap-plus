document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    const country = document.getElementById("countryCode").value;
    const phone = document.getElementById("phoneNumber").value;

    if(phone.length < 7){
        alert("Enter a valid phone number");
        return;
    }

    // Save temporarily
    localStorage.setItem("zswapPhone", country + phone);

    // Go to verification page
    window.location.href = "verify.html";

});
