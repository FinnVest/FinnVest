// Email validation function (moved from supabase-config.js to ensure availability)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fallback functions in case supabase-config.js fails to load
if (typeof addToWaitlist === 'undefined') {
    window.addToWaitlist = async function(email) {
        console.error('Supabase not loaded properly');
        return { success: false, error: 'Supabase configuration not available' };
    };
}

if (typeof checkEmailExists === 'undefined') {
    window.checkEmailExists = async function(email) {
        console.error('Supabase not loaded properly');
        return { exists: false, error: 'Supabase configuration not available' };
    };
}

if (typeof sendWelcomeEmail === 'undefined') {
    window.sendWelcomeEmail = async function(email) {
        console.error('Supabase not loaded properly');
        return { success: false, error: 'Supabase configuration not available' };
    };
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Set default language to Spanish
    changeLanguage('es');
    
    // Ensure Supabase functions are available
    if (typeof addToWaitlist === 'undefined') {
        console.warn('Supabase functions not loaded, using fallbacks');
    }
    
    const animateElements = document.querySelectorAll('.about-content, .contact-content, .section-header');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Service rectangles scroll reveal
    const serviceRectangles = document.querySelectorAll('.service-rectangle');
    const rectangleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    serviceRectangles.forEach(rectangle => {
        rectangleObserver.observe(rectangle);
    });
});

// Language Switcher Functionality
let currentLanguage = 'es'; // Default to Spanish

function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    const arrow = document.querySelector('.arrow-icon');
    const button = document.querySelector('.language-btn');
    
    dropdown.classList.toggle('show');
    arrow.classList.toggle('rotated');
    button.classList.toggle('active');
}

const translations = {
    en: {
        navHome: 'Home',
        navServices: 'Services',
        navAbout: 'About',
        navContact: 'Contact',
        navJoinWaitlist: 'Join Waitlist',
        heroTitle: 'Your Financial Future Starts Here',
        heroSubtitle: 'Professional investment solutions and financial planning to help you achieve your goals and secure your future.',
        btnGetStarted: 'Get Started',
        btnLearnMore: 'Learn More',
        waitingLabel: 'Join the waiting list for the launch!',
        waitingPlaceholder: 'Your email address',
        waitingBtn: 'Join',
        waitingSuccess: 'Thank you for joining! We\'ll notify you when we launch the platform.',
        waitlistTitle: 'Don\'t Miss the Launch!',
        waitlistDesc: 'Join thousands of people already on the waitlist. Be among the first to access when we launch the platform.',
        waitlistFormTitle: 'Join now and don\'t miss anything!',
        waitlistSubtitle: 'It only takes 30 seconds. Your financial future will thank you.',
        waitlistPlaceholder: 'Your email address',
        waitlistBtn: 'Join Now!',
        waitlistSuccess: 'Perfect! You\'re on the list. We\'ll send you a confirmation email.',
        waitlistDisclaimer: '* No spam, only valuable content. You can unsubscribe at any time.',
        benefit1Title: 'Early Access',
        benefit1Desc: 'Be among the first to try all features',
        benefit2Title: 'Exclusive Benefits',
        benefit2Desc: 'Get special discounts and premium content',
        benefit3Title: 'Priority Notifications',
        benefit3Desc: 'Receive updates before anyone else',
        servicesTitle: 'Our Services',
        servicesDesc: 'Comprehensive financial solutions tailored to your needs',
        service1: 'Invest Without Risk',
        service1Desc: 'Simulate investments in real stocks with current market prices — without using real money. Learn by doing.',
        service2: '5-Minute Lessons',
        service2Desc: 'Brief and interactive quizzes to learn financial concepts anytime, anywhere.',
        service3: 'Save with Strategy',
        service3Desc: 'Discover practical and effective ways to organize your expenses and start saving without it hurting.',
        service4: 'Explore Investment Types',
        service4Desc: 'From stocks to bonds or crypto, learn about available options and which might be best for you.',
        service5: 'Understand Your Taxes (IRS)',
        service5Desc: 'Learn how taxes work in the US, especially when investing or saving.',
        service6: 'Your Progress, Gamified',
        service6Desc: 'Earn coins, level up and maintain your active streaks while learning to manage your money.',
        aboutTitle: 'About FinnVest',
        aboutDesc: 'With years of experience in the financial industry, FinnVest is your trusted partner for all your investment and financial planning needs. We believe in building long-term relationships with our clients, providing personalized solutions that align with your unique financial goals.',
        statClients: 'Happy Clients',
        statYears: 'Years Experience',
        statAssets: 'Assets Managed',
        contactTitle: 'Get In Touch',
        contactDesc: 'Ready to start your financial journey? Contact us today.',
        contactPhone: 'Phone',
        contactEmail: 'Email',
        contactAddress: 'Address',
        contactBtn: 'Send Message',
        contactName: 'Your Name',
        contactMail: 'Your Email',
        contactTel: 'Your Phone',
        contactMsg: 'Your Message',
        footerTitle: 'FinnVest',
        footerDesc: 'Your trusted partner for financial success and investment planning.',
        quickLinks: 'Quick Links',
        footerServices: 'Services',
        connect: 'Connect',
        allRights: 'All rights reserved.'
    },
    es: {
        navHome: 'Inicio',
        navServices: 'Servicios',
        navAbout: 'Sobre Nosotros',
        navContact: 'Contacto',
        navJoinWaitlist: 'Únete',
        heroTitle: 'La app que te enseña todo lo que deberías saber sobre tus finanzas',
        heroSubtitle: 'No necesitas más de 5 minutos al día para cambiar tu futuro. ¿Qué esperas?',
        btnGetStarted: 'Comenzar',
        btnLearnMore: 'Saber Más',
        waitingLabel: '¡Únete a la lista de espera para el lanzamiento!',
        waitingPlaceholder: 'Tu correo electrónico',
        waitingBtn: 'Unirse',
        waitingSuccess: '¡Gracias por unirte! Te avisaremos cuando lancemos la plataforma.',
        waitlistTitle: '¿No quieres perderte el lanzamiento?',
        waitlistDesc: 'Únete a miles de personas que ya están en la lista de espera. Sé de los primeros en acceder cuando lancemos la plataforma.',
        waitlistFormTitle: '¡Únete ahora y no te pierdas nada!',
        waitlistSubtitle: 'Solo toma 30 segundos. Tu futuro financiero te lo agradecerá.',
        waitlistPlaceholder: 'Tu correo electrónico',
        waitlistBtn: '¡Unirme Ahora!',
        waitlistSuccess: '¡Perfecto! Ya estás en la lista. Te enviaremos un email de confirmación.',
        waitlistDisclaimer: '* No spam, solo contenido valioso. Puedes darte de baja en cualquier momento.',
        benefit1Title: 'Acceso Anticipado',
        benefit1Desc: 'Sé de los primeros en probar todas las funciones',
        benefit2Title: 'Beneficios Exclusivos',
        benefit2Desc: 'Obtén descuentos especiales y contenido premium',
        benefit3Title: 'Notificaciones Prioritarias',
        benefit3Desc: 'Recibe actualizaciones antes que nadie',
        servicesTitle: '¿Qué ofrecemos?',
        servicesDesc: 'Educación financiera adaptada a tus necesidades',
        service1: 'Invierte sin riesgo',
        service1Desc: 'Simula inversiones en acciones reales con precios del mercado actual — sin usar dinero real. Aprende haciendo.',
        service2: 'Lecciones de 5 minutos',
        service2Desc: 'Quizzes breves e interactivos para que aprendas conceptos financieros en cualquier momento, estés donde estés.',
        service3: 'Ahorra con estrategia',
        service3Desc: 'Descubre formas prácticas y efectivas para organizar tus gastos y empezar a ahorrar sin que duela.',
        service4: 'Explora tipos de inversión',
        service4Desc: 'Desde acciones hasta bonos o cripto, conoce las opciones disponibles y cuál puede ser la mejor para ti.',
        service5: 'Entiende tus impuestos (DIAN)',
        service5Desc: 'Aprende cómo funcionan los impuestos en Colombia, especialmente al invertir o ahorrar.',
        service6: 'Tu progreso, gamificado',
        service6Desc: 'Gana monedas, sube de nivel y mantén tus rachas activas mientras aprendes a manejar tu dinero.',
        aboutTitle: 'Sobre FinnVest',
        aboutDesc: 'Con años de experiencia en la industria financiera, FinnVest es tu socio de confianza para todas tus necesidades de inversión y planificación financiera. Creemos en construir relaciones a largo plazo con nuestros clientes, brindando soluciones personalizadas que se alinean con tus objetivos financieros únicos.',
        statClients: 'Clientes Satisfechos',
        statYears: 'Años de Experiencia',
        statAssets: 'Activos Gestionados',
        contactTitle: 'Contáctanos',
        contactDesc: '¿Listo para comenzar tu viaje financiero? Contáctanos hoy.',
        contactPhone: 'Teléfono',
        contactEmail: 'Correo Electrónico',
        contactAddress: 'Dirección',
        contactBtn: 'Enviar Mensaje',
        contactName: 'Tu Nombre',
        contactMail: 'Tu Correo Electrónico',
        contactTel: 'Tu Teléfono',
        contactMsg: 'Tu Mensaje',
        footerTitle: 'FinnVest',
        footerDesc: 'Tu socio de confianza para el éxito financiero y la planificación de inversiones.',
        quickLinks: 'Enlaces Rápidos',
        footerServices: 'Servicios',
        connect: 'Conectar',
        allRights: 'Todos los derechos reservados.'
    }
};

function changeLanguage(lang) {
    const currentLang = document.querySelector('.current-lang');
    const dropdown = document.getElementById('languageDropdown');
    const arrow = document.querySelector('.arrow-icon');
    const button = document.querySelector('.language-btn');
    
    // Update current language display
    currentLang.textContent = lang.toUpperCase();
    
    // Close dropdown
    dropdown.classList.remove('show');
    arrow.classList.remove('rotated');
    button.classList.remove('active');

    // Update navigation
    document.querySelector('.nav-link[href="#home"]').textContent = translations[lang].navHome;
    document.querySelector('.nav-link[href="#services"]').textContent = translations[lang].navServices;
    document.querySelector('.nav-link[href="#about"]').textContent = translations[lang].navAbout;
    document.querySelector('.join-waitlist-btn').textContent = translations[lang].navJoinWaitlist;

    // Hero section
    document.querySelector('.hero-title').textContent = translations[lang].heroTitle;
    document.querySelector('.hero-subtitle').textContent = translations[lang].heroSubtitle;

    // Waiting list form - Update this FIRST
    const waitingLabel = document.getElementById('waitingLabel');
    const waitingEmail = document.getElementById('waiting-email');
    const waitingBtn = document.getElementById('waitingBtn');
    const waitingSuccess = document.getElementById('waitingSuccess');
    
    if (waitingLabel) waitingLabel.textContent = translations[lang].waitingLabel;
    if (waitingEmail) waitingEmail.placeholder = translations[lang].waitingPlaceholder;
    if (waitingBtn) waitingBtn.textContent = translations[lang].waitingBtn;
    if (waitingSuccess) waitingSuccess.textContent = translations[lang].waitingSuccess;

    // Services section
    document.querySelector('.section-header h2').textContent = translations[lang].servicesTitle;
    document.querySelector('.section-header p').textContent = translations[lang].servicesDesc;
    const serviceRectangles = document.querySelectorAll('.service-rectangle');
    if (serviceRectangles.length === 6) {
        serviceRectangles[0].querySelector('h3').textContent = translations[lang].service1;
        serviceRectangles[0].querySelector('p').textContent = translations[lang].service1Desc;
        serviceRectangles[1].querySelector('h3').textContent = translations[lang].service2;
        serviceRectangles[1].querySelector('p').textContent = translations[lang].service2Desc;
        serviceRectangles[2].querySelector('h3').textContent = translations[lang].service3;
        serviceRectangles[2].querySelector('p').textContent = translations[lang].service3Desc;
        serviceRectangles[3].querySelector('h3').textContent = translations[lang].service4;
        serviceRectangles[3].querySelector('p').textContent = translations[lang].service4Desc;
        serviceRectangles[4].querySelector('h3').textContent = translations[lang].service5;
        serviceRectangles[4].querySelector('p').textContent = translations[lang].service5Desc;
        serviceRectangles[5].querySelector('h3').textContent = translations[lang].service6;
        serviceRectangles[5].querySelector('p').textContent = translations[lang].service6Desc;
    }

    // About section
    document.querySelector('#about .about-text h2').textContent = translations[lang].aboutTitle;
    document.querySelector('#about .about-text p').textContent = translations[lang].aboutDesc;
    const stats = document.querySelectorAll('.stat p');
    if (stats.length === 3) {
        stats[0].textContent = translations[lang].statClients;
        stats[1].textContent = translations[lang].statYears;
        stats[2].textContent = translations[lang].statAssets;
    }

    // Waitlist section
    document.querySelector('#waitlist .section-header h2').textContent = translations[lang].waitlistTitle;
    document.querySelector('#waitlist .section-header p').textContent = translations[lang].waitlistDesc;
    document.querySelector('.waitlist-form-final h3').textContent = translations[lang].waitlistFormTitle;
    document.querySelector('.waitlist-subtitle').textContent = translations[lang].waitlistSubtitle;
    document.getElementById('final-waiting-email').placeholder = translations[lang].waitlistPlaceholder;
    document.getElementById('finalWaitingBtn').textContent = translations[lang].waitlistBtn;
    document.getElementById('finalWaitingSuccess').querySelector('p').textContent = translations[lang].waitlistSuccess;
    document.querySelector('.waitlist-disclaimer').textContent = translations[lang].waitlistDisclaimer;
    
    // Update benefit items
    const benefitItems = document.querySelectorAll('.benefit-item h4');
    const benefitDescs = document.querySelectorAll('.benefit-item p');
    if (benefitItems.length === 3) {
        benefitItems[0].textContent = translations[lang].benefit1Title;
        benefitItems[1].textContent = translations[lang].benefit2Title;
        benefitItems[2].textContent = translations[lang].benefit3Title;
        benefitDescs[0].textContent = translations[lang].benefit1Desc;
        benefitDescs[1].textContent = translations[lang].benefit2Desc;
        benefitDescs[2].textContent = translations[lang].benefit3Desc;
    }

    // Footer
    document.querySelector('.footer-section h3').textContent = translations[lang].footerTitle;
    document.querySelector('.footer-section p').textContent = translations[lang].footerDesc;
    document.querySelectorAll('.footer-section h4')[0].textContent = translations[lang].quickLinks;
    document.querySelectorAll('.footer-section h4')[1].textContent = translations[lang].footerServices;
    document.querySelectorAll('.footer-section h4')[2].textContent = translations[lang].connect;
    const quickLinks = document.querySelectorAll('.footer-section ul')[0].querySelectorAll('a');
    if (quickLinks.length === 4) {
        quickLinks[0].textContent = translations[lang].navHome;
        quickLinks[1].textContent = translations[lang].navServices;
        quickLinks[2].textContent = translations[lang].navAbout;
        quickLinks[3].textContent = translations[lang].navContact;
    }
    const serviceLinks = document.querySelectorAll('.footer-section ul')[1].querySelectorAll('li');
    if (serviceLinks.length === 4) {
        serviceLinks[0].textContent = translations[lang].service1;
        serviceLinks[1].textContent = translations[lang].service2;
        serviceLinks[2].textContent = translations[lang].service3;
        serviceLinks[3].textContent = translations[lang].service4;
    }
    document.querySelector('.footer-bottom p').innerHTML = `&copy; 2024 FinnVest. ${translations[lang].allRights}`;
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const languageSwitcher = document.querySelector('.language-switcher');
    const dropdown = document.getElementById('languageDropdown');
    
    if (!languageSwitcher.contains(event.target)) {
        dropdown.classList.remove('show');
        document.querySelector('.arrow-icon').classList.remove('rotated');
        document.querySelector('.language-btn').classList.remove('active');
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission (replace with actual form handling)
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

async function joinWaitingList(event) {
    event.preventDefault();
    console.log('joinWaitingList called');
    
    const emailInput = document.getElementById('waiting-email');
    const submitBtn = document.getElementById('waitingBtn');
    const originalText = submitBtn.textContent;
    
    const email = emailInput.value.trim();
    
    if (email === '') {
        showErrorModal('Por favor ingresa tu correo electrónico.');
        return false;
    }
    
    // Validar formato de email
    console.log('validateEmail function available:', typeof validateEmail);
    if (!validateEmail(email)) {
        showErrorModal('Por favor ingresa un correo electrónico válido.');
        return false;
    }
    
    // Mostrar modal de carga
    showLoadingModal();
    
                try {
        // Verificar si el email ya existe
        const emailCheck = await checkEmailExists(email);
        
        if (emailCheck.error) {
            throw new Error(emailCheck.error);
        }
        
        if (emailCheck.exists) {
            hideLoadingModal();
            showAlreadyRegisteredModal(email);
            emailInput.value = '';
        } else {
            // Agregar a la waitlist
            const result = await addToWaitlist(email);
            
            if (result.success) {
                // Enviar email de bienvenida
                const emailResult = await sendWelcomeEmail(email);
                hideLoadingModal();
                
                if (emailResult.success) {
                    showSuccessModal(email, '¡Gracias por unirte! Te hemos enviado un email de bienvenida con toda la información. 📧 <strong>Consejo:</strong> Revisa tu carpeta de spam si no lo encuentras en tu bandeja principal.');
                } else {
                    console.warn('Email de bienvenida no se pudo enviar:', emailResult.error);
                    showSuccessModal(email, '¡Gracias por unirte! Te notificaremos cuando lancemos la plataforma.');
                }
                emailInput.value = '';
            } else {
                throw new Error(result.error);
            }
        }
        
    } catch (error) {
        console.error('Error:', error);
        hideLoadingModal();
        showErrorModal('Hubo un error al unirse a la lista. Por favor intenta de nuevo.');
    } finally {
        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
    
    return false;
}

async function joinFinalWaitlist(event) {
    event.preventDefault();
    const emailInput = document.getElementById('final-waiting-email');
    const submitBtn = document.getElementById('finalWaitingBtn');
    const originalText = submitBtn.textContent;
    
    const email = emailInput.value.trim();
    
    if (email === '') {
        showErrorModal('Por favor ingresa tu correo electrónico.');
        return false;
    }
    
    // Validar formato de email
    if (!validateEmail(email)) {
        showErrorModal('Por favor ingresa un correo electrónico válido.');
        return false;
    }
    
    // Mostrar modal de carga
    showLoadingModal();
    
    try {
        // Verificar si el email ya existe
        const emailCheck = await checkEmailExists(email);
        
        if (emailCheck.error) {
            throw new Error(emailCheck.error);
        }
        
        if (emailCheck.exists) {
            hideLoadingModal();
            showAlreadyRegisteredModal(email);
            emailInput.value = '';
        } else {
            // Agregar a la waitlist
            const result = await addToWaitlist(email);
            
            if (result.success) {
                // Enviar email de bienvenida
                const emailResult = await sendWelcomeEmail(email);
                hideLoadingModal();
                
                if (emailResult.success) {
                    showSuccessModal(email, '¡Gracias por unirte! Te hemos enviado un email de bienvenida con toda la información. 📧 <strong>Consejo:</strong> Revisa tu carpeta de spam si no lo encuentras en tu bandeja principal.');
                } else {
                    console.warn('Email de bienvenida no se pudo enviar:', emailResult.error);
                    showSuccessModal(email, '¡Gracias por unirte! Te notificaremos cuando lancemos la plataforma.');
                }
                emailInput.value = '';
            } else {
                throw new Error(result.error);
            }
        }
        
    } catch (error) {
        console.error('Error:', error);
        hideLoadingModal();
        showErrorModal('Hubo un error al unirse a la lista. Por favor intenta de nuevo.');
    } finally {
        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
    
    return false;
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                if (number > 0) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title (optional)
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the next line if you want the typing effect
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add "back to top" button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

// Add hover effect to back to top button
backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'translateY(-3px)';
    backToTop.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
});

backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'translateY(0)';
    backToTop.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
});

// Modal Functions
function showSuccessModal(email, message) {
    const modal = document.getElementById('successModal');
    const modalEmail = document.getElementById('modalEmail');
    const modalMessage = modal.querySelector('.modal-message');
    
    modalEmail.textContent = email;
    modalMessage.textContent = message;
    modal.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function showErrorModal(message) {
    const modal = document.getElementById('successModal');
    const modalIcon = modal.querySelector('.modal-icon i');
    const modalTitle = modal.querySelector('.modal-title');
    const modalMessage = modal.querySelector('.modal-message');
    const modalEmail = document.getElementById('modalEmail');
    
    // Change to error style
    modalIcon.className = 'fas fa-exclamation-triangle';
    modalIcon.parentElement.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    modalTitle.textContent = '¡Ups! Algo salió mal';
    modalMessage.textContent = message;
    modalEmail.style.display = 'none';
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function showLoadingModal() {
    const modal = document.getElementById('loadingModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideLoadingModal() {
    const modal = document.getElementById('loadingModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function closeModal() {
    const successModal = document.getElementById('successModal');
    const loadingModal = document.getElementById('loadingModal');
    
    successModal.classList.remove('show');
    loadingModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Reset success modal to default state
    const modalIcon = successModal.querySelector('.modal-icon i');
    const modalTitle = successModal.querySelector('.modal-title');
    const modalMessage = successModal.querySelector('.modal-message');
    const modalEmail = document.getElementById('modalEmail');
    
    modalIcon.className = 'fas fa-check';
    modalIcon.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    modalTitle.textContent = '¡Bienvenido a FinnVest! 🚀';
    modalMessage.textContent = '¡Gracias por unirte a nuestra comunidad! Te hemos enviado un email de bienvenida con toda la información que necesitas. 📧 <strong>Consejo:</strong> Revisa tu carpeta de spam si no lo encuentras en tu bandeja principal.';
    modalEmail.style.display = 'block';
}

// Función para mostrar modal de "ya registrado"
function showAlreadyRegisteredModal(email) {
    const modal = document.getElementById('successModal');
    const modalIcon = modal.querySelector('.modal-icon i');
    const modalTitle = modal.querySelector('.modal-title');
    const modalMessage = modal.querySelector('.modal-message');
    const modalEmail = document.getElementById('modalEmail');
    const modalActions = modal.querySelector('.modal-actions');
    
    // Cambiar a estilo de "ya registrado"
    modalIcon.className = 'fas fa-user-check';
    modalIcon.parentElement.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    modalTitle.textContent = '¡Ya estás registrado! 🎉';
    modalMessage.textContent = '¡Genial! Ya tienes tu lugar reservado. Lo mejor está por venir, mantente atento a tu correo.';
    modalEmail.textContent = email;
    modalEmail.style.display = 'block';
    
    // Cambiar botones
    modalActions.innerHTML = `
        <button class="modal-btn modal-btn-primary" onclick="closeModal()">
            <i class="fas fa-check"></i>
            ¡Perfecto!
        </button>
        <button class="modal-btn modal-btn-secondary" onclick="showEmailInfo()">
            <i class="fas fa-info-circle"></i>
            Más información
        </button>
    `;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Función para mostrar información adicional
function showEmailInfo() {
    const modalMessage = document.querySelector('.modal-message');
    const infoBtn = document.querySelector('.modal-btn-secondary');
    const originalText = infoBtn.innerHTML;
    
    // Cambiar mensaje
    modalMessage.textContent = 'Te notificaremos por email cuando lancemos la plataforma. También puedes seguirnos en redes sociales para estar al día con las novedades.';
    
    // Cambiar botón
    infoBtn.innerHTML = '<i class="fas fa-check"></i> Entendido';
    infoBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    // Restaurar después de 3 segundos
    setTimeout(() => {
        infoBtn.innerHTML = originalText;
        infoBtn.style.background = '';
        modalMessage.textContent = '¡Genial! Ya tienes tu lugar reservado. Lo mejor está por venir, mantente atento a tu correo.';
    }, 3000);
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}); 