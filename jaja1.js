

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