/**
 * ExpensePilot - Modern Website Script
 * Handles dark mode toggle, mobile menu, and smooth interactions
 */

// ============================================
// Dark Mode Toggle
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Get saved theme from localStorage or system preference
function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Set theme
function setTheme(theme) {
  htmlElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeToggleIcon(theme);
}

// Update icon based on theme
function updateThemeToggleIcon(theme) {
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.title = theme === 'dark' ? 'Light mode' : 'Dark mode';
}

// Initialize theme
const initialTheme = getInitialTheme();
setTheme(initialTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const current = htmlElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
  const isActive = navMenu.classList.toggle('active');
  mobileMenuBtn.setAttribute('aria-expanded', isActive);
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', false);
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('header')) {
    navMenu.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', false);
  }
});

// ============================================
// Smooth Scroll Offset for Fixed Header
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// Intersection Observer for Scroll Animations
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card, .testimonial-card, .usp-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// ============================================
// Header Shadow on Scroll
// ============================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.12)';
  } else {
    header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
  }
});

// ============================================
// Lazy Loading Images (Fallback for older browsers)
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// Performance Monitoring (Optional)
// ============================================
if (window.performance && window.performance.navigation.type === 1) {
  // Page was reloaded
  console.log('Page reload detected');
}

// ============================================
// Play / Pause About-section animation when visible
// ============================================
(() => {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  const video = aboutSection.querySelector('video.about-video');
  if (!video || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
        // attempt to play when ~40% visible
        video.play().catch(() => {/* play may be blocked in some browsers */});
      } else {
        try { video.pause(); } catch (e) { /* ignore */ }
      }
    });
  }, { threshold: [0.0, 0.4, 0.75] });

  io.observe(aboutSection);

  // If user navigates directly to #about via anchor, ensure video plays
  if (location.hash === '#about') {
    video.play().catch(() => {});
  }
})();
