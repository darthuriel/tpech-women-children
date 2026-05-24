/*
  Phase D — Interactive site behavior
  - Auto-focus the timeline node currently in view (mobile-first)
  - Keyboard navigation (already works via <a> + Enter)
  - Smooth-scroll back to top
  All progressive: site is fully functional without JS.
*/

(function () {
  'use strict';

  // ── Timeline node activation on scroll (IntersectionObserver) ──
  const nodes = document.querySelectorAll('.timeline-node');
  if (nodes.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            entry.target.classList.add('is-active');
          } else {
            entry.target.classList.remove('is-active');
          }
        });
      },
      {
        // Trigger when node is roughly in the middle of viewport
        rootMargin: '-30% 0px -30% 0px',
        threshold: [0, 0.4, 0.8],
      }
    );
    nodes.forEach((n) => observer.observe(n));
  }

  // ── Back-to-top smooth scroll (chapter pages) ──
  document.querySelectorAll('.back-to-index, .back-link').forEach((el) => {
    el.addEventListener('click', (e) => {
      // Only intercept same-document hash links — let cross-doc links navigate
      const href = el.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Otherwise let the browser navigate normally
    });
  });

  // ── Touch feedback: brief flash on tap before navigation ──
  // Helps users feel the tap registered on mobile.
  nodes.forEach((n) => {
    n.addEventListener('touchstart', () => n.classList.add('is-tap'), { passive: true });
    n.addEventListener('touchend',   () => setTimeout(() => n.classList.remove('is-tap'), 150), { passive: true });
  });

  // ── Defer image loading hint (native lazy already handled by attr if present) ──
  // No-op placeholder for future enhancements.
})();
