/**
 * Photography Page JavaScript
 * Handles gallery filtering, lightbox, and other photography-specific functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Load all photographs dynamically
    loadAllPhotographs();
    
    // Initialize gallery filtering
    initGalleryFilter();
    
    // Initialize lightbox
    initLightbox();
    
    // Initialize form validation
    initContactForm();
    
    // Initialize animations
    initAnimations();
});

// Dynamically load all photographs
function loadAllPhotographs() {
    // This is a list of all photograph categories
    const categories = ['architecture', 'street', 'nature', 'events'];
    
    // Get the gallery grid container
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Clear any existing content
    if (galleryGrid) {
        // Keep track of which images we've already added
        const addedImages = new Set();
        
        // First, get all the existing images from the HTML
        const existingItems = galleryGrid.querySelectorAll('.gallery-item img');
        existingItems.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const filename = src.split('/').pop();
                addedImages.add(filename);
            }
        });
        
        // Define a list of all image filenames in the Photography directory
        // This is a comprehensive list of all your images
        const allPhotos = [
            'A.jpg', 'B.jpg', 'C.jpg', 'E.jpg', 'F.jpg', 'G.jpg', 'H.jpg', 'I.jpg', 'J.jpg', 'K.jpg', 'L.jpg',
            'M.jpg', 'N.jpg', 'O.jpg', 'P.jpg', 'R.jpg', 'S.jpg', 'T.jpg', 'U.jpg', 'V.jpg', 'W.jpg', 'X.jpg',
            'Y.jpg', 'Z.jpg', 'AA.jpg', 'AB.jpg', 'AC.jpg', 'AE.jpg', 'AF.jpg', 'AG.jpg', 'AH.jpg', 'AI.jpg',
            'AJ.jpg', 'AK.jpg', 'AL.jpg', 'AM.jpg', 'AN.jpg', 'AO.jpg', 'AP.jpg', 'AQ.jpg', 'AR.jpg', 'AS.jpg',
            'AT.jpg', 'AU.jpg', 'AV.jpg', 'AW.jpg', 'AX.jpg', 'AY.jpg', 'AZ.jpg', 'BA.jpg', 'BB.jpg', 'BC.jpg',
            'BD.jpg', 'BF.jpg', 'BG.jpg', 'BH.jpg', 'BI.jpg', 'BK.jpg', 'BL.jpg', 'BM.jpg', 'BN.jpg', 'BO.jpg',
            'BP.jpg', 'BR.jpg', 'BS.jpg', 'BT.jpg', 'BU.jpg', 'BV.jpg', 'BW.jpg', 'BX.jpg', 'BY.jpg', 'BZ.jpg',
            'CA.jpg', 'CB.jpg', 'CC.jpg', 'CD.jpg', 'CE.jpg', 'CF.jpg', 'CG.jpg', 'CH.jpg', 'CI.jpg', 'CJ.jpg',
            'CK.jpg', 'CL.jpg', 'CM.jpg', 'CN.jpg', 'CO.jpg', 'CP.jpg', 'CQ.jpg', 'CR.jpg', 'CS.jpg', 'CT.jpg',
            'CU.jpg', 'CV.jpg', 'CW.jpg', 'CX.jpg', 'CY.jpg', 'CZ.jpg', 'DA.jpg', 'DB.jpg', 'DC.jpg', 'DD.jpg',
            'DE.jpg', 'DF.jpg', 'DG.jpg', 'DI.jpg', 'DJ.jpg', 'DK.jpg', 'DL.jpg', 'DM.jpg', 'DN.jpg', 'DO.jpg',
            'DP.jpg', 'DQ.jpg', 'DR.jpg', 'DS.jpg', 'DT.jpg', 'DU.jpg', 'DV.jpg', 'DW.jpg', 'DX.jpg', 'DY.jpg',
            'DZ.jpg', 'EA.jpg', 'EB.jpg', 'P1013437.jpg', 'P1013440.jpg', 'P1013441.jpg', 'P1013442.jpg',
            'P1013443.jpg', 'P1013444.jpg', 'P1013445.jpg', 'P1013446.jpg', 'P1013448.jpg', 'P1013453.jpg',
            'P1013454.jpg', 'P1013456.jpg', 'P1013462.jpg', 'P1013463.jpg', 'P1013465.jpg', 'P1013467.jpg',
            'P1013468.jpg', 'P1013473.jpg', 'P1013474.jpg', 'P1013478.jpg', 'P1013481.jpg', 'P1013483.jpg',
            'P1013489.jpg', 'P1013493.jpg', 'P1013494.jpg', 'P1013495.jpg', 'P1013497.jpg', 'P1013500.jpg',
            'P1013501.jpg', 'P1013502.jpg', 'P1013506.jpg', 'P1013508.jpg', 'P1013512.jpg', 'P1013515.jpg',
            'P1013516.jpg', 'P1153386.jpg', 'P1153387.jpg', 'IMG20230820151515.jpg', 'AAV.jpg', 'NQ.jpg', 'RC.jpg'
        ];
        
        // Add any photos that aren't already in the gallery
        allPhotos.forEach((photo, index) => {
            // Skip if we've already added this image
            if (addedImages.has(photo)) {
                return;
            }
            
            // Determine which category this image belongs to
            // We'll use a simple pattern: distribute evenly across categories
            const categoryIndex = index % categories.length;
            const category = categories[categoryIndex];
            
            // Create a title from the filename
            let title = photo.replace('.jpg', '').replace(/([A-Z])/g, ' $1').trim();
            if (title.startsWith('P')) {
                title = 'Photo ' + title.substring(1);
            }
            
            // Create the gallery item
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${category}`;
            
            // Create the image element
            const img = document.createElement('img');
            img.src = `images/Photography/${photo}`;
            img.alt = title;
            img.loading = 'lazy';
            
            // Create the overlay
            const overlay = document.createElement('div');
            overlay.className = 'gallery-item-overlay';
            
            // Create the title
            const titleElement = document.createElement('h3');
            titleElement.className = 'gallery-item-title';
            titleElement.textContent = title;
            
            // Create the location
            const location = document.createElement('p');
            location.className = 'gallery-item-location';
            location.innerHTML = '<i class="fas fa-map-marker-alt"></i> Prague, Czech Republic';
            
            // Add everything to the DOM
            overlay.appendChild(titleElement);
            overlay.appendChild(location);
            galleryItem.appendChild(img);
            galleryItem.appendChild(overlay);
            galleryGrid.appendChild(galleryItem);
        });
    }
}

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
