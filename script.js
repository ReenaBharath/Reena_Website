/**
 * Main JavaScript file for Reena's Portfolio
 * Handles navigation, animations, and interactive elements
 */

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const projectCards = document.querySelectorAll('.project-card');
const techCards = document.querySelectorAll('.tech-card');
const serviceCards = document.querySelectorAll('.service-card');

// Make all sections visible immediately
document.addEventListener('DOMContentLoaded', () => {
    sections.forEach(section => {
        section.classList.add('section-visible');
    });
    
    // Initialize tech level bars
    initTechLevels();
    
    // Initialize form validation
    initContactForm();
});

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#" or external link
        if (targetId === '#' || !targetId.startsWith('#')) return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Function to scroll to a section (used by buttons)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80, // Offset for header
            behavior: 'smooth'
        });
    }
}

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Animate elements on scroll
    animateOnScroll();
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href && href.includes('#' + current)) {
            link.classList.add('active');
        }
    });
});

// Initialize technology level bars
function initTechLevels() {
    document.querySelectorAll('.tech-level-bar').forEach(bar => {
        const level = bar.getAttribute('data-level') || 0;
        bar.style.width = `${level}%`;
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const triggerBottom = window.innerHeight * 0.8;
    
    [projectCards, techCards, serviceCards].forEach(cards => {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                card.classList.add('visible');
            }
        });
    });
}

// Contact form validation and submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
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

// Project filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            document.querySelectorAll('.project-card').forEach(project => {
                if (filterValue === 'all') {
                    project.style.display = 'block';
                } else {
                    if (project.classList.contains(filterValue)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                }
            });
        });
    });
}
