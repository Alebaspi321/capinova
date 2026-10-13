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
