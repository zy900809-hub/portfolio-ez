/* ============================================
   WORKS Section Animations
   - 立即让内容可见
   - Hover / scroll-triggered 装饰动画
   ============================================ */

(function () {
  function init() {
    const works = document.querySelector('#works');
    if (!works) return;

    /* ----- Reset to visible ----- */
    const allAnimItems = works.querySelectorAll(
      '.proj, .g-item, .float-card, .rv-card, .team-photo, .banner-card'
    );
    allAnimItems.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    /* ----- Filter pills ----- */
    const pills = document.querySelectorAll('#filterPills .pill');
    const gridItems = works.querySelectorAll('.works-chapter--grid .g-item');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.dataset.filter;
        gridItems.forEach(item => {
          const cat = item.dataset.category;
          if (filter === 'all' || cat === filter) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    });

    /* ----- Counter ----- */
    const counter = document.querySelector('#projCount');
    if (counter) {
      // Simple: just set to 12 directly, no animation
      counter.textContent = '12';
    }

    /* ----- Float scene: mouse parallax ----- */
    const floatScene = works.querySelector('.works-chapter--float');
    if (floatScene) {
      const wrap = floatScene.querySelector('.float-scene');
      const floatCards = floatScene.querySelectorAll('.float-card');
      let sceneX = 0, sceneY = 0, tSceneX = 0, tSceneY = 0;

      floatScene.addEventListener('mousemove', (e) => {
        const r = floatScene.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width - 0.5;
        const cy = (e.clientY - r.top) / r.height - 0.5;
        tSceneX = cx * 30;
        tSceneY = cy * 20;
      });
      floatScene.addEventListener('mouseleave', () => { tSceneX = 0; tSceneY = 0; });

      (function tickFloat() {
        sceneX += (tSceneX - sceneX) * 0.08;
        sceneY += (tSceneY - sceneY) * 0.08;
        if (wrap) {
          wrap.style.transform = `translate3d(${sceneX}px, ${sceneY}px, 0)`;
        }
        requestAnimationFrame(tickFloat);
      })();

      // Per-card tilt
      floatCards.forEach(card => {
        const depth = parseFloat(card.dataset.depth || '0.5');
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const mx = (e.clientX - r.left) / r.width - 0.5;
          const my = (e.clientY - r.top) / r.height - 0.5;
          const cx = mx * 15 * depth;
          const cy = my * 15 * depth;
          card.style.transform = `translate3d(${cx}px, ${cy}px, 0) scale(1.04)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }

    /* ----- IP 选择器(3 只鸭) ----- */
    const ipSelector = document.getElementById('ipSelector');
    const ipGallery = document.getElementById('ipGallery');
    const ipCurrentName = document.getElementById('ipCurrentName');
    if (ipSelector && ipGallery && ipCurrentName) {
      const ipData = {
        '轻爽鸭': ['6.png','7.png','8.png','9.png','10_web.png'].map(n => `assets/img/ip/轻爽鸭/轻爽鸭${n}`),
        '学院鸭': ['5.png','6.png','7.png','8.png','9.png'].map(n => `assets/img/ip/学院鸭/学院鸭${n}`),
        '派对鸭': ['3.png','7.png','8.png','9.png','1.png'].map(n => `assets/img/ip/派对鸭/派对鸭${n}`)
      };
      function showIp(ip) {
        ipSelector.querySelectorAll('.ip-card').forEach(c => {
          c.classList.toggle('is-active', c.dataset.ip === ip);
        });
        ipCurrentName.textContent = ip;
        const imgs = ipData[ip] || [];
        ipGallery.innerHTML = imgs.map(src =>
          `<div class="ip-gallery__item"><img src="${src}" alt="${ip}" loading="lazy" /></div>`
        ).join('');
      }
      ipSelector.querySelectorAll('.ip-card').forEach(c => {
        c.addEventListener('click', () => showIp(c.dataset.ip));
      });
      // 默认选中第一个
      const first = ipSelector.querySelector('.ip-card');
      if (first) showIp(first.dataset.ip);
    }

    /* ----- Review cards: hover tilt ----- */
    works.querySelectorAll('.rv-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width - 0.5;
        const my = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${mx * 8}deg) rotateX(${-my * 6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    /* ----- Team photos: hover tilt ----- */
    works.querySelectorAll('.team-photo').forEach(photo => {
      const depth = parseFloat(photo.dataset.depth || '0.5');
      photo.addEventListener('mousemove', (e) => {
        const r = photo.getBoundingClientRect();
        const mx = (e.clientX - r.left) / r.width - 0.5;
        const my = (e.clientY - r.top) / r.height - 0.5;
        photo.style.transform = `translate3d(${mx * 20 * depth}px, ${my * 20 * depth}px, 0) rotateY(${mx * 6}deg) rotateX(${-my * 6}deg) scale(1.05)`;
      });
      photo.addEventListener('mouseleave', () => {
        photo.style.transform = '';
      });
    });

    /* ----- Proj hover scale ----- */
    works.querySelectorAll('.proj--big').forEach(proj => {
      proj.addEventListener('mouseenter', () => {
        const img = proj.querySelector('.proj__media img');
        if (img) img.style.transform = 'scale(1.06)';
      });
      proj.addEventListener('mouseleave', () => {
        const img = proj.querySelector('.proj__media img');
        if (img) img.style.transform = '';
      });
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();

/* ============================================
   FEATURED STACK — 维他VLT-Popup 叠图切换
   - 卡片堆叠在舞台,当前在上层
   - 后面 2 张隐约可见(像压在下面的牌)
   - 切换时:旧卡向左飞出,新卡从下方推上来
   - 拖拽 / 左右按钮 / 圆点 / 键盘 均可触发
   ============================================ */

(function () {
  function initStack() {
    try {
      const root = document.getElementById('featuredStack');
      if (!root) { console.warn('[stack] #featuredStack not found'); return; }

      const stage = root.querySelector('[data-stack-stage]');
      const cards = Array.from(root.querySelectorAll('[data-card]'));
      const prevBtn = root.querySelector('[data-stack-prev]');
      const nextBtn = root.querySelector('[data-stack-next]');
      const dots = Array.from(root.querySelectorAll('[data-stack-dot]'));

      if (!stage || cards.length === 0) { console.warn('[stack] stage or cards missing'); return; }

      let current = 0;
      const total = cards.length;
      let animating = false;
      const ANIM_MS = 700;
      const ALL_STATES = ['is-current', 'is-behind-1', 'is-behind-2', 'is-behind-3', 'is-behind-4', 'is-behind-5', 'is-leaving', 'is-entering'];

      function render() {
        cards.forEach((card, i) => {
          card.classList.remove.apply(card.classList, ALL_STATES);
          const diff = (i - current + total) % total;
          if (i === current) {
            card.classList.add('is-current');
          } else if (diff === 1) {
            card.classList.add('is-behind-1');
          } else if (diff === 2) {
            card.classList.add('is-behind-2');
          } else if (diff === 3) {
            card.classList.add('is-behind-3');
          } else if (diff === 4) {
            card.classList.add('is-behind-4');
          } else if (diff === 5) {
            card.classList.add('is-behind-5');
          }
        });

        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === current);
        });
        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current === total - 1;
      }

      function goTo(target) {
        if (animating) return;
        if (target < 0) target = 0;
        if (target > total - 1) target = total - 1;
        if (target === current) return;

        animating = true;
        const oldCard = cards[current];
        const newCard = cards[target];

        // 1) 旧卡:current → leaving
        oldCard.classList.remove('is-current');
        oldCard.classList.add('is-leaving');

        // 2) 新卡:从默认 → entering
        newCard.classList.remove('is-behind-1', 'is-behind-2', 'is-behind-3', 'is-behind-4', 'is-behind-5');
        newCard.classList.add('is-entering');

        // 3) 重新计算其他卡片在新 current 下的层级
        cards.forEach((card, i) => {
          if (i === target) return;
          if (i === current) return;
          card.classList.remove('is-behind-1', 'is-behind-2', 'is-behind-3', 'is-behind-4', 'is-behind-5', 'is-entering');
          const diff = (i - target + total) % total;
          if (diff === 1) card.classList.add('is-behind-1');
          else if (diff === 2) card.classList.add('is-behind-2');
          else if (diff === 3) card.classList.add('is-behind-3');
          else if (diff === 4) card.classList.add('is-behind-4');
          else if (diff === 5) card.classList.add('is-behind-5');
        });

        // 4) 强制 reflow
        void newCard.offsetWidth;

        // 5) 新卡 entering → current
        newCard.classList.remove('is-entering');
        newCard.classList.add('is-current');

        // 6) 动画结束后清理
        setTimeout(() => {
          oldCard.classList.remove('is-leaving');
          current = target;
          animating = false;
          dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
          });
          if (prevBtn) prevBtn.disabled = current === 0;
          if (nextBtn) nextBtn.disabled = current === total - 1;
        }, ANIM_MS);
      }

      if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

      dots.forEach((dot) => {
        dot.addEventListener('click', function () {
          const idx = parseInt(dot.getAttribute('data-index'), 10);
          if (!isNaN(idx)) goTo(idx);
        });
      });

      // 拖拽
      let isDragging = false;
      let startX = 0;
      let dragDelta = 0;
      let pointerId = null;

      function onDown(e) {
        if (animating) return;
        isDragging = true;
        startX = (e.clientX != null) ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        dragDelta = 0;
        pointerId = e.pointerId;
        stage.classList.add('is-dragging');
        try { if (pointerId != null) stage.setPointerCapture(pointerId); } catch (err) {}
      }
      function onMove(e) {
        if (!isDragging) return;
        const cx = (e.clientX != null) ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        dragDelta = cx - startX;
      }
      function onUp() {
        if (!isDragging) return;
        isDragging = false;
        stage.classList.remove('is-dragging');
        try { if (pointerId != null) stage.releasePointerCapture(pointerId); } catch (err) {}
        pointerId = null;
        const threshold = 60;
        if (dragDelta < -threshold && current < total - 1) goTo(current + 1);
        else if (dragDelta > threshold && current > 0) goTo(current - 1);
        dragDelta = 0;
      }

      stage.addEventListener('pointerdown', onDown);
      stage.addEventListener('pointermove', onMove);
      stage.addEventListener('pointerup', onUp);
      stage.addEventListener('pointercancel', onUp);
      stage.addEventListener('pointerleave', onUp);

      try {
        stage.querySelectorAll('img').forEach((img) => {
          img.addEventListener('dragstart', function (e) { e.preventDefault(); });
        });
      } catch (err) {}

      // 键盘
      document.addEventListener('keydown', function (e) {
        try {
          const rect = root.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (!inView) return;
          if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
          else if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
        } catch (err) {}
      });

      // 初始化
      render();
      console.log('[stack] initialized', { total: total, current: current });
    } catch (err) {
      console.error('[stack] init error', err);
    }
  }

  // 多次触发以防加载顺序问题
  function tryInit() {
    if (document.getElementById('featuredStack')) {
      initStack();
    } else {
      setTimeout(tryInit, 50);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
  // 兜底:window load 后再试一次
  window.addEventListener('load', tryInit);
})();

/* ============================================
   Q4-新品KV 手动切换(按钮 + 指示点)
   ============================================ */
(function initKvCarousel() {
  const carousel = document.querySelector('.kv-carousel');
  if (!carousel) return;
  const cards = carousel.querySelectorAll('.kv-card');
  const dots = carousel.querySelectorAll('.kv-dot');
  const prevBtn = carousel.querySelector('.kv-btn--prev');
  const nextBtn = carousel.querySelector('.kv-btn--next');
  let idx = 0;
  const total = cards.length;

  function goTo(n) {
    idx = (n + total) % total;
    cards.forEach((c, i) => c.classList.toggle('kv-card--active', i === idx));
    dots.forEach((d, i) => d.classList.toggle('kv-dot--active', i === idx));
  }
  prevBtn?.addEventListener('click', () => goTo(idx - 1));
  nextBtn?.addEventListener('click', () => goTo(idx + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
  // 键盘左右切换(carousel 聚焦时)
  carousel.tabIndex = 0;
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goTo(idx - 1);
    if (e.key === 'ArrowRight') goTo(idx + 1);
  });
})();
