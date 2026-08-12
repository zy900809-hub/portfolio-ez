/* ============================================
   THANKS Section Animations
   - 立即让内容可见
   - 鼠标视差
   ============================================ */

(function () {
  function init() {
    const thanks = document.querySelector('#thanks');
    if (!thanks) return;

    const titleSpans = thanks.querySelectorAll('.thanks-title .t-line > span');
    const sub = thanks.querySelector('.thanks-sub');
    const footer = thanks.querySelector('.thanks-footer');
    const blocks = thanks.querySelectorAll('.block');

    // Always show
    titleSpans.forEach(s => { s.style.transform = 'translateY(0)'; s.style.opacity = '1'; });
    if (sub) { sub.style.opacity = '1'; sub.style.transform = 'none'; }
    if (footer) { footer.style.opacity = '1'; footer.style.transform = 'none'; }
    blocks.forEach(b => { b.style.opacity = '1'; b.style.transform = 'none'; });

    // Mouse parallax on title
    const title = thanks.querySelector('.thanks-title');
    let tx = 0, ty = 0, cx = 0, cy = 0;
    thanks.addEventListener('mousemove', (e) => {
      const r = thanks.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    });
    thanks.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
    (function tick() {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (title) title.style.transform = `perspective(1000px) rotateY(${cx * 6}deg) rotateX(${-cy * 4}deg)`;
      requestAnimationFrame(tick);
    })();
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
