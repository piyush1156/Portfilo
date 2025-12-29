'use strict';

// Opening or closing sidebar
const elementToggleFunc = function (elem) { 
    elem.classList.toggle("active"); 
}

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function() {
        elementToggleFunc(sidebar); 
    });
}

// Page Navigation 
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

// Set initial page (About page)
document.addEventListener('DOMContentLoaded', function() {
    // Ensure About page is active by default
    if (pages.length > 0) {
        for(let i = 0; i < pages.length; i++) {
            if(pages[i].dataset.page === 'about') {
                pages[i].classList.add('active');
            } else {
                pages[i].classList.remove('active');
            }
        }
    }
    
    // Ensure About nav link is active by default
    if (navigationLinks.length > 0) {
        for(let i = 0; i < navigationLinks.length; i++) {
            if(navigationLinks[i].innerHTML.toLowerCase() === 'about') {
                navigationLinks[i].classList.add('active');
            } else {
                navigationLinks[i].classList.remove('active');
            }
        }
    }
});

// Navigation click handler
for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        // Remove active class from all pages and nav links
        for(let j = 0; j < pages.length; j++) {
            pages[j].classList.remove('active');
        }
        for(let j = 0; j < navigationLinks.length; j++) {
            navigationLinks[j].classList.remove('active');
        }
        
        // Add active class to clicked nav link
        this.classList.add('active');
        
        // Find and activate corresponding page
        const pageName = this.innerHTML.toLowerCase();
        for(let j = 0; j < pages.length; j++) {
            if(pages[j].dataset.page === pageName) {
                pages[j].classList.add('active');
                break;
            }
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
}

// Contact Form Validation
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs.length > 0 && formBtn) {
    // Function to check form validity
    const checkFormValidity = function() {
        let allValid = true;
        
        // Check all form inputs
        for(let j = 0; j < formInputs.length; j++) {
            if(formInputs[j].hasAttribute('required') && !formInputs[j].value.trim()) {
                allValid = false;
                break;
            }
        }
        
        // Check textarea if it exists
        const textarea = form.querySelector('textarea[required]');
        if (textarea && !textarea.value.trim()) {
            allValid = false;
        }
        
        return allValid;
    };
    
    for(let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
            if(checkFormValidity()) {
                formBtn.removeAttribute('disabled');
            } else { 
                formBtn.setAttribute('disabled', '');
            }
        });
    }
    
    // Also check textarea input
    const textarea = form.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', function() {
            if(checkFormValidity()) {
                formBtn.removeAttribute('disabled');
            } else { 
                formBtn.setAttribute('disabled', '');
            }
        });
    }
    
    // Form submission (prevent default for demo)
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if(checkFormValidity()) {
                alert('Thank you for your message! This is a demo form. In a real application, this would send your message.');
                form.reset();
                formBtn.setAttribute('disabled', '');
            }
        });
    }
}

// Initialize sidebar as active on larger screens
window.addEventListener('resize', function() {
    if (window.innerWidth >= 1250) {
        sidebar.classList.add('active');
        const sidebarInfoMore = document.querySelector('.sidebar-info-more');
        if (sidebarInfoMore) {
            sidebarInfoMore.style.opacity = '1';
            sidebarInfoMore.style.visibility = 'visible';
        }
    }
});

// Run on initial load
if (window.innerWidth >= 1250) {
    sidebar.classList.add('active');
    const sidebarInfoMore = document.querySelector('.sidebar-info-more');
    if (sidebarInfoMore) {
        sidebarInfoMore.style.opacity = '1';
        sidebarInfoMore.style.visibility = 'visible';
    }
}