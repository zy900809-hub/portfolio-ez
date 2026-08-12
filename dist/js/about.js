/* ============================================
   ABOUT Section
   现在 about 直接展示整图,无需复杂动画
   ============================================ */

(function () {
  function init() {
    const about = document.querySelector('#about');
    if (!about) return;

    const img = about.querySelector('.about-full-image');
    if (!img) return;

    // 轻量入场:图片加载完成后再显现
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
      img.addEventListener('error', () => {
        img.style.opacity = '1';
      });
    }
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
