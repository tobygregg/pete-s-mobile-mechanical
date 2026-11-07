/* Pete's Mobile Mechanical Services – site behaviour
   Menu · header · reveals · rail nav · services job sheet · lightbox · form */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var lg = window.matchMedia('(min-width: 1024px)');

  /* ---------- Year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Mobile menu ---------- */
  var menu = $('#menu'), menuBtn = $('#menuBtn'), menuClose = $('#menuClose');
  function setMenu(open) {
    if (!menu) return;
    menu.dataset.open = open ? 'true' : 'false';
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menuClose.focus(); else menuBtn.focus({ preventScroll: true });
  }
  if (menu) {
    menuBtn.addEventListener('click', function () { setMenu(true); });
    menuClose.addEventListener('click', function () { setMenu(false); });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.dataset.open === 'true') setMenu(false); });
  }

  /* ---------- Header border on scroll ---------- */
  var topbar = $('#topbar');
  function onScroll() {
    if (topbar) {
      var s = window.scrollY > 8;
      topbar.classList.toggle('border-paper-300', s);
      topbar.classList.toggle('shadow-card', s);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveals ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Rail nav: highlight current section ---------- */
  var railLinks = $$('.rail-link');
  if (railLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    railLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var current = null;
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        // reviews and FAQ belong to "About"; hero clears it
        if (id === 'reviews' || id === 'faq') id = 'about';
        if (current === id) return;
        current = id;
        railLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        if (map[id]) map[id].setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'services', 'how', 'work', 'about', 'reviews', 'faq', 'contact'].forEach(function (id) {
      var el = document.getElementById(id); if (el) so.observe(el);
    });
  }

  /* ---------- Services job sheet ---------- */
  var tabs = $$('.job-tab'), stage = $('#jobStage'), list = $('#jobList');
  var stageHome = stage && stage.parentNode;
  function placeStage() {
    if (!stage) return;
    if (lg.matches) {
      if (stage.parentNode !== stageHome) stageHome.appendChild(stage);
    } else {
      var active = $('.job-tab[aria-selected="true"]');
      if (active && active.nextElementSibling !== stage) active.insertAdjacentElement('afterend', stage);
    }
  }
  function selectTab(tab, focus, scroll) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var p = document.getElementById(t.getAttribute('aria-controls'));
      if (p) p.hidden = !on;
    });
    placeStage();
    if (focus) tab.focus();
    if (scroll && !lg.matches) {
      var r = tab.getBoundingClientRect();
      if (r.top < 70 || r.top > window.innerHeight * 0.5) {
        window.scrollTo({ top: window.scrollY + r.top - 80, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    }
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab, false, true); });
    tab.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      else if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (k === 'Home') n = tabs[0];
      else if (k === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectTab(n, true, false); }
    });
  });
  if (stage) {
    placeStage();
    (lg.addEventListener ? lg.addEventListener('change', placeStage) : lg.addListener(placeStage));
  }
  // "Ask about…" buttons pre-select the service in the form
  var serviceSelect = $('#f-service');
  $$('.job-ask').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.closest('[data-service]');
      if (panel && serviceSelect) {
        var want = panel.getAttribute('data-service');
        $$('option', serviceSelect).forEach(function (o) { if (o.textContent === want) serviceSelect.value = o.value; });
      }
    });
  });

  /* ---------- Lightbox ---------- */
  var items = $$('.gal'), lb = $('#lightbox');
  if (items.length && lb) {
    var img = $('#lbImg'), cap = $('#lbCaption'), count = $('#lbCount');
    var idx = 0, lastFocus = null;
    function show(i) {
      idx = (i + items.length) % items.length;
      var it = items[idx], thumb = $('img', it);
      img.style.opacity = '0';
      var src = it.getAttribute('data-full');
      var pre = new Image();
      pre.onload = pre.onerror = function () {
        img.src = src; img.alt = thumb ? thumb.alt : '';
        img.style.opacity = '1';
      };
      pre.src = src;
      cap.textContent = it.getAttribute('data-caption') || '';
      count.textContent = (idx + 1) + ' / ' + items.length;
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      $('#lbClose').focus();
    }
    function close() {
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
    items.forEach(function (it, i) { it.addEventListener('click', function () { open(i); }); });
    $('#lbClose').addEventListener('click', close);
    $('#lbPrev').addEventListener('click', function () { show(idx - 1); });
    $('#lbNext').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.id === 'lbStage') close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.getAttribute('aria-hidden') === 'true') return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'Tab') {
        var f = $$('button', lb).filter(function (b) { return b.offsetParent !== null; });
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // swipe
    var sx = 0, sy = 0, tracking = false;
    var stageEl = $('#lbStage');
    stageEl.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true; }, { passive: true });
    stageEl.addEventListener('touchmove', function (e) {
      if (!tracking) return;
      var dx = e.touches[0].clientX - sx;
      img.style.transform = 'translateX(' + dx * 0.4 + 'px)';
    }, { passive: true });
    stageEl.addEventListener('touchend', function (e) {
      if (!tracking) return; tracking = false;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      img.style.transform = '';
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(idx + (dx < 0 ? 1 : -1));
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
    });
  }

  /* ---------- Quote form ---------- */
  var form = $('#quoteForm');
  if (form) {
    var fields = $$('input[required], textarea[required], input[type="email"]', form);
    function check(el) {
      var ok = el.checkValidity() && (!el.required || el.value.trim() !== '');
      var err = document.getElementById(el.getAttribute('aria-describedby'));
      el.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (err) err.classList.toggle('hidden', ok);
      return ok;
    }
    fields.forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value) check(el); });
      el.addEventListener('input', function () { if (el.getAttribute('aria-invalid') === 'true') check(el); });
    });
    form.addEventListener('submit', function (e) {
      var firstBad = null;
      fields.forEach(function (el) { if (!check(el) && !firstBad) firstBad = el; });
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      var btn = $('button[type="submit"]', form);
      btn.disabled = true;
      btn.classList.add('opacity-80', 'cursor-wait');
      $('.btn-text', btn).textContent = 'Sending…';
    });
  }
})();
