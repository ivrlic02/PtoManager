const login = document.getElementById("signin");

//function to check if the user is logged in
function loginChecker() {
    const isLogedIn = document.cookie ? true : false;
  
    if (isLogedIn) {
      login.innerHTML = 'Sign out';
    } else {
      const container = document.getElementById("main_container"); 
      container.innerHTML = '<p id="warning">Data unavaible for guest user.<br>Please sign in to see data.</p>';
    }
}

loginChecker();
login.addEventListener("click", logOut);

//function to log out the user
function logOut() {
  //expire the user cookie to log out
  document.cookie = "user = ; expires = 11 Sep 2001 00:00:00 UTC; Path=/";
  //check if user is successfully logged out
  const isLogedOut = document.cookie ? false : true;

  if (isLogedOut) {
    login.innerHTML = '<a href="/pages/login.html" id="signin">Sign in</a>';
    location.reload();
  }
}