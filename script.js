/**
 * ExpensePilot website: theme toggle, mobile menu, header border on scroll.
 * The saved theme is applied before first paint by the inline script in each page's <head>.
 */
(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  function savedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function labelToggle() {
    if (!themeToggle) return;
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${next} mode`);
    themeToggle.title = `Switch to ${next} mode`;
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0F0D0B' : '#F7F4EF');
    try { localStorage.setItem('theme', theme); } catch (e) { /* storage blocked */ }
    labelToggle();
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => setTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!savedTheme()) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      labelToggle();
    }
  });
  labelToggle();

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('nav-menu');
  if (menuBtn && nav) {
    const close = () => {
      nav.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    };
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('click', (e) => { if (!e.target.closest('.site-header')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  // Header border once the page scrolls
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
