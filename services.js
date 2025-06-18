// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Set active nav link based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname;
        const currentFile = currentPage.split('/').pop().toLowerCase();
        
        // Remove active class from all links first
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to the appropriate link
        if (currentFile === 'services.html' || currentFile.includes('services')) {
            const servicesLink = document.querySelector('.navbar a[href="services.html"]');
            if (servicesLink) {
                servicesLink.classList.add('active');
            }
        } else if (currentFile === 'about.html' || currentFile.includes('about')) {
            const aboutLink = document.querySelector('.navbar a[href="about.html"]');
            if (aboutLink) {
                aboutLink.classList.add('active');
            }
        } else if (currentFile === 'portfolio.html' || currentFile.includes('portfolio')) {
            const portfolioLink = document.querySelector('.navbar a[href="portfolio.html"]');
            if (portfolioLink) {
                portfolioLink.classList.add('active');
            }
        } else if (currentFile === 'contacts.html' || currentFile.includes('contact')) {
            const contactLink = document.querySelector('.navbar a[href="contacts.html"]');
            if (contactLink) {
                contactLink.classList.add('active');
            }
        } else {
            // Default to home if no specific page matches
            const homeLink = document.querySelector('.navbar a[href="homeepagee.html"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }
    
    // Add scroll effect to header
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Mobile menu toggle functionality
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Close mobile menu when clicking on a nav link
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Smooth scrolling for navigation links
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = header.offsetHeight;
            const elementPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Card animation on scroll
    function animateCards() {
        const cards = document.querySelectorAll('.card');
        const windowHeight = window.innerHeight;
        
        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < windowHeight - 100) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // Initialize card animation styles
    function initializeCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.6s ease-out';
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', function() {
        handleScroll();
        animateCards();
    });
    
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an internal link (starts with #)
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                smoothScroll(href);
                closeMobileMenu();
            } else if (href === '#') {
                // Home link - scroll to top
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                closeMobileMenu();
            } else {
                // External link - close mobile menu
                closeMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && navbar.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Prevent menu close when clicking inside navbar
    navbar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Initialize animations
    initializeCards();
    
    // Set the active navigation link on page load
    setActiveNavLink();
    
    // Trigger initial animations
    setTimeout(() => {
        animateCards();
    }, 500);
    
    // Add typing effect to hero text (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Enhanced card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Parallax effect for hero section (optional)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Initialize everything
    handleScroll();
});