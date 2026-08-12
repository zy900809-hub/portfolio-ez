/* ============================================
   HOME Section Animations
   - Intro timeline (if ready)
   - 立即让内容可见
   ============================================ */

(function () {
  function init() {
    const home = document.querySelector('#home');
    if (!home) return;

    const titleSpans = home.querySelectorAll('.home-title .t-line > span');
    const cats = home.querySelectorAll('.page-home__categories li');
    const blocks = home.querySelectorAll('.block');
    const scrollHint = home.querySelector('.scroll-hint');

    // Reset to visible
    titleSpans.forEach(s => { s.style.transform = 'translateY(0)'; s.style.opacity = '1'; });
    cats.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
    blocks.forEach(b => { b.style.opacity = '1'; b.style.transform = 'none'; });
    if (scrollHint) { scrollHint.style.opacity = '1'; }

    // Subtle parallax on blocks during scroll
    blocks.forEach((block, i) => {
      const depth = (i % 2 === 0) ? -30 : 30;
      gsap.to(block, {
        y: depth,
        ease: 'none',
        scrollTrigger: {
          trigger: home,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
