// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initFAQ();
    initCTAButtons();
    initScrollAnimations();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove background opacity based on scroll position
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// FAQ Accordion functionality - FIXED
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        // Set initial state
        answer.style.maxHeight = '0px';
        answer.style.padding = '0 20px';    
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
        
        question.addEventListener('click', (e) => {
            e.preventDefault();

            const isCurrentlyActive = item.classList.contains('active');
            
            // Close all other FAQ items first
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = '0px';
                    otherAnswer.style.padding = '0 20px';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isCurrentlyActive) {
                // Close current item
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
                answer.style.padding = '0 20px';
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Open current item
                item.classList.add('active');
                const scrollHeight = answer.scrollHeight;
                answer.style.maxHeight = scrollHeight + 'px';
                answer.style.padding = '0 20px 20px 20px';
                icon.style.transform = 'rotate(45deg)';
                
                // After transition, set to auto for better responsiveness
                setTimeout(() => {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = 'auto';
                    }
                }, 300);
            }
        });
    });
}

// CTA Button functionality
function initCTAButtons() {
    // All CTA buttons
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        // Add click handler for demo/contact buttons
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.textContent.trim();
            
            // Simulate different actions based on button text
            if (buttonText.includes('Demo') || buttonText.includes('demo')) {
                handleDemoRequest(this);
            } else if (buttonText.includes('Schedule') || buttonText.includes('Call')) {
                handleScheduleCall(this);
            } else if (buttonText.includes('Contact') || buttonText.includes('Started')) {
                handleContactRequest(this);
            }
        });
        
        // Add hover effect enhancement
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Handle demo request
function handleDemoRequest(button) {
    const originalText = button.textContent;    
    const originalBg = button.style.background || getComputedStyle(button).backgroundColor;
    
    button.textContent = 'Scheduling...';
    button.disabled = true;
    button.style.opacity = '0.8';
    
    // Simulate API call
    setTimeout(() => {
        button.textContent = 'Demo Requested!';
        button.style.background = '#22c55e';
        
        // Show success message
        showNotification('Demo request submitted! We\'ll contact you within 24 hours.', 'success');
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = originalBg;
            button.style.opacity = '1';
        }, 3000);
    }, 1500);
}

// Handle schedule call
function handleScheduleCall(button) {
    const originalText = button.textContent;
    const originalBg = button.style.background || getComputedStyle(button).backgroundColor;
    
    button.textContent = 'Scheduling...';
    button.disabled = true;
    button.style.opacity = '0.8';
    
    // Simulate API call
    setTimeout(() => {
        button.textContent = 'Call Scheduled!';
        button.style.background = '#22c55e';
        
        // Show success message
        showNotification('Scoping call scheduled! Check your email for calendar invite.', 'success');
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = originalBg;
            button.style.opacity = '1';
        }, 3000);
    }, 1500);
}

// Handle contact request
function handleContactRequest(button) {
    const originalText = button.textContent;
    const originalBg = button.style.background || getComputedStyle(button).backgroundColor;
    
    button.textContent = 'Connecting...';
    button.disabled = true;
    button.style.opacity = '0.8';
    
    // Simulate API call
    setTimeout(() => {
        button.textContent = 'Message Sent!';
        button.style.background = '#22c55e';
        
        // Show success message
        showNotification('Thank you for your interest! Our team will reach out shortly.', 'success');
        
        // Reset button after delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = originalBg;
            button.style.opacity = '1';
        }, 3000);
    }, 1500);   
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: var(--font-family-base);
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `      
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.8';
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

// Remove notification
function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Scroll animations
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.outcome-card, .adapt-item, .delivery-item, .cta-option');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scrolling for internal links (if any are added)
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize enhanced effects on load
window.addEventListener('load', () => {
    initSmoothScrolling();
});

// Handle form submissions (if contact forms are added later)
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Form submitted:', data);
    showNotification('Thank you for your submission! We\'ll be in touch soon.', 'success');
}

    // Utility function for debouncing
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

    // Performance optimization: debounce scroll events
    const debouncedScroll = debounce(() => {
        
    }, 10);