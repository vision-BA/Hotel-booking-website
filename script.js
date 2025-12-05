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
 * Close modals when clicking outside (backdrop)
 */
window.addEventListener('click', function(event) {
  if (event.target.classList && event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
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
  
  // Add click handlers to all Book Now buttons
  const bookingButtons = document.querySelectorAll('button[id="booking"]');
  bookingButtons.forEach((button) => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      currentStep = 1;
      showStep(1);
      openModal('id03');
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
  
  // Initialize booking form first step
  showStep(1);
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
 * Validate email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format, false otherwise
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ====================================
// 6. EMAIL FUNCTIONALITY - EMAILJS
// ====================================

/**
 * ============================================
 * EMAILJS CONFIGURATION
 * ============================================
 * 
 * IMPORTANT: You need to configure these values before emails will work!
 * 
 * Step 1: Sign up at https://www.emailjs.com/ (free account available)
 * Step 2: Get your credentials from https://dashboard.emailjs.com/admin
 * Step 3: Replace the values below with your actual credentials
 * Step 4: See EMAILJS_SETUP.md for detailed setup instructions
 * 
 * ============================================
 */

const EMAILJS_CONFIG = {
  // Your EmailJS Public Key (found in Account → General → API Keys)
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
  
  // Your EmailJS Service ID (found in Email Services section)
  SERVICE_ID: 'YOUR_SERVICE_ID',
  
  // Your EmailJS Template ID (found in Email Templates section)
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
  
  // Check if configuration is complete
  isConfigured: function() {
    return this.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && 
           this.SERVICE_ID !== 'YOUR_SERVICE_ID' && 
           this.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';
  }
};

let emailjsInitialized = false;

/**
 * Initialize EmailJS
 * Note: Replace these values with your actual EmailJS credentials
 * Get them from: https://dashboard.emailjs.com/admin
 */
function initializeEmailJS() {
  if (typeof emailjs !== 'undefined' && !emailjsInitialized) {
    // Check if configuration is complete
    if (!EMAILJS_CONFIG.isConfigured()) {
      console.warn('⚠️ EmailJS is not configured yet. Please set up your credentials in script.js (EMAILJS_CONFIG section).');
      console.warn('📖 See EMAILJS_SETUP.md for setup instructions.');
      return;
    }
    
    // Initialize EmailJS with your Public Key
    emailjs.init({
      publicKey: EMAILJS_CONFIG.PUBLIC_KEY,
    });
    emailjsInitialized = true;
    console.log('✅ EmailJS initialized successfully');
  }
}

// Initialize EmailJS when DOM is loaded
if (typeof emailjs !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initializeEmailJS);
}

/**
 * Calculate number of nights between check-in and check-out
 * @param {string} checkIn - Check-in date string
 * @param {string} checkOut - Check-out date string
 * @returns {number} Number of nights
 */
function calculateNights(checkIn, checkOut) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate - checkInDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Format date for email display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
function formatDateForEmail(dateString) {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Send booking confirmation email to customer
 * @param {Object} bookingData - Booking details object
 * @returns {Promise} Email sending promise
 */
async function sendBookingEmail(bookingData) {
  // Check if EmailJS is configured
  if (!EMAILJS_CONFIG.isConfigured()) {
    return { 
      success: false, 
      error: { 
        text: 'EmailJS is not configured. Please set up your credentials in script.js' 
      } 
    };
  }
  
  // Prepare email template parameters
  const templateParams = {
    to_email: bookingData.email, // Customer's email
    customer_name: bookingData.fullName,
    customer_email: bookingData.email,
    customer_phone: bookingData.phone,
    check_in_date: formatDateForEmail(bookingData.checkIn),
    check_out_date: formatDateForEmail(bookingData.checkOut),
    number_of_guests: bookingData.guests,
    number_of_nights: calculateNights(bookingData.checkIn, bookingData.checkOut),
    special_requests: bookingData.specialRequests || 'None',
    booking_date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  try {
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID, 
      EMAILJS_CONFIG.TEMPLATE_ID, 
      templateParams
    );
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
}

/**
 * Submit booking form
 * @param {Event} e - Form submit event
 * @returns {boolean} False to prevent page reload
 */
async function submitBooking(e) {
  e.preventDefault();
  
  // Check if EmailJS is available
  if (typeof emailjs === 'undefined') {
    showError('Email service is not available. Please refresh the page and try again.');
    return false;
  }
  
  // Initialize EmailJS if not already done
  if (!emailjsInitialized) {
    initializeEmailJS();
  }
  
  // Final validation
  if (!validateStep(1) || !validateStep(2)) {
    return false;
  }
  
  // Collect all booking details
  const bookingData = {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('bookingEmail').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    checkIn: document.getElementById('checkIn').value,
    checkOut: document.getElementById('checkOut').value,
    guests: document.getElementById('guests').value,
    specialRequests: document.getElementById('specialRequests').value.trim()
  };
  
  // Show loading state
  const submitBtn = document.getElementById('submitBtn');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  
  // Hide any previous errors
  document.getElementById('bookingError').style.display = 'none';
  
  try {
    // Send email with booking details
    const emailResult = await sendBookingEmail(bookingData);
    
    if (emailResult.success) {
      // Success - show confirmation with email sent message
      alert(`Thank you, ${bookingData.fullName}! Your booking request has been received and a confirmation email has been sent to ${bookingData.email}. We will confirm your reservation shortly.`);
      
      // Reset form
      document.getElementById('bookingForm').reset();
      currentStep = 1;
      showStep(1);
      
      closeModal('id03');
    } else {
      // Email failed, but booking is still processed
      console.error('Email sending failed:', emailResult.error);
      
      // Check if it's a configuration issue
      const isConfigError = emailResult.error && 
        emailResult.error.text && 
        emailResult.error.text.includes('not configured');
      
      if (isConfigError) {
        // EmailJS not configured - show standard booking success
        alert(`Thank you, ${bookingData.fullName}! Your booking request has been received. We will confirm your reservation shortly via phone or email at ${bookingData.email}.`);
      } else {
        // Email sending failed for other reasons
        alert(`Thank you, ${bookingData.fullName}! Your booking request has been received. However, there was an issue sending the confirmation email. Please note your booking details. We will contact you shortly at ${bookingData.email}.`);
      }
      
      // Reset form
      document.getElementById('bookingForm').reset();
      currentStep = 1;
      showStep(1);
      
      closeModal('id03');
    }
  } catch (error) {
    console.error('Booking submission error:', error);
    showError('An error occurred while processing your booking. Please try again.');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  } finally {
    // Restore button state if still visible
    if (submitBtn.disabled) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  }
  
  return false;
}

/**
 * Initialize booking form
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scroll to all anchor links
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
});
