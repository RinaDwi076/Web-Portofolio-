// =============================================
//  RINA DWI APRI LESTARI — PORTFOLIO SCRIPT
// =============================================

// ---- NAVBAR: scroll effect + hamburger ----
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  hamburger.classList.toggle('active');
  if (hamburger.classList.contains('active')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// close nav when a link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

// ---- ACTIVE NAV LINK on scroll ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll(
  '.about-grid, .skills-col, .project-card, .cert-card, .edu-item, .contact-links'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger children
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// staggered reveal for grids
const staggerGroups = [
  '.skills-col',
  '.project-card',
  '.cert-card',
  '.edu-item',
];
staggerGroups.forEach(selector => {
  const items = document.querySelectorAll(selector);
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
  });
});

// ---- LIGHTBOX for certificates ----
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.querySelector('img').src;
    const alt = card.querySelector('img').alt;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ---- SMOOTH TYPING EFFECT on hero tagline ----
const taglineEl = document.querySelector('.hero-tagline');
if (taglineEl) {
  const originalText = taglineEl.textContent;
  taglineEl.textContent = '"';
  let i = 1;
  const interval = setInterval(() => {
    taglineEl.textContent = originalText.slice(0, i);
    i++;
    if (i > originalText.length) clearInterval(interval);
  }, 45);
}

// ---- NAVBAR active link style ----
const styleSheet = document.createElement('style');
styleSheet.textContent = `.nav-links a.active { color: var(--violet-lt) !important; }
.nav-links a.active::after { width: 100% !important; }`;
document.head.appendChild(styleSheet);