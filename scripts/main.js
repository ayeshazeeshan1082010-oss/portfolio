/**
 * Ayesha Zeeshan Portfolio - Main Interactivity Script
 * Sticky Header, Mobile Drawer, Scroll Reveal & Working Contact Form (FormSubmit.co)
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
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- 5. CONTACT FORM — WORKING EMAIL DELIVERY via FormSubmit.co --- */
  /*
     ⚠️ IMPORTANT — Activate FormSubmit:
     1. First submit test karo website se
     2. ayeshazeeshan1082010@gmail.com pe ek email aayegi (FormSubmit se)
     3. Us email mein "Activate" button pe click karo
     4. Uske baad saare messages direct Gmail pe aayenge — koi signup nahi
  */
  const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/ayeshazeeshan1082010@gmail.com';

  const contactForm = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let isValid = true;

      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      // Validation
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

      if (!isValid) return;

      // Show loading state
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = 'Sending...';

      const payload = {
        name: fullName.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        message: message.value.trim(),
        _subject: `Portfolio Message — ${subject.value.trim()}`,
        _template: 'table',
        _captcha: 'false',
      };

      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('Request failed');

        // Success
        if (successBanner) {
          successBanner.style.display = 'flex';
        }
        contactForm.reset();

        setTimeout(() => {
          if (successBanner) successBanner.style.display = 'none';
        }, 6000);

      } catch (err) {
        // Fallback — open user's mail client
        const mailto = `mailto:ayeshazeeshan1082010@gmail.com?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(
          `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`
        )}`;
        window.location.href = mailto;

        if (successBanner) {
          successBanner.style.display = 'flex';
          successBanner.querySelector('span').textContent =
            "Opening your email app — please send the message from there.";
        }
        setTimeout(() => {
          if (successBanner) successBanner.style.display = 'none';
        }, 6000);

      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Send Message';
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

  // Live clear errors on input
  document.querySelectorAll('.form-input, .form-textarea').forEach(el => {
    el.addEventListener('input', () => clearError(el));
  });

});