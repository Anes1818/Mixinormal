/* Michi normale — interactive spotlight banner (no canvas, sharp = source) */
(function () {
  var sec = document.querySelector('.michi-fx');
  if (!sec) return;
  var stage = sec.querySelector('.mfx-stage');
  if (!stage) return;

  var base = stage.querySelector('.mfx-base');
  var reveal = stage.querySelector('.mfx-reveal');
  // If the image fails to load, hide the whole section gracefully.
  function onErr(){ sec.style.display = 'none'; }
  if (base) base.addEventListener('error', onErr);
  if (reveal) reveal.addEventListener('error', onErr);

  var tx = 50, ty = 50;   // target position (%)
  var cx = 50, cy = 50;   // current position (%)
  var lastMove = 0;
  var t = 0;
  var raf = null;
  var visible = true;

  function layout() {
    var r = stage.getBoundingClientRect();
    if (!r.width) return;
    var rad = Math.max(90, Math.min(r.width * 0.20, 280));
    stage.style.setProperty('--mr', rad.toFixed(0) + 'px');
  }

  function apply() {
    stage.style.setProperty('--mx', cx.toFixed(2) + '%');
    stage.style.setProperty('--my', cy.toFixed(2) + '%');
  }

  function move(clientX, clientY) {
    var r = stage.getBoundingClientRect();
    if (!r.width) return;
    tx = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    ty = Math.max(0, Math.min(100, ((clientY - r.top) / r.height) * 100));
    lastMove = performance.now();
  }

  stage.addEventListener('pointermove', function (e) { move(e.clientX, e.clientY); });
  stage.addEventListener('touchmove', function (e) {
    if (e.touches && e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  function tick() {
    if (!visible) { raf = null; return; }
    var now = performance.now();
    if (now - lastMove > 1200) {
      // idle: gentle orbit so the effect is always visibly alive
      t += 0.016;
      tx = 50 + Math.cos(t * 0.7) * 30;
      ty = 50 + Math.sin(t * 1.1) * 30;
    }
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    apply();
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (!raf) { lastMove = performance.now() - 2000; raf = requestAnimationFrame(tick); }
  }

  window.addEventListener('resize', layout);
  layout();
  apply();

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        visible = en.isIntersecting;
        if (visible) start();
      });
    }, { threshold: 0.01 }).observe(sec);
  } else {
    visible = true;
  }
  start();
})();
