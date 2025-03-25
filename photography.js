/**
 * Photography Page JavaScript
 * Handles gallery filtering, lightbox, and other photography-specific functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery filtering
    initGalleryFilter();
    
    // Initialize lightbox
    initLightbox();
    
    // Initialize form validation
    initContactForm();
    
    // Initialize animations
    initAnimations();
});

// Gallery filtering functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0 || galleryItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
            
            // Animate items after filtering
            setTimeout(() => {
                animateGalleryItems();
            }, 100);
        });
    });
    
    // Trigger click on 'all' filter to initialize gallery
    document.querySelector('.filter-btn[data-filter="all"]').click();
}

// Lightbox functionality
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const body = document.body;
    
    if (galleryItems.length === 0) return;
    
    // Preload images for faster display
    const preloadImages = () => {
        galleryItems.forEach(item => {
            const img = new Image();
            img.src = item.src;
        });
    };
    
    // Call preload function
    preloadImages();
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxImg = document.createElement('img');
            lightboxImg.className = 'lightbox-img';
            
            // Start loading indicator
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.innerHTML = '<div class="spinner"></div>';
            lightboxContent.appendChild(loadingIndicator);
            
            // Set up image loading
            lightboxImg.onload = function() {
                // Remove loading indicator once image is loaded
                if (lightboxContent.contains(loadingIndicator)) {
                    lightboxContent.removeChild(loadingIndicator);
                }
                lightboxContent.appendChild(lightboxImg);
            };
            
            // Set image source after setting up onload handler
            lightboxImg.src = item.src;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            
            // Add elements to DOM
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            body.appendChild(lightbox);
            
            // Prevent scrolling when lightbox is open
            body.style.overflow = 'hidden';
            
            // Add animation class
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            
            // Close lightbox when clicking close button or outside the image
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Close lightbox when pressing Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    body.removeChild(lightbox);
                    body.style.overflow = '';
                }, 300);
            }
        });
    });
}

// Contact form validation
function initContactForm() {
    const contactForm = document.getElementById('photography-contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;
        
        if (!name.value.trim()) {
            highlightError(name);
            isValid = false;
        } else {
            removeError(name);
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            highlightError(email);
            isValid = false;
        } else {
            removeError(email);
        }
        
        if (!message.value.trim()) {
            highlightError(message);
            isValid = false;
        } else {
            removeError(message);
        }
        
        if (isValid) {
            // In a real application, you would send the form data to a server
            // For now, we'll just show a success message
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            // Reset the form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                successMessage.remove();
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = false;
                }
            }, 3000);
        }
    });
}

// Helper functions for form validation
function highlightError(element) {
    element.classList.add('error');
    element.parentElement.classList.add('error-group');
}

function removeError(element) {
    element.classList.remove('error');
    element.parentElement.classList.remove('error-group');
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Animation functions
function initAnimations() {
    // Initial animations
    animateGalleryItems();
    animateServiceCards();
    
    // Scroll animations
    window.addEventListener('scroll', () => {
        animateGalleryItems();
        animateServiceCards();
    });
}

function animateGalleryItems() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const triggerBottom = window.innerHeight * 0.8;
    
    galleryItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < triggerBottom) {
            item.classList.add('visible');
        }
    });
}

function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.photo-service-card');
    const triggerBottom = window.innerHeight * 0.8;
    
    serviceCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < triggerBottom) {
            card.classList.add('visible');
        }
    });
}
