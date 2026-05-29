// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu Logic with Soft Slide & Icon Change
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle the slide animation class
            navLinks.classList.toggle('active');
            
            // Get the icon inside the hamburger div
            const icon = hamburger.querySelector('i');
            
            // Spin and change the icon to an 'X'
            if (navLinks.classList.contains('active')) {
                hamburger.style.transform = 'rotate(90deg)';
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                hamburger.style.transform = 'rotate(0deg)';
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Smooth Scroll Reveal Animations (Fade Up)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 3. Dynamic Center-Screen Hover Effect for Products
    const productCards = document.querySelectorAll('.product-card');
    
    if (productCards.length > 0) {
        const handleScrollFocus = () => {
            const screenCenter = window.innerHeight / 2;
            
            productCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.top + (rect.height / 2);
                
                if (Math.abs(screenCenter - cardCenter) < 250) {
                    card.classList.add('scroll-focus');
                } else {
                    card.classList.remove('scroll-focus');
                }
            });
        };

        window.addEventListener('scroll', handleScrollFocus);
        handleScrollFocus();
    }

    // 4. Luxury Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 400, fill: "forwards" });
        });

        const interactiveElements = document.querySelectorAll('a, button, .product-card, .hamburger, input, textarea');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
            });
        });
    }
});