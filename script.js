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

// Modal helpers: open/close and keep the opposite trigger disabled while open
const signUpBtn = document.getElementById('signUp');
const loginBtn = document.getElementById('login');
const modal1 = document.getElementById('id01');
const modal2 = document.getElementById('id02');

function openModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  // show backdrop/modal as flex (CSS centers it)
  m.style.display = 'flex';
  // disable the other trigger button while modal is open
  if(id === 'id01'){
    if(loginBtn) loginBtn.disabled = true;
  } else if(id === 'id02'){
    if(signUpBtn) signUpBtn.disabled = true;
  }
  // focus first input inside modal for better UX
  const firstInput = m.querySelector('input, button, textarea');
  if(firstInput) firstInput.focus();
}

function closeModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  m.style.display = 'none';
  if(id === 'id01'){
    if(loginBtn) loginBtn.disabled = false;
  } else if(id === 'id02'){
    if(signUpBtn) signUpBtn.disabled = false;
  }
}

// clicking the backdrop should close the relevant modal via closeModal
window.addEventListener('click', function (event) {
  if (modal1 && event.target === modal1) {
    closeModal('id01');
  }
  if (modal2 && event.target === modal2) {
    closeModal('id02');
  }
});

// displaying testimonial section if form of slides
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("container");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

