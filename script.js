// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Hamburger Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            
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

    // 2. Smooth Scroll Reveal Animations
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => scrollObserver.observe(el));

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
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 400, fill: "forwards" });
        });

        const interactiveElements = document.querySelectorAll('a, button, .product-card, .hamburger, input, textarea, select');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    }

    // 5. EXTREMELY ACCURATE Metal Weight Calculator Logic
    const shapeSelect = document.getElementById('metal-shape');
    if (shapeSelect) {
        // DOM Elements
        const dimDiameter = document.getElementById('dim-diameter');
        const dimWidth = document.getElementById('dim-width');
        const dimLegA = document.getElementById('dim-lega');
        const dimLegB = document.getElementById('dim-legb');
        const dimThickness = document.getElementById('dim-thickness');
        const dimOd = document.getElementById('dim-od');
        const dimWall = document.getElementById('dim-wall');

        const valDiameter = document.getElementById('val-diameter');
        const valWidth = document.getElementById('val-width');
        const valLegA = document.getElementById('val-lega');
        const valLegB = document.getElementById('val-legb');
        const valThickness = document.getElementById('val-thickness');
        const valOd = document.getElementById('val-od');
        const valWall = document.getElementById('val-wall');
        const valLength = document.getElementById('val-length');
        const valPieces = document.getElementById('val-pieces');
        const metalType = document.getElementById('metal-type');
        
        const calcBtn = document.getElementById('calculate-btn');
        const displayWeight = document.getElementById('final-weight');
        const displayUnitLabel = document.getElementById('display-unit-label');
        const unitRadios = document.querySelectorAll('input[name="weight-unit"]');

        // Toggle UI based on shape
        shapeSelect.addEventListener('change', (e) => {
            const shape = e.target.value;
            
            document.querySelectorAll('.dynamic-input').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.shape-svg').forEach(svg => svg.style.display = 'none');

            // Reset values
            valDiameter.value = ''; valWidth.value = ''; valLegA.value = ''; valLegB.value = ''; 
            valThickness.value = ''; valOd.value = ''; valWall.value = '';

            // Show relevant fields
            if (shape === 'round') {
                dimDiameter.style.display = 'block';
                document.getElementById('svg-round').style.display = 'block';
            } else if (shape === 'flat') {
                dimWidth.style.display = 'block';
                dimThickness.style.display = 'block';
                document.getElementById('svg-flat').style.display = 'block';
            } else if (shape === 'pipe') {
                dimOd.style.display = 'block';
                dimWall.style.display = 'block';
                document.getElementById('svg-pipe').style.display = 'block';
            } else if (shape === 'angle') {
                dimLegA.style.display = 'block';
                dimLegB.style.display = 'block';
                dimThickness.style.display = 'block';
                document.getElementById('svg-angle').style.display = 'block';
            }
        });

        shapeSelect.dispatchEvent(new Event('change'));

        // Compute Logic
        calcBtn.addEventListener('click', () => {
            const shape = shapeSelect.value;
            const density = parseFloat(metalType.value); 
            const length = parseFloat(valLength.value) || 0; 
            const pieces = parseInt(valPieces.value) || 1;
            
            let crossSectionalAreaMm2 = 0;

            if (shape === 'round') {
                const d = parseFloat(valDiameter.value) || 0;
                crossSectionalAreaMm2 = Math.PI * Math.pow((d / 2), 2);
            } else if (shape === 'flat') {
                const w = parseFloat(valWidth.value) || 0;
                const t = parseFloat(valThickness.value) || 0;
                crossSectionalAreaMm2 = w * t;
            } else if (shape === 'pipe') {
                const od = parseFloat(valOd.value) || 0;
                const wt = parseFloat(valWall.value) || 0;
                if (od > (2 * wt) && wt > 0) {
                    crossSectionalAreaMm2 = Math.PI * (od - wt) * wt;
                } else {
                    crossSectionalAreaMm2 = 0; 
                }
            } else if (shape === 'angle') {
                const a = parseFloat(valLegA.value) || 0;
                const b = parseFloat(valLegB.value) || 0;
                const t = parseFloat(valThickness.value) || 0;
                // Area of Angle = (Leg A * Thickness) + ((Leg B - Thickness) * Thickness)
                if (t > 0 && a >= t && b >= t) {
                    crossSectionalAreaMm2 = (a * t) + ((b - t) * t);
                } else {
                    crossSectionalAreaMm2 = 0; 
                }
            }

            const volumeCm3 = crossSectionalAreaMm2 * length;
            let totalWeightKg = (volumeCm3 * density) / 1000;
            totalWeightKg = totalWeightKg * pieces;

            // Unit conversions
            let selectedUnit = 'kg';
            unitRadios.forEach(radio => { if (radio.checked) selectedUnit = radio.value; });

            let finalOutput = 0;
            if (selectedUnit === 'kg') {
                finalOutput = totalWeightKg;
                displayUnitLabel.innerText = 'KG';
            } else if (selectedUnit === 'lbs') {
                finalOutput = totalWeightKg * 2.20462262; 
                displayUnitLabel.innerText = 'LBS';
            } else if (selectedUnit === 'mt') {
                finalOutput = totalWeightKg / 1000; 
                displayUnitLabel.innerText = 'TONS';
            }

            // Animate Number
            let start = parseFloat(displayWeight.innerText) || 0;
            const end = finalOutput;
            const duration = 800; 
            const startTime = performance.now();

            const animateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = start + (end - start) * easeOut;
                
                displayWeight.innerText = currentVal.toFixed(3);

                if (progress < 1) {
                    requestAnimationFrame(animateNumber);
                } else {
                    displayWeight.innerText = end.toFixed(3);
                }
            };

            if(end > 0) {
                requestAnimationFrame(animateNumber);
            } else {
                displayWeight.innerText = "0.000";
            }
        });

        // Real-Time Auto-Calculate Bindings
        unitRadios.forEach(radio => radio.addEventListener('change', () => calcBtn.click()));
        const calculatorInputs = document.querySelectorAll('.inputs-panel input, .inputs-panel select');
        calculatorInputs.forEach(input => {
            input.addEventListener('input', () => calcBtn.click());
        });
    }
});
