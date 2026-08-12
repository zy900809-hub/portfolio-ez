/* 首页入场: PERSONAL 字母从顶面掉下, PORTFOLIO 满屏收缩, 然后保持 */
(function () {
  'use strict';

  var stage = document.getElementById('homeTitleStage');
  if (!stage) return;

  function makeSpans(text) {
    var frag = document.createDocumentFragment();
    var i = 0;
    while (i < text.length) {
      var ch = text.charAt(i);
      var span = document.createElement('span');
      span.className = 'il';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      frag.appendChild(span);
      i++;
    }
    return frag;
  }

  function start() {
    var line1 = stage.querySelector('.t-line--1');
    var line2 = stage.querySelector('.t-line--2');
    if (!line1 || !line2) return;

    var word1 = 'PERSONAL';
    var word2 = 'PORTFOLIO';

    line1.appendChild(makeSpans(word1));
    line2.appendChild(makeSpans(word2));
    // 同步 data-text 让 ::before/::after 切片层能拿到完整文本
    stage.setAttribute('data-text', word1 + '\n' + word2);

    // 给每行字母加 stagger 延迟(从 0 累加)
    var setDelays = function (line, perChar) {
      var chars = line.querySelectorAll('.il');
      for (var i = 0; i < chars.length; i++) {
        chars[i].style.animationDelay = (i * perChar) + 's';
      }
    };
    setDelays(line1, 0.12);   // PERSONAL 每个字母 0.12s 错开掉下
    // PORTFOLIO 收缩: 等 PERSONAL 全部落完再开始 (8 字母 * 0.12s ≈ 0.96s)
    var line2Base = 0.96 + 0.1;
    var line2Chars = line2.querySelectorAll('.il');
    for (var j = 0; j < line2Chars.length; j++) {
      line2Chars[j].style.animationDelay = (line2Base + j * 0.04) + 's';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
