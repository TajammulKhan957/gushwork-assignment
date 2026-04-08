/**
 * MANGALAM HDPE PIPES – script.js
 *
 * Features implemented:
 *  1. Sticky product bar (IntersectionObserver)
 *  2. Header scroll shadow
 *  3. Mobile menu toggle
 *  4. Image carousel (thumbnail switching with fade)
 *  5. Image zoom lens effect (desktop only)
 *  6. FAQ accordion
 *  7. Manufacturing process tabs
 *  8. Applications carousel (prev/next + touch swipe)
 *  9. Modal open / close
 * 10. Catalogue modal – enable button on valid email
 * 11. Form submission handlers
 */

'use strict';

/* ============================================================
   ELEMENT REFERENCES
   ============================================================ */
const stickyBar    = document.getElementById('stickyBar');
const siteHeader   = document.getElementById('siteHeader');
const heroSection  = document.getElementById('heroSection');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu   = document.getElementById('mobileMenu');


/* ============================================================
   1. STICKY PRODUCT BAR
   Uses IntersectionObserver: bar slides in when hero leaves
   viewport; slides out when hero re-enters.
   The main header shifts down by the bar height so content
   is never hidden behind the bar.
   ============================================================ */
if (stickyBar && heroSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const visible = !entry.isIntersecting;
        stickyBar.classList.toggle('visible', visible);
        stickyBar.setAttribute('aria-hidden', String(!visible));

        // Push the sticky nav header below the product bar
        siteHeader.style.top = visible
          ? stickyBar.offsetHeight + 'px'
          : '0';
      });
    },
    { threshold: 0.05 }
  );

  observer.observe(heroSection);
}


/* ============================================================
   2. HEADER SCROLL SHADOW
   ============================================================ */
window.addEventListener(
  'scroll',
  () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 4);
  },
  { passive: true }
);


/* ============================================================
   3. MOBILE MENU TOGGLE
   ============================================================ */
if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  });
}


/* ============================================================
   4. IMAGE CAROUSEL
   ============================================================ */
const mainImg   = document.getElementById('mainImg');
const thumbBtns = document.querySelectorAll('.thumb');

/** Placeholder image sources used when real assets are absent */
const placeholderSrcs = [
  'https://placehold.co/600x450/dce8f4/1e2e6e?text=HDPE+Pipe+1',
  'https://placehold.co/600x450/ccd8e8/1e2e6e?text=HDPE+Pipe+2',
  'https://placehold.co/600x450/bcccdc/1e2e6e?text=HDPE+Pipe+3',
  'https://placehold.co/600x450/acc0d0/1e2e6e?text=HDPE+Pipe+4',
  'https://placehold.co/600x450/9cb4c4/1e2e6e?text=HDPE+Pipe+5',
];

let currentImgIdx = 0;

/**
 * Switches the main product image and updates thumbnail highlights.
 * @param {number} idx - Target image index
 */
function changeImage(idx) {
  if (!mainImg || idx === currentImgIdx) return;
  currentImgIdx = idx;

  // Fade out → swap src → fade in
  mainImg.style.opacity = '0';

  const candidate = thumbBtns[idx]
    ? thumbBtns[idx].querySelector('img').src
    : placeholderSrcs[idx];

  setTimeout(() => {
    const probe = new Image();
    probe.onload = () => {
      mainImg.src = probe.src;
      mainImg.style.opacity = '1';
      // Also update zoom background
      syncZoomImage();
    };
    probe.onerror = () => {
      mainImg.src = placeholderSrcs[idx] || '';
      mainImg.style.opacity = '1';
      syncZoomImage();
    };
    probe.src = candidate;
  }, 140);

  // Update thumb active state
  thumbBtns.forEach((btn, i) => {
    const active = i === idx;
    btn.classList.toggle('thumb--active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

// Add transition style to main image
if (mainImg) {
  mainImg.style.transition = 'opacity .14s ease';
}

// Attach click + keyboard listeners to thumbnails
thumbBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => changeImage(idx));
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      changeImage(idx);
    }
  });
});


/* ============================================================
   5. IMAGE ZOOM (lens + preview panel)
   Only active on non-touch, wider screens.
   ============================================================ */
const zoomStage   = document.getElementById('zoomStage');
const zoomLens    = document.getElementById('zoomLens');
const zoomPreview = document.getElementById('zoomPreview');

const ZOOM        = 3;     // magnification factor
const LENS_W      = 110;   // lens box width  (px)
const LENS_H      = 110;   // lens box height (px)

/** Copy current main image into the zoom preview background */
function syncZoomImage() {
  if (!mainImg || !zoomPreview) return;
  zoomPreview.style.backgroundImage = `url('${mainImg.src}')`;
}

/** Move lens and compute zoomed background position on mouse move */
function handleZoomMove(e) {
  if (!zoomStage || !zoomLens || !zoomPreview || !mainImg) return;

  const rect = zoomStage.getBoundingClientRect();

  // Cursor position relative to stage, clamped within safe area
  let cx = e.clientX - rect.left;
  let cy = e.clientY - rect.top;

  cx = Math.max(LENS_W / 2, Math.min(cx, rect.width  - LENS_W / 2));
  cy = Math.max(LENS_H / 2, Math.min(cy, rect.height - LENS_H / 2));

  // Position lens
  zoomLens.style.left   = (cx - LENS_W / 2) + 'px';
  zoomLens.style.top    = (cy - LENS_H / 2) + 'px';
  zoomLens.style.width  = LENS_W + 'px';
  zoomLens.style.height = LENS_H + 'px';

  // Compute zoomed background
  const previewW = zoomPreview.offsetWidth;
  const previewH = zoomPreview.offsetHeight;

  const bgW = rect.width  * ZOOM;
  const bgH = rect.height * ZOOM;

  const bgX = -((cx / rect.width)  * bgW - previewW / 2);
  const bgY = -((cy / rect.height) * bgH - previewH / 2);

  zoomPreview.style.backgroundSize     = `${bgW}px ${bgH}px`;
  zoomPreview.style.backgroundPosition = `${bgX}px ${bgY}px`;
}

/** Initialises zoom listeners – only on pointer/mouse devices */
function initZoom() {
  // Skip on touch-only devices
  if (!zoomStage || !zoomLens || !zoomPreview) return;
  if (window.matchMedia('(hover: none)').matches) return;

  syncZoomImage();

  zoomStage.addEventListener('mouseenter', () => {
    zoomLens.style.display    = 'block';
    zoomPreview.style.display = 'block';
    syncZoomImage();
  });

  zoomStage.addEventListener('mouseleave', () => {
    zoomLens.style.display    = 'none';
    zoomPreview.style.display = 'none';
  });

  zoomStage.addEventListener('mousemove', handleZoomMove);
}

// Initialise after layout settles
window.addEventListener('load', () => {
  syncZoomImage();
  initZoom();
});


/* ============================================================
   6. FAQ ACCORDION
   ============================================================ */

/**
 * Opens/closes a single FAQ item.
 * Closes any other open items first.
 * @param {HTMLButtonElement} trigger - The clicked .faq__trigger
 */
function toggleFaq(trigger) {
  const item      = trigger.closest('.faq__item');
  const panel     = item.querySelector('.faq__panel');
  const expanded  = trigger.getAttribute('aria-expanded') === 'true';

  // Close all open items
  document.querySelectorAll('.faq__trigger[aria-expanded="true"]').forEach((t) => {
    if (t === trigger) return;
    t.setAttribute('aria-expanded', 'false');
    const p = t.closest('.faq__item').querySelector('.faq__panel');
    p.style.maxHeight = '0';
    // Hidden after transition
    setTimeout(() => { if (p.style.maxHeight === '0px') p.hidden = true; }, 350);
  });

  // Toggle current item
  trigger.setAttribute('aria-expanded', String(!expanded));

  if (!expanded) {
    panel.hidden      = false;
    // Force reflow so transition fires correctly
    panel.offsetHeight; // eslint-disable-line
    panel.style.maxHeight = panel.scrollHeight + 'px';
  } else {
    panel.style.maxHeight = '0';
    setTimeout(() => { if (panel.style.maxHeight === '0px') panel.hidden = true; }, 350);
  }
}

// Initialise panels
document.querySelectorAll('.faq__panel').forEach((panel) => {
  panel.style.overflow   = 'hidden';
  panel.style.maxHeight  = '0';
  panel.style.transition = 'max-height .32s ease';
  panel.hidden = true;
});

// Attach listeners
document.querySelectorAll('.faq__trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => toggleFaq(trigger));
});


/* ============================================================
   7. MANUFACTURING PROCESS TABS
   ============================================================ */
const processTabs   = document.querySelectorAll('.process__tab');
const processPanels = document.querySelectorAll('.process__panel');

/**
 * Switches the visible process tab panel.
 * Only toggles CSS classes — avoids [hidden] attribute conflict with
 * `.process__panel--active { display: block }` in some browsers.
 * @param {HTMLButtonElement} clicked
 */
function switchTab(clicked) {
  const targetId = 'tab-' + clicked.dataset.tab;

  processTabs.forEach((tab) => {
    const active = tab === clicked;
    tab.classList.toggle('process__tab--active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  processPanels.forEach((panel) => {
    const active = panel.id === targetId;
    panel.classList.toggle('process__panel--active', active);
    // Remove HTML hidden attribute entirely — visibility is controlled via CSS only
    panel.removeAttribute('hidden');
  });
}

processTabs.forEach((tab) => {
  tab.addEventListener('click', () => switchTab(tab));

  // Arrow-key keyboard navigation within the tab list
  tab.addEventListener('keydown', (e) => {
    const list = [...processTabs];
    const cur  = list.indexOf(tab);
    let target;

    if (e.key === 'ArrowRight') target = list[(cur + 1) % list.length];
    if (e.key === 'ArrowLeft')  target = list[(cur - 1 + list.length) % list.length];

    if (target) {
      e.preventDefault();
      target.focus();
      switchTab(target);
    }
  });
});


/* ============================================================
   8. APPLICATIONS CAROUSEL
   ============================================================ */
const appsTrack = document.getElementById('appsTrack');
const appsPrev  = document.getElementById('appsPrev');
const appsNext  = document.getElementById('appsNext');
const appCards  = appsTrack ? [...appsTrack.querySelectorAll('.app-card')] : [];

let appsIdx    = 0;
const GAP      = 20; // px gap between cards (matches CSS gap)

/** Returns how many cards should be fully visible at the current width */
function visibleCount() {
  const w = window.innerWidth;
  if (w <= 480)  return 1;
  if (w <= 800)  return 2;
  if (w <= 1080) return 3;
  return 4;
}

/** Recalculates card widths and repositions the track */
function layoutApps() {
  if (!appsTrack || appCards.length === 0) return;

  const vis       = visibleCount();
  const viewport  = appsTrack.parentElement.offsetWidth;
  const cardW     = (viewport - (vis - 1) * GAP) / vis;
  const maxIdx    = Math.max(0, appCards.length - vis);

  // Clamp current index
  appsIdx = Math.min(appsIdx, maxIdx);

  appCards.forEach((card) => {
    card.style.width     = cardW + 'px';
    card.style.flexShrink = '0';
  });

  appsTrack.style.transform = `translateX(-${appsIdx * (cardW + GAP)}px)`;

  if (appsPrev) appsPrev.disabled = appsIdx === 0;
  if (appsNext) appsNext.disabled = appsIdx >= maxIdx;
}

if (appsPrev) {
  appsPrev.addEventListener('click', () => {
    appsIdx = Math.max(0, appsIdx - 1);
    layoutApps();
  });
}

if (appsNext) {
  appsNext.addEventListener('click', () => {
    const maxIdx = Math.max(0, appCards.length - visibleCount());
    appsIdx = Math.min(maxIdx, appsIdx + 1);
    layoutApps();
  });
}

// Touch / swipe support
let touchX0 = 0;

if (appsTrack) {
  appsTrack.addEventListener('touchstart', (e) => {
    touchX0 = e.changedTouches[0].screenX;
  }, { passive: true });

  appsTrack.addEventListener('touchend', (e) => {
    const delta = touchX0 - e.changedTouches[0].screenX;
    if (Math.abs(delta) < 40) return; // ignore tiny swipes

    const maxIdx = Math.max(0, appCards.length - visibleCount());
    if (delta > 0) {
      appsIdx = Math.min(maxIdx, appsIdx + 1); // swipe left → next
    } else {
      appsIdx = Math.max(0, appsIdx - 1);      // swipe right → prev
    }
    layoutApps();
  }, { passive: true });
}

// Re-calculate on resize (debounced to avoid thrashing) and page load
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(layoutApps, 120);
}, { passive: true });
window.addEventListener('load', layoutApps);


/* ============================================================
   9. MODAL OPEN / CLOSE + FOCUS TRAP
   ============================================================ */

const FOCUSABLE_SEL = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab / Shift+Tab focus within the modal element.
 * Stored so the listener can be removed on close.
 * @param {KeyboardEvent} e
 * @param {HTMLElement} container
 */
function trapFocus(e, container) {
  if (e.key !== 'Tab') return;
  const nodes = [...container.querySelectorAll(FOCUSABLE_SEL)].filter(
    (el) => !el.closest('[aria-hidden="true"]')
  );
  if (nodes.length === 0) { e.preventDefault(); return; }

  const first = nodes[0];
  const last  = nodes[nodes.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

// Map of modal id → bound focus-trap handler (so we can remove it on close)
const _focusTrapHandlers = new Map();
// Remember which element was focused before a modal opened
const _focusReturnEl = new Map();

/**
 * Opens a modal by its element ID.
 * @param {string} id - The modal element's id attribute
 */
function openModal(id) {
  const backdrop = document.getElementById(id);
  if (!backdrop) return;

  // Remember where focus was so we can restore it on close
  _focusReturnEl.set(id, document.activeElement);

  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Move focus to first focusable element inside modal
  const firstFocusable = backdrop.querySelector(FOCUSABLE_SEL);
  if (firstFocusable) setTimeout(() => firstFocusable.focus(), 80);

  // Install focus trap
  const handler = (e) => trapFocus(e, backdrop);
  _focusTrapHandlers.set(id, handler);
  backdrop.addEventListener('keydown', handler);
}

/**
 * Closes a modal by its element ID.
 * @param {string} id - The modal element's id attribute
 */
function closeModal(id) {
  const backdrop = document.getElementById(id);
  if (!backdrop) return;

  backdrop.classList.remove('open');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Remove focus trap
  const handler = _focusTrapHandlers.get(id);
  if (handler) { backdrop.removeEventListener('keydown', handler); _focusTrapHandlers.delete(id); }

  // Return focus to the element that opened the modal
  const returnEl = _focusReturnEl.get(id);
  if (returnEl && returnEl.focus) returnEl.focus();
  _focusReturnEl.delete(id);
}

// Click on backdrop (outside modal box) closes it
document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal(backdrop.id);
  });
});

// Escape key closes any open modal
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.modal-backdrop.open').forEach((m) => closeModal(m.id));
});


/* ============================================================
   10. CATALOGUE MODAL – enable button when email is valid
   ============================================================ */
const catEmailInput  = document.getElementById('catEmail');
const catSubmitBtn   = document.getElementById('catSubmitBtn');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (catEmailInput && catSubmitBtn) {
  catEmailInput.addEventListener('input', () => {
    const valid = EMAIL_RE.test(catEmailInput.value.trim());
    catSubmitBtn.disabled = !valid;
    catSubmitBtn.classList.toggle('btn--muted', !valid);
  });
}


/* ============================================================
   11. FORM SUBMISSION HANDLERS
   ============================================================ */

/**
 * Handles the catalogue modal form.
 * @param {SubmitEvent} e
 */
function handleCatSubmit(e) {
  e.preventDefault();

  if (!catSubmitBtn) return;

  catSubmitBtn.textContent = 'Sending…';
  catSubmitBtn.disabled    = true;

  // Simulate async network call
  setTimeout(() => {
    catSubmitBtn.textContent = '✓ Sent! Check your inbox.';
    setTimeout(() => closeModal('catalogueModal'), 1600);
  }, 900);
}

/**
 * Handles the quote / call-back modal form.
 * @param {SubmitEvent} e
 */
function handleQuoteSubmit(e) {
  e.preventDefault();

  const btn = document.getElementById('quoteSubmitBtn');
  if (!btn) return;

  btn.textContent = 'Submitting…';
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent = '✓ Request submitted!';
    setTimeout(() => {
      closeModal('quoteModal');
      btn.textContent = 'Submit Form';
      btn.disabled    = false;
    }, 1600);
  }, 900);
}

/**
 * Handles the footer CTA contact form.
 * @param {SubmitEvent} e
 */
function handleCtaSubmit(e) {
  e.preventDefault();

  const btn = document.getElementById('ctaSubmitBtn');
  if (!btn) return;

  btn.textContent = 'Submitting…';
  btn.disabled    = true;

  setTimeout(() => {
    btn.textContent = '✓ We\'ll be in touch soon!';
  }, 900);
}


/* ============================================================
   UTILITY – scroll to section by ID
   ============================================================ */

/**
 * Smooth scrolls to a section, accounting for the sticky header height.
 * @param {string} id - Target element id
 */
function scrollToId(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const headerH = siteHeader ? siteHeader.offsetHeight : 0;
  const barH    = (stickyBar && stickyBar.classList.contains('visible'))
    ? stickyBar.offsetHeight
    : 0;

  const top = target.getBoundingClientRect().top + window.scrollY
              - headerH - barH - 16;

  window.scrollTo({ top, behavior: 'smooth' });
}


/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Ensure all FAQ panels start closed
  document.querySelectorAll('.faq__panel').forEach((p) => {
    p.hidden      = true;
    p.style.maxHeight = '0';
  });

  // Carousel initial layout
  layoutApps();

  // Sync zoom image
  syncZoomImage();
});
