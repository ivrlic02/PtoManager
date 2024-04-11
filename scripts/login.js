//regex is implemented and specified trough HTML (login.html)

//function to sign in
function signInConfirm() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    //check is user signed in
    if(document.cookie){
        email.value = "";
        password.value = "";
        window.alert("User is already signed in.")
        return 0;
    } else {
        setCookie(email.value);
        email.value = "";
        password.value = "";
        return 0;
    }
}
 //fuction to set a cookie
function setCookie(value) {
    const date = new Date();
    date.setTime(date.getTime() + 60 * 60 * 1000); //1hour 
    //set the cookie with the user's email value and expiration time
    document.cookie = "user = " + value + "; expires = " + date.toUTCString() + "; Path=/";
}