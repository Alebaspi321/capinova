const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

function closeMenu() {
  if (!nav || !menuButton) return;
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  if (!nav) return;
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 960) closeMenu();
});

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());


const revealTargets = document.querySelectorAll('.section-heading, .service-card, .process-grid article, .portfolio-card, .custom-package, .contact-card');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((element) => element.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => observer.observe(element));
}


const serviceFilters = document.querySelectorAll('.service-filter');
const serviceCards = document.querySelectorAll('.service-card[data-category]');
serviceFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    serviceFilters.forEach((item) => item.classList.toggle('active', item === button));
    serviceCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.classList.toggle('is-hidden', !matches);
      if (matches) {
        card.classList.remove('is-entering');
        void card.offsetWidth;
        card.classList.add('is-entering');
      }
    });
  });
});
