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
// 5. BOOKING FORM - MULTI-STEP WIZARD
// ====================================

let currentStep = 1;
const totalSteps = 3;

/**
 * Change booking form step
 * @param {number} direction - 1 for next, -1 for previous
 */
function changeStep(direction) {
  const errorDiv = document.getElementById('bookingError');
  
  // Validate current step before moving
  if (direction === 1 && !validateStep(currentStep)) {
    return;
  }
  
  // Clear error on step change
  errorDiv.style.display = 'none';
  
  // Update step
  currentStep += direction;
  
  // Ensure we don't go beyond limits
  if (currentStep < 1) currentStep = 1;
  if (currentStep > totalSteps) currentStep = totalSteps;
  
  showStep(currentStep);
}

/**
 * Display specific step of the booking form
 * @param {number} step - Step number to display (1-3)
 */
function showStep(step) {
  // Hide all steps
  const steps = document.querySelectorAll('.form-step');
  steps.forEach(s => s.classList.remove('active'));
  
  // Show current step
  const currentStepDiv = document.getElementById(`step${step}`);
  if (currentStepDiv) {
    currentStepDiv.classList.add('active');
  }
  
  // Update step indicators
  const indicators = document.querySelectorAll('.step');
  indicators.forEach((indicator, index) => {
    indicator.classList.remove('active');
    if (index < step) {
      indicator.classList.add('completed');
    }
    if (index === step - 1) {
      indicator.classList.add('active');
    }
  });
  
  // Update button visibility
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  if (prevBtn) prevBtn.style.display = step > 1 ? 'inline-block' : 'none';
  if (nextBtn) nextBtn.style.display = step < totalSteps ? 'inline-block' : 'none';
  if (submitBtn) submitBtn.style.display = step === totalSteps ? 'inline-block' : 'none';
  
  // Update review on step 3
  if (step === totalSteps) {
    updateReview();
  }
}

/**
 * Validate current step
 * @param {number} step - Step to validate
 * @returns {boolean} True if valid, false otherwise
 */
function validateStep(step) {
  const errorDiv = document.getElementById('bookingError');
  
  if (step === 1) {
    // Validate personal details
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('bookingEmail').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    if (!fullName) {
      showError('Please enter your full name');
      return false;
    }
    
    if (!email) {
      showError('Please enter your email address');
      return false;
    }
    
    if (!validateEmail(email)) {
      showError('Please enter a valid email address');
      return false;
    }
    
    if (!phone || phone.length < 10) {
      showError('Please enter a valid phone number (at least 10 digits)');
      return false;
    }
  } 
  else if (step === 2) {
    // Validate dates and guests
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    
    if (!checkIn) {
      showError('Please select a check-in date');
      return false;
    }
    
    if (!checkOut) {
      showError('Please select a check-out date');
      return false;
    }
    
    if (!guests) {
      showError('Please select number of guests');
      return false;
    }
    
    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      showError('Check-in date cannot be in the past');
      return false;
    }
    
    if (checkInDate >= checkOutDate) {
      showError('Check-in date must be before check-out date');
      return false;
    }
  }
  
  errorDiv.style.display = 'none';
  return true;
}

/**
 * Update review step with form data
 */
function updateReview() {
  document.getElementById('reviewName').textContent = document.getElementById('fullName').value || '-';
  document.getElementById('reviewEmail').textContent = document.getElementById('bookingEmail').value || '-';
  document.getElementById('reviewPhone').textContent = document.getElementById('phone').value || '-';
  
  const checkInDate = document.getElementById('checkIn').value;
  const checkOutDate = document.getElementById('checkOut').value;
  
  if (checkInDate) {
    const date = new Date(checkInDate);
    document.getElementById('reviewCheckIn').textContent = date.toLocaleDateString() || '-';
  }
  
  if (checkOutDate) {
    const date = new Date(checkOutDate);
    document.getElementById('reviewCheckOut').textContent = date.toLocaleDateString() || '-';
  }
  
  document.getElementById('reviewGuests').textContent = document.getElementById('guests').value || '-';
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
  const errorDiv = document.getElementById('bookingError');
  if (errorDiv) {
    errorDiv.textContent = '❌ ' + message;
    errorDiv.style.display = 'block';
  }
}

/**
 * Validate dates for real-time feedback
 */
function validateDates() {
  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  
  if (!checkInInput || !checkOutInput) return;
  
  const checkInDate = new Date(checkInInput.value);
  const checkOutDate = new Date(checkOutInput.value);
  
  if (checkInDate > checkOutDate && checkOutInput.value) {
    showError('Check-in date cannot be after check-out date');
    return false;
  }
  
  document.getElementById('bookingError').style.display = 'none';
  return true;
}

/**
 * Submit booking form
 * @param {Event} e - Form submit event
 * @returns {boolean} False to prevent page reload
 */
function submitBooking(e) {
  e.preventDefault();
  
  const fullName = document.getElementById('fullName').value.trim();
  
  // Final validation
  if (validateStep(1) && validateStep(2)) {
    alert(`Thank you, ${fullName}! Your booking request has been received. We will confirm your reservation shortly.`);
    
    // Reset form
    document.getElementById('bookingForm').reset();
    currentStep = 1;
    showStep(1);
    
    closeModal('id03');
  }
  
  return false;
}

/**
 * Initialize booking form
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add click handlers to all Book Now buttons
  const bookingButtons = document.querySelectorAll('button[id="booking"]');
  bookingButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      currentStep = 1;
      showStep(1);
      openModal('id03');
      
      const roomCard = this.closest('.bookRoom');
      if (roomCard) {
        const roomTitle = roomCard.querySelector('#room-title').textContent;
        console.log('Booking:', roomTitle);
      }
    });
  });

  // Set minimum check-in date to today
  const today = new Date().toISOString().split('T')[0];
  const checkInInput = document.getElementById('checkIn');
  const checkOutInput = document.getElementById('checkOut');
  
  if (checkInInput) checkInInput.min = today;
  if (checkOutInput) checkOutInput.min = today;
  
  // Setup form submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', submitBooking);
  }
  
  // Initialize first step
  showStep(1);
});

// ====================================
// 6. CONTACT FORM VALIDATION
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
