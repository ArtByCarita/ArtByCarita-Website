/* ============================================================
   ArtByCarita — script.js
   Smooth interactions, animations, and fun extras
   ============================================================ */

'use strict';

/* ============================================================
   1. DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initDarkMode();
  initMobileMenu();
  initScrollReveal();
  initBackToTop();
  initSparkles();
  initContactForm();
});

/* ============================================================
   2. NAVIGATION — active link highlight + scroll class
   ============================================================ */
function initNav() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const sections  = document.querySelectorAll('section[id]');

  // Add 'scrolled' class to navbar when page scrolls down
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNavLink();
  }, { passive: true });

  // Highlight the correct nav link based on scroll position
  function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // Initial call
  updateActiveNavLink();
}

/* ============================================================
   3. DARK MODE TOGGLE
   ============================================================ */
function initDarkMode() {
  const toggleBtn  = document.getElementById('dark-mode-toggle');
  const icon       = document.getElementById('dark-mode-icon');
  const body       = document.body;

  // Load saved preference
  if (localStorage.getItem('artbycarita-dark') === 'true') {
    body.classList.add('dark-mode');
    icon.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    icon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('artbycarita-dark', isDark);
  });
}

/* ============================================================
   4. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const closeBtn    = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ============================================================
   5. SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  // Add .reveal class to elements you want to animate in
  const revealTargets = [
    '.section-header',
    '.about-text-panel',
    '.skill-card',
    '.port-card',
    '.price-card',
    '.addons-panel',
    '.process-section',
    '.product-card',
    '.event-card',
    '.redline-card',
    '.classified-panel',
    '.contact-form-panel',
    '.social-panel',
  ];

  // Apply reveal class to all targets
  revealTargets.forEach((selector, groupIndex) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Stagger children within groups
      if (i < 4) {
        el.classList.add(`reveal-delay-${i + 1}`);
      }
    });
  });

  // IntersectionObserver to trigger animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Fire once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ============================================================
   6. BACK TO TOP BUTTON
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   7. CURSOR SPARKLES ✦
   ============================================================ */
function initSparkles() {
  const container = document.getElementById('sparkle-container');
  const sparkleChars = ['✦', '★', '✧', '✩', '⭐', '✨', '·'];
  let lastSparkle = 0;
  const sparkleDelay = 60; // ms between sparkles

  // Only enable on non-touch devices for performance
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouchDevice) return;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle < sparkleDelay) return;
    lastSparkle = now;

    createSparkle(e.clientX, e.clientY);
  });

  function createSparkle(x, y) {
    const el = document.createElement('span');
    el.className = 'sparkle-particle';
    el.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];

    // Random offset from cursor
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;

    el.style.left   = `${x + offsetX}px`;
    el.style.top    = `${y + offsetY}px`;
    el.style.color  = getRandomSparkleColor();
    el.style.fontSize = `${8 + Math.random() * 10}px`;

    container.appendChild(el);

    // Remove after animation
    setTimeout(() => el.remove(), 850);
  }

  function getRandomSparkleColor() {
    const colors = ['#5E79E8', '#314EBC', '#8fa8ff', '#FFD966', '#c8deff', '#a0b8ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

/* ============================================================
   8. CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const name      = form.querySelector('#name').value.trim();

    // Simple validation
    if (!name) {
      showFormMessage(form, '⚠️ Please enter your name!', 'error');
      return;
    }

    // Simulate submission (replace this with your actual form handler)
    // Options: Formspree, EmailJS, Netlify Forms, etc.
    // See the form action attribute in index.html for where to connect this.

    submitBtn.textContent = '✦ Sending…';
    submitBtn.disabled = true;

    setTimeout(() => {
      showFormMessage(form, `✦ Message sent! Thanks ${name}, I'll be in touch soon. ✦`, 'success');
      form.reset();
      submitBtn.textContent = '✦ Send Message ✦';
      submitBtn.disabled = false;
    }, 1200);
  });
}

function showFormMessage(form, message, type) {
  // Remove existing message
  const existing = form.querySelector('.form-message');
  if (existing) existing.remove();

  const msg = document.createElement('div');
  msg.className = `form-message form-message-${type}`;
  msg.textContent = message;
  msg.style.cssText = `
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-top: 12px;
    text-align: center;
    background: ${type === 'success' ? 'rgba(86,194,89,0.1)' : 'rgba(255,107,107,0.1)'};
    color: ${type === 'success' ? '#2d7a30' : '#b83232'};
    border: 1px solid ${type === 'success' ? 'rgba(86,194,89,0.4)' : 'rgba(255,107,107,0.4)'};
  `;
  form.appendChild(msg);

  // Auto-remove success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => msg.remove(), 5000);
  }
}

/* ============================================================
   9. PORTFOLIO CARD HOVER EFFECT (optional tilt)
   ============================================================ */
document.querySelectorAll('.port-card, .product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const midX   = rect.width / 2;
    const midY   = rect.height / 2;
    const tiltX  = ((y - midY) / midY) * 4;
    const tiltY  = ((x - midX) / midX) * -4;

    card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ============================================================
   10. SKILL CARD ENTRANCE (stagger on scroll)
   ============================================================ */
// Extra stagger for skill cards within the grid
document.querySelectorAll('.skills-grid .skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

/* ============================================================
   11. PORTFOLIO GRID — stagger
   ============================================================ */
document.querySelectorAll('.portfolio-grid .port-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
});

/* ============================================================
   12. REDLINE UMBRA — typing effect for the title (optional)
   ============================================================ */
// Subtle text flicker on the classified panel title
const classifiedTitle = document.querySelector('.redline-title');
if (classifiedTitle) {
  setInterval(() => {
    if (Math.random() < 0.08) { // 8% chance every 2s
      classifiedTitle.style.opacity = '0.7';
      setTimeout(() => {
        classifiedTitle.style.opacity = '1';
      }, 80);
    }
  }, 2000);
}

/* ============================================================
   13. SMOOTH ANCHOR SCROLL (enhanced)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  });
});

/* ============================================================
   EDIT NOTES FOR CARITA:
   --------------------------------------------------------
   - To connect the contact form: see initContactForm() above.
     Replace the setTimeout simulation with a real fetch() to
     Formspree, EmailJS, or Netlify Forms.
   
   - To add a loading animation: add a <div id="loader"> in
     index.html and hide it on the 'load' event.
   
   - To add a lightbox for portfolio images: consider
     libraries like GLightbox or PhotoSwipe (free, lightweight).
   
   - To enable custom cursor: uncomment the sparkle init call
     or add a CSS custom cursor with cursor: url('...'), auto.
   
   - All placeholder comments marked with EDIT: in index.html
     and styles.css show you exactly where to swap in your
     real content, images, links, and prices.
   ============================================================ */
