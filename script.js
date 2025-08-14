// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Mobile join button click handler
document.addEventListener('DOMContentLoaded', () => {
    const mobileJoinBtn = document.querySelector('.mobile-join-btn');
    if (mobileJoinBtn) {
        mobileJoinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Close the mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Navigate to waitlist section
            setTimeout(() => {
                document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        });
    }
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form submission handlers
document.addEventListener('DOMContentLoaded', () => {
    // First waiting list form
    const waitingForm = document.getElementById('waiting-form');
    const waitingSuccess = document.getElementById('waitingSuccess');
    
    if (waitingForm) {
        waitingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('waiting-email').value;
            
            if (email) {
                // Show success message
                waitingSuccess.style.display = 'block';
                waitingForm.style.display = 'none';
                
                // Reset form
                document.getElementById('waiting-email').value = '';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    waitingSuccess.style.display = 'none';
                    waitingForm.style.display = 'flex';
                }, 5000);
            }
        });
    }
    
    // Final waitlist form
    const finalWaitlistForm = document.getElementById('final-waitlist-form');
    const finalWaitingSuccess = document.getElementById('finalWaitingSuccess');
    
    if (finalWaitlistForm) {
        finalWaitlistForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('final-waiting-email').value;
            
            if (email) {
                // Show success message
                finalWaitingSuccess.style.display = 'flex';
                finalWaitlistForm.style.display = 'none';
                
                // Reset form
                document.getElementById('final-waiting-email').value = '';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    finalWaitingSuccess.style.display = 'none';
                    finalWaitlistForm.style.display = 'flex';
                }, 5000);
            }
        });
    }
});

// Touch improvements for mobile
document.addEventListener('DOMContentLoaded', () => {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('button, .btn, .join-waitlist-btn, .mobile-join-btn');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', () => {
            button.style.transform = 'scale(1)';
        });
    });
    
    // Prevent zoom on double tap
    document.addEventListener('touchend', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            e.preventDefault();
        }
    });
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', () => {
    // Debug: Check if sections exist
    const aboutSection = document.querySelector('#about');
    const aboutContent = document.querySelector('.about-content');
    const waitlistSection = document.querySelector('#waitlist');
    const waitlistContent = document.querySelector('.waitlist-content');
    
    console.log('About section found:', aboutSection);
    console.log('About content found:', aboutContent);
    console.log('Waitlist section found:', waitlistSection);
    console.log('Waitlist content found:', waitlistContent);
    
    // Force sections to be visible
    if (aboutSection) {
        aboutSection.style.display = 'block';
        aboutSection.style.visibility = 'visible';
        aboutSection.style.opacity = '1';
    }
    
    if (waitlistSection) {
        waitlistSection.style.display = 'block';
        waitlistSection.style.visibility = 'visible';
        waitlistSection.style.opacity = '1';
    }
    
    // Force benefit items to be visible
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.style.display = 'flex';
        item.style.visibility = 'visible';
        item.style.opacity = '1';
    });
    
    // Force waitlist benefits container to be visible
    const waitlistBenefits = document.querySelector('.waitlist-benefits');
    if (waitlistBenefits) {
        waitlistBenefits.style.display = 'flex';
        waitlistBenefits.style.visibility = 'visible';
        waitlistBenefits.style.opacity = '1';
    }
    
    // Ensure elements stay visible after a delay
    setTimeout(() => {
        const allBenefitItems = document.querySelectorAll('.benefit-item');
        allBenefitItems.forEach(item => {
            item.style.display = 'flex';
            item.style.visibility = 'visible';
            item.style.opacity = '1';
        });
        
        if (waitlistBenefits) {
            waitlistBenefits.style.display = 'flex';
            waitlistBenefits.style.visibility = 'visible';
            waitlistBenefits.style.opacity = '1';
        }
    }, 1000);
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .about-content, .waitlist-content');
    animateElements.forEach(el => observer.observe(el));
    
    // Service cards animation with enhanced functionality
    const serviceCards = document.querySelectorAll('.service-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    serviceCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Add click functionality to service cards
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // About Section Number Counter Animation
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.stat-number, .highlight-number');
        
        numberElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target'));
            if (!target) return;
            
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Enhanced Intersection Observer for About Section
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start number animation when about section is visible
                setTimeout(animateNumbers, 500);
                aboutObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Lower threshold for mobile
        rootMargin: '0px 0px -50px 0px' // Smaller margin for mobile
    });
    
    const aboutSectionElement = document.querySelector('.about');
    if (aboutSectionElement) {
        aboutObserver.observe(aboutSectionElement);
    }
    
    // Fallback: Trigger animation on scroll for mobile devices
    let aboutAnimationTriggered = false;
    window.addEventListener('scroll', () => {
        if (aboutAnimationTriggered) return;
        
        const aboutSection = document.querySelector('.about');
        if (!aboutSection) return;
        
        const rect = aboutSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            aboutAnimationTriggered = true;
            setTimeout(animateNumbers, 300);
        }
    });
    
    // Additional fallback: Trigger on page load for mobile
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            const aboutSection = document.querySelector('.about');
            if (aboutSection) {
                const rect = aboutSection.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    setTimeout(animateNumbers, 500);
                }
            }
        }, 1000);
    }
    
    // Smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const waitlistSection = document.querySelector('#waitlist');
            if (waitlistSection) {
                waitlistSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}); 