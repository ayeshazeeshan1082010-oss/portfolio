/**
 * Ayesha Zeeshan Portfolio - Main Interactivity Script
 * Sticky Header, Mobile Drawer, Modal Handler, Form Validation & Scroll Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --- 1. STICKY HEADER SCROLL EFFECT --- */
  const header = document.getElementById('header');
  
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();

  /* --- 2. MOBILE MENU NAVIGATION TOGGLE --- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'ri-close-line' : 'ri-menu-line';
      }
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-line';
      });
    });
  }

  /* --- 3. ACTIVE NAV LINK HIGHLIGHT & SMOOTH SCROLL --- */
  const sections = document.querySelectorAll('section[id]');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  /* --- 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver) --- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, optional: keep revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- 5. AZURE GRAND HOTEL MODAL HANDLER --- */
  const modal = document.getElementById('azure-modal');
  const azureBtn = document.getElementById('azure-project-btn');
  const modalCloseBtns = document.querySelectorAll('.close-azure-modal');

  if (modal && azureBtn) {
    azureBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    modalCloseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        closeAzureModal();
      });
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAzureModal();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeAzureModal();
      }
    });
  }

  function closeAzureModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* --- 6. CONTACT FORM VALIDATION & SUBMISSION --- */
  const contactForm = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Fields
      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      // Validation logic
      if (!fullName.value.trim()) {
        setError(fullName, 'Full name is required');
        isValid = false;
      } else {
        clearError(fullName);
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim()) {
        setError(email, 'Email address is required');
        isValid = false;
      } else if (!emailPattern.test(email.value.trim())) {
        setError(email, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(email);
      }

      if (!subject.value.trim()) {
        setError(subject, 'Subject is required');
        isValid = false;
      } else {
        clearError(subject);
      }

      if (!message.value.trim()) {
        setError(message, 'Message is required');
        isValid = false;
      } else {
        clearError(message);
      }

      if (isValid) {
        // Show success state
        if (successBanner) {
          successBanner.style.display = 'flex';
        }
        contactForm.reset();

        // Auto-hide success message after 6 seconds
        setTimeout(() => {
          if (successBanner) successBanner.style.display = 'none';
        }, 6000);
      }
    });
  }

  function setError(inputElement, errorMessage) {
    const parentGroup = inputElement.closest('.form-group');
    if (parentGroup) {
      parentGroup.classList.add('invalid');
      const errorSpan = parentGroup.querySelector('.error-msg');
      if (errorSpan) errorSpan.textContent = errorMessage;
    }
  }

  function clearError(inputElement) {
    const parentGroup = inputElement.closest('.form-group');
    if (parentGroup) {
      parentGroup.classList.remove('invalid');
    }
  }
});
