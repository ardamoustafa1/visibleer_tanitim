// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('show');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('show');
  }));
}

// Current year in footer
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Smooth scroll offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    const header = document.querySelector('.site-header');
    const offset = header ? header.getBoundingClientRect().height + 8 : 70;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Improve details toggle UX: close others
document.querySelectorAll('.faq details').forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) {
      document.querySelectorAll('.faq details').forEach(o => { if (o !== d) o.open = false; });
    }
  });
});

// Header elevation on scroll
const header = document.querySelector('.site-header');
if (header) {
  const elevate = () => {
    if (window.scrollY > 12) header.classList.add('elevated');
    else header.classList.remove('elevated');
  };
  elevate();
  window.addEventListener('scroll', elevate, { passive: true });
}

// Reveal animations
const revealEls = document.querySelectorAll('.section, .card, .fcard, .feature-item, .pcard, .about-card, .kpi');
const onReveal = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'transform .6s cubic-bezier(.2,.6,.2,1), opacity .6s ease';
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
};
const observer = new IntersectionObserver(onReveal, { threshold: 0.08 });
revealEls.forEach(el => { el.style.transform = 'translateY(12px)'; el.style.opacity = '0'; observer.observe(el); });

// Sticky CTA appear after scroll
const sticky = document.getElementById('stickyCta');
if (sticky) {
  const onScroll = () => {
    if (window.scrollY > 500) sticky.classList.add('show');
    else sticky.classList.remove('show');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}


