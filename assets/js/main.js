// main.js - COMPLETE UPDATED VERSION
console.log('Prestige Summit Co — site loaded');

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize animations for cards
    initCardAnimations();
    
    // Initialize form validation if on contact page
    initFormValidation();
    
    // Initialize gallery if on portfolio page
    initGallery();
    
    // Add smooth scrolling for all anchor links
    initSmoothScrolling();
    
    // Add active state to current page in navigation
    highlightCurrentPage();
    
    // Add loading animation for images
    initImageLoading();
    
    console.log('All JavaScript functionality initialized');
});

function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.setProperty('--order', index);
        // Add intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-up');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(card);
    });
}

function initFormValidation() {
    const contactForm = document.querySelector('form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]');
        const email = this.querySelector('input[type="email"]');
        const message = this.querySelector('textarea');
        
        let isValid = true;
        let errorMessage = '';
        
        // Validate name
        if (!name.value.trim()) {
            isValid = false;
            showError(name, 'Name is required');
        } else {
            clearError(name);
        }
        
        // Validate email
        if (!email.value.trim()) {
            isValid = false;
            showError(email, 'Email is required');
        } else if (!isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email address');
        } else {
            clearError(email);
        }
        
        // Validate message
        if (!message.value.trim()) {
            isValid = false;
            showError(message, 'Message is required');
        } else if (message.value.trim().length < 10) {
            isValid = false;
            showError(message, 'Message should be at least 10 characters');
        } else {
            clearError(message);
        }
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will contact you within 24 hours.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
    
    // Add real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

function validateField(field) {
    if (field.type === 'email' && field.value.trim() && !isValidEmail(field.value)) {
        showError(field, 'Please enter a valid email address');
        return false;
    }
    return true;
}

function showError(field, message) {
    clearError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#e74c3c';
}

function clearError(field) {
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '#ddd';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery img');
    if (galleryImages.length === 0) return;
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create modal for image viewing
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                cursor: pointer;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            // Close modal on click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close on escape key
            document.addEventListener('keydown', function closeModal(e) {
                if (e.key === 'Escape') {
                    document.body.removeChild(modal);
                    document.removeEventListener('keydown', closeModal);
                }
            });
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref === 'index.html' && currentPage.includes('index.html'))) {
            link.classList.add('active');
            link.style.fontWeight = 'bold';
        }
    });
}

function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for fade-in effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Load image if it's in viewport
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}
