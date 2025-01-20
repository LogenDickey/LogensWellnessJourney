document.addEventListener('DOMContentLoaded', function() {
  // Parallax Scrolling Effect
  const parallaxImages = document.querySelectorAll('.hero-image');
  const heroSection = document.querySelector('.hero-section');
  let ticking = false;

  function updateParallax() {
    if (!heroSection) return;
    
    const scrolled = window.pageYOffset;
    const heroHeight = heroSection.offsetHeight;
    const heroBottom = heroSection.offsetTop + heroHeight;
    
    // Only apply parallax effect while the hero section is in view
    if (scrolled <= heroBottom) {
      parallaxImages.forEach(image => {
        if (image.classList.contains('active')) {
          const speed = 0.4; // Adjust this value to change parallax intensity
          const yPos = scrolled * speed;
          image.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.05)`;
        }
      });
    }
    
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
      });
      ticking = true;
    }
  });

  // Hero Image Rotation
  const heroImages = document.querySelectorAll('.hero-image');
  let currentImageIndex = 0;

  function rotateImages() {
    const currentImage = heroImages[currentImageIndex];
    const nextIndex = (currentImageIndex + 1) % heroImages.length;
    const nextImage = heroImages[nextIndex];

    // Prepare next image with no transition
    nextImage.style.transition = 'none';
    nextImage.style.opacity = '0';
    
    // Force browser reflow
    void nextImage.offsetHeight;

    // Add active class to next image
    nextImage.classList.add('active');
    
    // Apply current scroll position to new image
    const scrolled = window.pageYOffset;
    const speed = 0.4;
    const yPos = scrolled * speed;
    nextImage.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.05)`;
    
    // Start transitions
    setTimeout(() => {
      // Set up smooth transitions
      currentImage.style.transition = 'opacity 2s ease-in-out';
      nextImage.style.transition = 'opacity 2s ease-in-out';
      
      // Fade out current image
      currentImage.style.opacity = '0';
      
      // After fade out is complete, remove classes
      setTimeout(() => {
        currentImage.classList.remove('active');
      }, 2000);
      
      // Fade in next image
      nextImage.style.opacity = '0.9';
    }, 50);

    // Update index
    currentImageIndex = nextIndex;
  }

  if (heroImages.length > 0) {
    // Show first image immediately with animation
    const firstImage = heroImages[0];
    firstImage.style.transition = 'opacity 2s ease-in-out';
    firstImage.classList.add('active');
    firstImage.style.opacity = '0.9';

    // Start rotation after a delay
    setTimeout(() => {
      setInterval(rotateImages, 8000);
    }, 8000);
  }

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

  // Counter Animation with visibility check
  function animateCounter(element, target, duration = 2000, startValue = 0) {
    let hasAnimated = false;

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

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          animate();
          hasAnimated = true;
          counterObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    const rect = element.getBoundingClientRect();
    const isVisible = rect.top >= 0 && 
                     rect.left >= 0 && 
                     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                     rect.right <= (window.innerWidth || document.documentElement.clientWidth);

    if (isVisible && !hasAnimated) {
      animate();
      hasAnimated = true;
    } else {
      counterObserver.observe(element);
    }
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
    animateCounter(customersCounter, 10); // Set to 10 as placeholder
  }

  // Enhanced scroll animations with earlier triggers
  function createScrollAnimation(options = {}) {
    return new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (options.once) observer.unobserve(entry.target);
        } else if (!options.once) {
          entry.target.classList.remove('visible');
        }
      });
    }, {
      root: null,
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px'
    });
  }

  // Create observers for different animation types with earlier triggers
  const slideObserver = createScrollAnimation({ 
    once: false,
    threshold: 0.01,
    rootMargin: '700px 0px 130px 0px'  // Changed to 130px to have animation trigger earlier
  });

  const fadeObserver = createScrollAnimation({ 
    once: false,
    threshold: 0.01,
    rootMargin: '700px 0px 130px 0px'  // Changed to 130px to have animation trigger earlier
  });

  // Debug logging
  console.log('Initializing animations...');
  const slideElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');
  const fadeElements = document.querySelectorAll('.fade-in');

  console.log('Found slide elements:', slideElements.length);
  console.log('Found fade elements:', fadeElements.length);

  // Observe all animated elements
  slideElements.forEach(element => {
    slideObserver.observe(element);
    console.log('Observing slide element:', element.className);
  });

  fadeElements.forEach(element => {
    fadeObserver.observe(element);
    console.log('Observing fade element:', element.className);
  });

  // Add floating animation observer
  const floatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'none';
        entry.target.offsetHeight; // Trigger reflow
        entry.target.style.animation = '';
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.float-animation, .float-animation-delayed').forEach(element => {
    floatObserver.observe(element);
  });

  // Start Your Journey Page Functionality
  const gutHealthCard = document.getElementById('gut-health-card');
  const physicalWellnessCard = document.getElementById('physical-wellness-card');
  const gutHealthContent = document.getElementById('gut-health');
  const physicalWellnessContent = document.getElementById('physical-wellness');

  if (gutHealthCard && physicalWellnessCard && gutHealthContent && physicalWellnessContent) {
    console.log('Elements found:', { gutHealthCard, physicalWellnessCard, gutHealthContent, physicalWellnessContent });
    
    // Add transition styles
    gutHealthContent.classList.add('content-section');
    physicalWellnessContent.classList.add('content-section');

    // Initially hide content sections
    gutHealthContent.classList.remove('active');
    physicalWellnessContent.classList.remove('active');

    function showPath(pathCard, contentSection, otherSection) {
      console.log('showPath called for:', contentSection.id);
      
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

    // Handle both click and touch events
    ['click', 'touchend'].forEach(eventType => {
      gutHealthCard.addEventListener(eventType, function(e) {
        e.preventDefault();
        showPath(gutHealthCard, gutHealthContent, physicalWellnessContent);
      });

      physicalWellnessCard.addEventListener(eventType, function(e) {
        e.preventDefault();
        showPath(physicalWellnessCard, physicalWellnessContent, gutHealthContent);
      });
    });
  } else {
    console.log('Some elements not found');
  }

  // Fade-in animation for bullet points
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    threshold: 0.1
  });

  // Observe all fade-in elements
  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });
}); 