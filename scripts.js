// Mobile Menu Functionality
const mobileMenu = document.getElementById('mobileMenu');
const menuContent = mobileMenu.querySelector('div');
const openButton = document.getElementById('openMenu');
const closeButton = document.getElementById('closeMenu');
const menuLinks = mobileMenu.querySelectorAll('a');

function openMenu() {
  document.body.style.overflow = 'hidden';
  mobileMenu.classList.remove('hidden');
  requestAnimationFrame(() => {
    mobileMenu.classList.remove('opacity-0');
    menuContent.classList.remove('translate-x-full');
  });
}

function closeMenu() {
  mobileMenu.classList.add('opacity-0');
  menuContent.classList.add('translate-x-full');
  document.body.style.overflow = '';
  setTimeout(() => {
    mobileMenu.classList.add('hidden');
  }, 300);
}

openButton.addEventListener('click', openMenu);
closeButton.addEventListener('click', closeMenu);

// Close menu when clicking outside
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    closeMenu();
  }
});

// Close menu when clicking a link
menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Add hover effect to menu button bars
const menuBars = openButton.querySelectorAll('div > div');
openButton.addEventListener('mouseenter', () => {
  menuBars[0].style.transform = 'translateX(-4px)';
  menuBars[2].style.transform = 'translateX(4px)';
});

openButton.addEventListener('mouseleave', () => {
  menuBars[0].style.transform = '';
  menuBars[2].style.transform = '';
});

// Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// Counter Animation
function animateCounter(element, target, duration = 2000) {
  console.log('Animating counter:', element?.id, 'to target:', target);
  if (!element) {
    console.log('Element not found');
    return;
  }
  
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

function getDaysSinceStart() {
  const startDate = new Date('2022-02-09');
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log('Calculated days:', diffDays);
  return diffDays;
}

// Initialize counters
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  const counterSection = document.querySelector('.counter-section');
  console.log('Counter section found:', !!counterSection);
  
  if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log('Section visibility:', entry.isIntersecting);
        if (entry.isIntersecting) {
          const daysCounter = document.getElementById('daysCounter');
          const customersCounter = document.getElementById('customersCounter');
          
          console.log('Found counters:', !!daysCounter, !!customersCounter);
          
          if (daysCounter) {
            const daysCount = getDaysSinceStart();
            animateCounter(daysCounter, daysCount);
          }
          
          if (customersCounter) {
            animateCounter(customersCounter, 10);
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    observer.observe(counterSection);
    console.log('Observer set up');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('sib-form');
  const submitButton = document.getElementById('submit-button');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  const emailInput = document.getElementById('EMAIL');

  if (form) {
    form.addEventListener('submit', function(e) {
      // Hide any existing messages
      successMessage.classList.add('hidden');
      errorMessage.classList.add('hidden');
      
      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        e.preventDefault();
        errorMessage.classList.remove('hidden');
        return;
      }

      // Disable the button during submission
      submitButton.disabled = true;
      submitButton.classList.add('opacity-50', 'cursor-not-allowed');
    });
  }

  // Listen for success/error messages from Brevo
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const sibSuccess = document.querySelector('.sib-form-message-panel--active.sib-form-message-panel--success');
        const sibError = document.querySelector('.sib-form-message-panel--active:not(.sib-form-message-panel--success)');
        
        if (sibSuccess) {
          successMessage.classList.remove('hidden');
          submitButton.disabled = true;
          emailInput.value = '';
          submitButton.classList.add('opacity-50', 'cursor-not-allowed');
        } else if (sibError) {
          errorMessage.classList.remove('hidden');
          submitButton.disabled = false;
          submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
        }
      }
    });
  });

  // Start observing the form container
  const formContainer = document.getElementById('sib-form-container');
  if (formContainer) {
    observer.observe(formContainer, { attributes: true, subtree: true });
  }
}); 