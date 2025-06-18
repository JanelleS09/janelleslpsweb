// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

// Function to check if we're in mobile view
function isMobileView() {
    return window.innerWidth <= 768;
}

// Function to handle responsive layout
function handleResponsiveLayout() {
    if (isMobileView()) {
        // Mobile view - ensure navbar is positioned off-screen but visible for animation
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
    } else {
        // Desktop view - show navbar normally and hide mobile toggle
        navbar.classList.remove('active');
        menuToggle.classList.remove('active');
    }
}

// Mobile menu toggle click handler
menuToggle.addEventListener('click', () => {
    if (isMobileView()) {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    handleResponsiveLayout();
});

// Initialize on page load
handleResponsiveLayout();

// Active navigation link
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        
        // Close mobile menu after clicking
        if (isMobileView()) {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
        }
    });
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning and animation delay
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 6) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'httf7N_aPEcptFFh3'; // Get from EmailJS dashboard
const EMAILJS_SERVICE_ID = 'service_z77fglp'; // Gmail service ID
const EMAILJS_TEMPLATE_ID = 'template_42z7aip'; // Email template ID

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// Form submission with email sending
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = contactForm.querySelector('.submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;
    
    try {
        // Send email using EmailJS
        const result = await emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            contactForm
        );
        
        console.log('Email sent successfully:', result);
        
        // Show success message
        successMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        successMessage.style.background = 'rgba(34, 197, 94, 0.9)';
        successMessage.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('Email sending failed:', error);
        
        // Show error message
        successMessage.textContent = 'Failed to send message. Please try again or contact me directly.';
        successMessage.style.background = 'rgba(239, 68, 68, 0.9)';
        successMessage.classList.add('show');
    }
    
    // Reset button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    submitBtn.disabled = false;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
});

// Enhanced form interactions
const formInputs = document.querySelectorAll('.form-input, .form-textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateZ(10px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateZ(0)';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Map interaction enhancements
const mapEmbed = document.querySelector('.map-embed');
if (mapEmbed) {
    mapEmbed.addEventListener('mouseenter', () => {
        mapEmbed.style.transform = 'translateY(-5px) scale(1.02)';
    });

    mapEmbed.addEventListener('mouseleave', () => {
        mapEmbed.style.transform = 'translateY(0) scale(1)';
    });
}