"use strict";
function showGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return 'Good Morning,';
  } 
  else if (hour >= 12 && hour < 18) {
     return 'Good Afternoon,';
  }
   else if (hour >= 18 && hour < 22) {
    return 'Good Evening,';
  }
   else {
   return 'Good Night,';
  }
}
 var welcome = document.getElementById('greeting');
welcome.innerHTML=showGreeting() + " welcome to our hotel,Enjoy your special occassion here";

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var modal = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//handling user input which is not same for password in sign up for
function validate(){
var password1=document.getElementById('password').value
var password2=document.getElementById('repeatPassword').value
var errorText=document.getElementById('errorMessage');
errorText.innerHTML=" ";
try {
  if(password1!==password2)  throw "password not matched";
  if (password1&password2=="") throw "All field must be filled";
}
catch(err){
  errorText.innerHTML= err;
}
}

