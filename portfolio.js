// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    const pricingCards = document.querySelectorAll('.portfolio-card');
    
    // Mobile Menu Toggle Function
    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Close mobile menu function
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Menu toggle event listener
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links (mobile only)
    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Only close menu if we're in mobile view
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbar && navbar.classList.contains('active') && window.innerWidth <= 768) {
            if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Handle window resize
    function handleResize() {
        const windowWidth = window.innerWidth;
        
        // Close mobile menu and reset states when resizing to desktop
        if (windowWidth > 768) {
            closeMobileMenu();
        }
    }
    
    // Debounce function for resize event
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Add resize event listener with debouncing
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Initial resize check
    handleResize();
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Stagger animation for pricing cards
        if (pricingCards.length > 0) {
            pricingCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100 + 500); // Start after 500ms
            });
        }
    });
    
    // Add custom cursor effect for pricing cards
    pricingCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
    });
    
    // ESC key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbar && navbar.classList.contains('active') && window.innerWidth <= 768) {
            closeMobileMenu();
        }
    });
    
    console.log('Janelle Sulapas - Mobile Menu Fixed Successfully! 🎉');
});