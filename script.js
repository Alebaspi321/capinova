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


const businessType = document.getElementById('business-type');
const packageForm = document.getElementById('package-form');
const summaryTitle = document.getElementById('summary-title');
const summaryText = document.getElementById('summary-text');
const recommendedList = document.getElementById('recommended-list');
const selectedServices = document.getElementById('selected-services');
const builderWhatsApp = document.getElementById('builder-whatsapp');
const projectDetail = document.getElementById('project-detail');

const packageRecommendations = {
  restaurante: { label: 'Restaurante o cafetería', text: 'Conviene facilitar pedidos, reservas y control operativo.', services: ['Página web con menú y contacto', 'Sistema de ventas e inventario', 'Automatización de pedidos'] },
  comercio: { label: 'Tienda o comercio', text: 'La prioridad suele ser organizar productos, ventas y clientes.', services: ['Catálogo o página web', 'Sistema de inventario y ventas', 'Dashboard comercial'] },
  profesional: { label: 'Servicios profesionales', text: 'Una presencia clara y un seguimiento ordenado ayudan a convertir consultas.', services: ['Página web profesional', 'Agenda o CRM de clientes', 'Automatización de documentos'] },
  salud: { label: 'Salud y bienestar', text: 'La organización de citas y la comunicación con pacientes son centrales.', services: ['Agenda de citas', 'Página informativa', 'Seguimiento y recordatorios'] },
  educacion: { label: 'Educación o capacitación', text: 'El contenido, las inscripciones y el seguimiento pueden centralizarse.', services: ['Portal o página educativa', 'Sistema de inscripciones', 'Automatización de certificados'] },
  inmobiliaria: { label: 'Inmobiliaria o construcción', text: 'Es útil ordenar propiedades, contactos, proyectos y avances.', services: ['Catálogo de propiedades o proyectos', 'CRM de contactos', 'Dashboard de seguimiento'] },
  turismo: { label: 'Turismo, hotelería o eventos', text: 'Las reservas, consultas y promociones necesitan un flujo simple.', services: ['Página web con reservas', 'Gestión de consultas', 'Contenido para redes'] },
  emprendimiento: { label: 'Emprendimiento o marca personal', text: 'Una identidad coherente y un canal digital claro son un buen inicio.', services: ['Branding e identidad', 'Landing page', 'Contenido para redes'] },
  otro: { label: 'Tu negocio', text: 'Analizaremos tu proceso para definir una solución realmente útil.', services: ['Diagnóstico digital', 'Propuesta a medida', 'Implementación por etapas'] }
};

function updatePackageBuilder() {
  if (!packageForm || !businessType) return;
  const recommendation = packageRecommendations[businessType.value];
  const checked = [...packageForm.querySelectorAll('input[name="service"]:checked')].map((input) => input.value);
  const delivery = packageForm.querySelector('input[name="delivery"]:checked')?.value || '';
  const details = projectDetail?.value.trim() || '';

  if (recommendation) {
    summaryTitle.textContent = 'Propuesta para: ' + recommendation.label;
    summaryText.textContent = recommendation.text;
    recommendedList.innerHTML = recommendation.services.map((service) => '<li>' + service + '</li>').join('');
  } else {
    summaryTitle.textContent = 'Selecciona tu rubro para comenzar';
    summaryText.textContent = 'Te mostraremos una recomendación orientativa según el tipo de negocio.';
    recommendedList.innerHTML = '<li>Elige un rubro y te ayudamos a priorizar.</li>';
  }

  selectedServices.textContent = checked.length ? checked.join(' · ') : 'Ninguno todavía';
  const ready = Boolean(recommendation && checked.length);
  builderWhatsApp.classList.toggle('disabled', !ready);
  builderWhatsApp.setAttribute('aria-disabled', String(!ready));
  if (ready) {
    const lines = [
      'Hola CapiNova, quiero armar una solución para mi negocio.',
      '',
      'Rubro: ' + recommendation.label,
      'Servicios que me interesan: ' + checked.join(', '),
      'Modalidad: ' + delivery,
      'Sugerencia mostrada: ' + recommendation.services.join(', ')
    ];
    if (details) lines.push('Detalle adicional: ' + details);
    builderWhatsApp.href = 'https://wa.me/59174280209?text=' + encodeURIComponent(lines.join('\n'));
  } else {
    builderWhatsApp.href = '#configurador';
  }
}

packageForm?.addEventListener('change', updatePackageBuilder);
projectDetail?.addEventListener('input', updatePackageBuilder);
updatePackageBuilder();
