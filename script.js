"use strict";

/**
 * VISION HOTEL - WEBSITE JAVASCRIPT
 * Main functionality for hotel booking website
 */

// ====================================
// 1. GREETING & HOME PAGE
// ====================================

/**
 * Toggle mobile navigation menu
 */
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  
  if (navMenu && hamburger) {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  }
}

/**
 * Close mobile menu when a link is clicked
 */
document.addEventListener('click', function(event) {
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  
  if (navMenu && hamburger) {
    // Check if click is on a nav link
    if (event.target.closest('#navMenu a')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  }
});

/**
 * Show dynamic greeting based on current time
 * @returns {string} Greeting message (Good Morning/Afternoon/Evening/Night)
 */
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

// Display welcome greeting on page load
const welcome = document.getElementById('greeting');
if (welcome) {
  welcome.innerHTML = showGreeting() + " welcome to Vision Hotel, Enjoy your special occasion here";
}

// ====================================
// 2. MODAL DIALOG MANAGEMENT
// ====================================

/**
 * Get modal elements
 */
const modal1 = document.getElementById('id01'); // Sign Up modal
const modal2 = document.getElementById('id02'); // Login modal

/**
 * Open modal dialog with smooth display
 * @param {string} id - Modal element ID
 */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  
  // Show modal as flex for proper centering
  modal.style.display = 'flex';
  
  // Focus on first input for better UX
  const firstInput = modal.querySelector('input, textarea');
  if (firstInput) firstInput.focus();
}

/**
 * Close modal dialog
 * @param {string} id - Modal element ID
 */
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  
  modal.style.display = 'none';
}

/**
 * Close modal when clicking outside (backdrop)
 */
window.addEventListener('click', function (event) {
  if (modal1 && event.target === modal1) {
    closeModal('id01');
  }
  if (modal2 && event.target === modal2) {
    closeModal('id02');
  }
});

// ====================================
// 3. TESTIMONIALS CAROUSEL
// ====================================

let currentSlideIndex = 1;
let carouselInterval;

/**
 * Navigate carousel slides
 * @param {number} n - Number of slides to move (positive or negative)
 */
function changeSlide(n) {
  clearInterval(carouselInterval); // Stop auto-rotation
  showSlide(currentSlideIndex += n);
  startAutoCarousel(); // Resume auto-rotation
}

/**
 * Jump to specific slide
 * @param {number} n - Slide number to display
 */
function currentSlide(n) {
  clearInterval(carouselInterval);
  showSlide(currentSlideIndex = n);
  startAutoCarousel();
}

/**
 * Display specific slide and update dots
 * @param {number} n - Slide number
 */
function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dots-container .dot');
  
  // Handle slide overflow
  if (n > slides.length) { currentSlideIndex = 1; }
  if (n < 1) { currentSlideIndex = slides.length; }
  
  // Hide all slides
  slides.forEach(slide => slide.style.display = 'none');
  
  // Remove active class from all dots
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Show current slide
  if (slides[currentSlideIndex - 1]) {
    slides[currentSlideIndex - 1].style.display = 'block';
  }
  
  // Highlight current dot
  if (dots[currentSlideIndex - 1]) {
    dots[currentSlideIndex - 1].classList.add('active');
  }
}

/**
 * Auto-advance to next slide
 */
function autoSlide() {
  showSlide(++currentSlideIndex);
}

/**
 * Start automatic carousel rotation (5 seconds interval)
 */
function startAutoCarousel() {
  carouselInterval = setInterval(autoSlide, 5000);
}

/**
 * Initialize carousel on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlideIndex);
  startAutoCarousel();
});

// ====================================
// 4. SCROLL TO TOP BUTTON
// ====================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

/**
 * Show/hide scroll-to-top button based on scroll position
 */
if (scrollTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
}

/**
 * Smooth scroll to top of page
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ====================================
// 5. CONTACT FORM VALIDATION
// ====================================

/**
 * Validate and submit contact form
 * @returns {boolean} True if validation passes, false otherwise
 */
function validateContactForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Check if all fields are filled
  if (!name || !email || !subject || !message) {
    alert('Please fill in all fields');
    return false;
  }

  // Validate email format
  if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return false;
  }

  // Show success message
  alert('Thank you for your message! We will get back to you soon.');
  return true;
}

/**
 * Validate email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format, false otherwise
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ====================================
// 6. SMOOTH SCROLL NAVIGATION
// ====================================

/**
 * Add smooth scroll behavior to all anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
