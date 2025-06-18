// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.header');
    const qualityCards = document.querySelectorAll('.quality-card');
    const skillItems = document.querySelectorAll('.skill-item');

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navbar.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                
                // Add stagger effect to quality cards
                if (entry.target.classList.contains('quality-card')) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    qualityCards.forEach(card => observer.observe(card));
    
    // Skills hover effects with sound-like visual feedback
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            // Create ripple effect
            createRipple(this);
            
            // Add subtle shake to other items
            skillItems.forEach((otherItem, otherIndex) => {
                if (otherIndex !== index) {
                    otherItem.style.transform = 'translateY(-2px) scale(0.98)';
                    otherItem.style.opacity = '0.7';
                }
            });
        });

        item.addEventListener('mouseleave', function() {
            // Reset other items
            skillItems.forEach(otherItem => {
                otherItem.style.transform = '';
                otherItem.style.opacity = '';
            });
        });
    });

    // Dynamic text typing effect for main title
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

    // Trigger typing effect when title comes into view
    const mainTitle = document.querySelector('.main-title');
    const titleText = mainTitle.textContent;
    
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeWriter(entry.target, titleText, 50);
                }, 500);
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    titleObserver.observe(mainTitle);

    // Parallax effect for floating shapes (IMPROVED)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.05); // Reduced speed for better performance
            const yPos = -(scrolled * speed);
            // Use transform3d for better performance
            shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });

    // Create ripple effect function
    function createRipple(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            width: ${size}px;
            height: ${size}px;
            left: 50%;
            top: 50%;
            margin-left: ${-size/2}px;
            margin-top: ${-size/2}px;
            pointer-events: none;
            z-index: 1;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation-play-state: running !important;
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .quality-card:hover .quality-icon {
            animation-play-state: paused;
            transform: scale(1.2) rotate(10deg);
        }
        
        .skill-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
        }
        
        .skill-item:hover::before {
            transform: translateX(100%);
        }
    `;
    document.head.appendChild(style);

    // Advanced scroll animations (FIXED)
    function handleScroll() {
        const scrolled = window.pageYOffset;
        
        // Remove problematic parallax that causes black screen
        // const rate = scrolled * -0.5;
        // document.querySelector('.about-section').style.transform = `translate3d(0, ${rate}px, 0)`;
        
        // Keep only the gradient shift effect
        const gradientShift = Math.min(scrolled / 1000, 1);
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            aboutSection.style.background = 
                `linear-gradient(135deg, 
                    hsl(${240 + gradientShift * 60}, 20%, ${5 + gradientShift * 5}%) 0%, 
                    hsl(${225 + gradientShift * 45}, 25%, ${10 + gradientShift * 10}%) 50%, 
                    hsl(${210 + gradientShift * 30}, 30%, ${15 + gradientShift * 15}%) 100%)`;
        }
    }

    // Throttled scroll handler for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Interactive cursor effect for quality cards
    qualityCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = -(x - centerX) / 10;
            
            card.style.transform = `
                translateY(-10px) 
                scale(1.02) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                perspective(1000px)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('.about-header, .about-content, .skills-section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Dynamic particle system (lightweight)
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: particleFloat 6s linear infinite;
        `;
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        document.querySelector('.bg-elements').appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 6000);
    }

    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) scale(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(1);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Create particles periodically
    setInterval(createParticle, 2000);

    // Smooth scrolling for anchor links
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

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations with delays
        setTimeout(() => {
            document.querySelector('.about-header').style.opacity = '1';
        }, 200);
        
        setTimeout(() => {
            document.querySelector('.about-content').style.opacity = '1';
        }, 400);
        
        setTimeout(() => {
            qualityCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 600);
    });

    // Performance optimization: Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.querySelectorAll('.floating-shape').forEach(shape => {
            shape.style.animationDuration = '12s'; // Slower animations
        });
    }

    // Accessibility: Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animationDuration = '0.1s';
            el.style.transitionDuration = '0.1s';
        });
    }
});