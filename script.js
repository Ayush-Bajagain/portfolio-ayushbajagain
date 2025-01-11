// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateIcon();
}

function toggleTheme() {
    body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
    body.classList.toggle('dark-mode');
    updateIcon();
    
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode');
    
    // Remove transition after animation completes
    setTimeout(() => {
        body.style.transition = '';
    }, 500);
}

function updateIcon() {
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);

// Mobile menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const menuIcon = menuToggle.querySelector('i');

// Function to close menu
function closeMenu() {
    nav.classList.remove('active');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
}

// Function to toggle menu
function toggleMenu() {
    nav.classList.toggle('active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
}

// Toggle menu on button click
menuToggle.addEventListener('click', toggleMenu);

// Close menu when clicking a nav link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
    }
});

// Close menu when window is resized to larger screen
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing effect for hero text
const heroText = document.querySelector('.hero-description');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let charIndex = 0;

    function typeText() {
        if (charIndex < text.length) {
            heroText.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        }
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Function to animate skill cards
function animateSkillCards() {
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Create observer for sections and project cards
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skills-grid')) {
                animateSkillCards();
            }
            if (entry.target.classList.contains('hero-description') && 
                !entry.target.classList.contains('typed')) {
                entry.target.classList.add('typed');
                typeText();
            }
        }
    });
}, observerOptions);

// Observe all sections and project cards
document.querySelectorAll('section, .project-card').forEach(el => {
    observer.observe(el);
});

// Enhanced contact form handling with Web3Forms
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';
        
        try {
            const formData = new FormData(contactForm);
            
            // Send form data to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Success state
                contactForm.reset();
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }, 2000);
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Error:', error);
            
            // Error state
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('error');
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error! Try again';
            
            // Reset button after 2 seconds
            setTimeout(() => {
                submitBtn.classList.remove('error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }, 2000);
        }
    });
}

// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight}`;

    scrollProgress.style.transform = `scaleX(${scroll})`;
    scrollProgress.style.opacity = scroll;
});

// Smooth reveal of scroll progress bar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        scrollProgress.style.transition = 'transform 0.3s, opacity 0.3s';
    }, 100);
}); 