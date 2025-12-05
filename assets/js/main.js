// Prestige Summit Co — Clean, Working Features
console.log('Prestige Summit Co — site loaded');

document.addEventListener('DOMContentLoaded', function() {
    // 1. FORM VALIDATION (if on contact page)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]');
            const name = this.querySelector('input[type="text"]');
            
            if (!name.value.trim()) {
                alert('Please enter your name');
                name.focus();
                return;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                alert('Please enter a valid email address');
                email.focus();
                return;
            }
            
            // Simulate sending
            const btn = this.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you! We\'ll contact you within 24 hours.');
                this.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }
    
    // 2. GALLERY LIGHTBOX (if on portfolio page)
    const galleryImages = document.querySelectorAll('.gallery img');
    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: rgba(0,0,0,0.95);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    cursor: pointer;
                `;
                
                const modalImg = document.createElement('img');
                modalImg.src = this.src;
                modalImg.alt = this.alt;
                modalImg.style.maxWidth = '90%';
                modalImg.style.maxHeight = '90%';
                modalImg.style.borderRadius = '10px';
                
                modal.appendChild(modalImg);
                document.body.appendChild(modal);
                
                // Close on click
                modal.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                // Close on ESC
                document.addEventListener('keydown', function close(e) {
                    if (e.key === 'Escape') {
                        document.body.removeChild(modal);
                        document.removeEventListener('keydown', close);
                    }
                });
            });
        });
    }
    
    // 3. MOBILE MENU TOGGLE (simple)
    const menuItems = document.querySelectorAll('nav a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Close mobile menu if needed
            if (window.innerWidth <= 768) {
                document.querySelector('nav ul').style.display = 'none';
            }
        });
    });
    
    // Helper function
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});
