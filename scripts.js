// Mobile Menu Functionality
const openMenuButton = document.getElementById('openMenu');
const closeMenuButton = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

if (openMenuButton && closeMenuButton && mobileMenu) {
  openMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu.classList.remove('opacity-0');
      mobileMenu.querySelector('div').classList.remove('translate-x-full');
    }, 10);
  });

  closeMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('opacity-0');
    mobileMenu.querySelector('div').classList.add('translate-x-full');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);
  });
}

// Counter Animation
function animateCounter(element, target, duration = 2000, startValue = 0) {
  const start = startValue;
  const increment = (target - start) / (duration / 16);
  let current = start;

  const animate = () => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target).toLocaleString();
    } else {
      element.textContent = Math.round(current).toLocaleString();
      requestAnimationFrame(animate);
    }
  };

  animate();
}

// Calculate days since February 9, 2022
const startDate = new Date('2022-02-09');
const currentDate = new Date();
const daysSince = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

// Initialize counters if elements exist
const daysCounter = document.getElementById('daysCounter');
const customersCounter = document.getElementById('customersCounter');

if (daysCounter) {
  animateCounter(daysCounter, daysSince);
}

if (customersCounter) {
  animateCounter(customersCounter, 10); // Updated to 10 warriors
}

// Start Your Journey Page Functionality
document.addEventListener('DOMContentLoaded', function() {
  const gutHealthCard = document.getElementById('gut-health-card');
  const physicalWellnessCard = document.getElementById('physical-wellness-card');
  const gutHealthContent = document.getElementById('gut-health');
  const physicalWellnessContent = document.getElementById('physical-wellness');

  if (gutHealthCard && physicalWellnessCard && gutHealthContent && physicalWellnessContent) {
    // Add transition styles
    gutHealthContent.classList.add('content-section');
    physicalWellnessContent.classList.add('content-section');

    // Initially hide content sections
    gutHealthContent.classList.remove('active');
    physicalWellnessContent.classList.remove('active');

    function showPath(pathCard, contentSection, otherSection) {
      // Reset all cards
      document.querySelectorAll('.path-card').forEach(card => {
        card.classList.remove('active');
      });
      
      // Highlight selected card
      pathCard.classList.add('active');
      
      // Hide other section
      otherSection.classList.remove('active');
      
      // Show selected section
      contentSection.classList.add('active');
      
      // Smooth scroll to content
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Add both click and touch events
    function addClickTouchHandler(element, handler) {
      element.addEventListener('click', handler);
      element.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Prevent double-firing on mobile devices
        handler();
      });
    }

    addClickTouchHandler(gutHealthCard, () => {
      showPath(gutHealthCard, gutHealthContent, physicalWellnessContent);
    });

    addClickTouchHandler(physicalWellnessCard, () => {
      showPath(physicalWellnessCard, physicalWellnessContent, gutHealthContent);
    });
  }
}); 