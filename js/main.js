(function () {
  'use strict';

  var NAV_BREAKPOINT = 1200;
  var menuToggle = document.getElementById('menuToggle');
  var mobilePanel = document.getElementById('mobilePanel');
  var menuOverlay = document.getElementById('menuOverlay');
  var siteHeader = document.getElementById('siteHeader');
  var mobileLinks = mobilePanel ? mobilePanel.querySelectorAll('.header__mobile-link, .header__nav-extras a') : [];

  function isMenuMode() {
    return window.innerWidth <= NAV_BREAKPOINT;
  }

  function openMenu() {
    if (!menuToggle || !mobilePanel || !menuOverlay) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    mobilePanel.classList.add('is-open');
    mobilePanel.setAttribute('aria-hidden', 'false');
    menuOverlay.classList.add('is-visible');
    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!menuToggle || !mobilePanel || !menuOverlay) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    mobilePanel.classList.remove('is-open');
    mobilePanel.setAttribute('aria-hidden', 'true');
    menuOverlay.classList.remove('is-visible');
    menuOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  function toggleMenu() {
    var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function updateSiteChromeHeight() {
    if (!siteHeader) return;
    var height = siteHeader.offsetHeight;
    document.documentElement.style.setProperty('--site-chrome-height', height + 'px');
  }

  function initChromeObserver() {
    if (!siteHeader || typeof ResizeObserver === 'undefined') {
      updateSiteChromeHeight();
      return;
    }

    var observer = new ResizeObserver(updateSiteChromeHeight);
    observer.observe(siteHeader);
    updateSiteChromeHeight();
  }

  function handleResize() {
    updateSiteChromeHeight();
    if (!isMenuMode()) {
      closeMenu();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', handleResize);
  window.addEventListener('load', function () {
    updateSiteChromeHeight();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateSiteChromeHeight);
    }
  });

  initChromeObserver();
})();
