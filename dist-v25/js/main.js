/* ============================================
   Main JS - 钟艺-EZ Portfolio
   Loading / Cursor / Nav / Scroll / Indicator
   ============================================ */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ============ Loading Screen ============ */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = $('#loader');
    if (loader) loader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
  }, 600);
});

/* ============ Custom Cursor ============ */
(function initCursor() {
  const cursor = $('#cursor');
  const dot = $('#cursorDot');
  if (!cursor || !dot) return;

  let mx = 0, my = 0, cx = 0, cy = 0, dx = 0, dy = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dx = e.clientX; dy = e.clientY;
  });

  (function loop() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();

  $$('a, button, [data-tilt]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hover');
      dot.classList.add('is-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hover');
      dot.classList.remove('is-hover');
    });
  });
})();

/* ============ Smooth Anchor Navigation ============ */
(function initNav() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#') || href === '#') return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      if (typeof gsap !== 'undefined') {
        gsap.to(window, {
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTo: { y: target, offsetY: 0 },
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      history.replaceState(null, '', href);
    });
  });
})();

/* ============ Page Indicator (right side) ============ */
(function initIndicator() {
  const sections = $$('.page');
  const links = $$('[data-nav-dot]');
  const sideLinks = $$('#sideNav a');
  if (!sections.length || !links.length) return;

  function setActive(id) {
    links.forEach(l => l.classList.toggle('active', l.dataset.section === id));
    sideLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
  }

  sections.forEach(sec => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (self.isActive) setActive(sec.id);
      },
    });
  });
})();
