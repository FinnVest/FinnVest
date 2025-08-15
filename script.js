// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Handle all navigation links (including hamburger menu)
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Special handling for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            // Navigate to waitlist
            const waitlistSection = document.querySelector('#waitlist');
            if (waitlistSection) {
                waitlistSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Form submission handlers
    const waitingForm = document.getElementById('waiting-form');
    const waitingSuccess = document.getElementById('waitingSuccess');
    
    if (waitingForm) {
        waitingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('waiting-email').value;
            
            if (email) {
                // Show success message
                if (waitingSuccess) {
                    waitingSuccess.style.display = 'block';
                }
                waitingForm.style.display = 'none';
                
                // Reset form
                document.getElementById('waiting-email').value = '';
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    if (waitingSuccess) {
                        waitingSuccess.style.display = 'none';
                    }
                    waitingForm.style.display = 'block';
                }, 5000);
            }
        });
    }
    
    // Final waitlist form
    const finalWaitlistForm = document.querySelector('.waitlist-form-final');
    const finalWaitingSuccess = document.getElementById('finalWaitingSuccess');
    
    if (finalWaitlistForm) {
        finalWaitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('final-waiting-email').value;
            
            if (email) {
                // Show success message
                if (finalWaitingSuccess) {
                    finalWaitingSuccess.style.display = 'block';
                }
                finalWaitlistForm.style.display = 'none';
                
                // Reset form
                document.getElementById('final-waiting-email').value = '';
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    if (finalWaitingSuccess) {
                        finalWaitingSuccess.style.display = 'none';
                    }
                    finalWaitlistForm.style.display = 'block';
                }, 5000);
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .benefit-item, .about-content, .waitlist-content');
    animateElements.forEach(function(el) {
        observer.observe(el);
    });
    
    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    serviceCards.forEach(function(card) {
        cardObserver.observe(card);
    });
    
    // Add click functionality to service cards
    serviceCards.forEach(function(card) {
        card.addEventListener('click', function() {
            // Add a subtle click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(function() {
                this.style.transform = 'scale(1)';
            }.bind(this), 150);
        });
    });
    
    // About Section Number Counter Animation
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.stat-number, .highlight-number');
        
        numberElements.forEach(function(element) {
            const target = parseInt(element.getAttribute('data-target'));
            if (!target) return;
            
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(function() {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Intersection Observer for About Section
    const aboutObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
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
    window.addEventListener('scroll', function() {
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
        setTimeout(function() {
            const aboutSection = document.querySelector('.about');
            if (aboutSection) {
                const rect = aboutSection.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    setTimeout(animateNumbers, 500);
                }
            }
        }, 1000);
    }
    
    // Modal functionality
    function showModal(email) {
        const modal = document.getElementById('successModal');
        const modalEmail = document.getElementById('modalEmail');
        
        if (modal && modalEmail) {
            modalEmail.textContent = email;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Make closeModal function globally available
    window.closeModal = closeModal;
    
    // Close modal when clicking outside
    const modalOverlay = document.getElementById('successModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // Loading modal functionality
    function showLoadingModal() {
        const loadingModal = document.getElementById('loadingModal');
        if (loadingModal) {
            loadingModal.style.display = 'flex';
        }
    }
    
    function hideLoadingModal() {
        const loadingModal = document.getElementById('loadingModal');
        if (loadingModal) {
            loadingModal.style.display = 'none';
        }
    }
    
    // Make functions globally available
    window.showLoadingModal = showLoadingModal;
    window.hideLoadingModal = hideLoadingModal;
    
    // Form submission with Supabase (if available)
    async function joinWaitingList(event) {
        event.preventDefault();
        
        const email = document.getElementById('waiting-email').value;
        if (!email) return false;
        
        showLoadingModal();
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            hideLoadingModal();
            showModal(email);
            
            // Reset form
            document.getElementById('waiting-email').value = '';
            
        } catch (error) {
            hideLoadingModal();
            console.error('Error:', error);
        }
        
        return false;
    }
    
    async function joinFinalWaitlist(event) {
        event.preventDefault();
        
        const email = document.getElementById('final-waiting-email').value;
        if (!email) return false;
        
        showLoadingModal();
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            hideLoadingModal();
            showModal(email);
            
            // Reset form
            document.getElementById('final-waiting-email').value = '';
            
        } catch (error) {
            hideLoadingModal();
            console.error('Error:', error);
        }
        
        return false;
    }
    
    // Make functions globally available
    window.joinWaitingList = joinWaitingList;
    window.joinFinalWaitlist = joinFinalWaitlist;
    
}); 