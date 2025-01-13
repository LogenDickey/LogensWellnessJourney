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

// Counter Animation
function animateCounter(element, target, duration = 2000) {
  if (!element) return;
  
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
  return diffDays;
}

// Initialize counters with Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
  const daysCounter = document.getElementById('daysCounter');
  const customersCounter = document.getElementById('customersCounter');
  
  // Create intersection observer
  const observerOptions = {
    root: null, // use viewport
    rootMargin: '0px',
    threshold: 0.1 // trigger when 10% of element is visible
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        if (element.id === 'daysCounter') {
          animateCounter(element, getDaysSinceStart());
        } else if (element.id === 'customersCounter') {
          animateCounter(element, 10);
        }
        observer.unobserve(element); // Stop observing once animation starts
      }
    });
  }, observerOptions);

  // Observe counters if they exist
  if (daysCounter) {
    counterObserver.observe(daysCounter);
  }
  if (customersCounter) {
    counterObserver.observe(customersCounter);
  }
  
  // Form handling
  const form = document.getElementById('sib-form');
  const submitButton = document.getElementById('submit-button');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  const emailInput = document.getElementById('EMAIL');

  if (form) {
    form.addEventListener('submit', function(e) {
      successMessage.classList.add('hidden');
      errorMessage.classList.add('hidden');
      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        e.preventDefault();
        errorMessage.classList.remove('hidden');
        return;
      }

      submitButton.disabled = true;
      submitButton.classList.add('opacity-50', 'cursor-not-allowed');
    });
  }
}); 