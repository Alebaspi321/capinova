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


const fictionalProjects = {
  1:{title:'Sistema comercial NovaPOS',category:'SISTEMAS',description:'Panel conceptual para centralizar ventas, inventario, clientes y reportes de una tienda.',objective:'Reducir registros dispersos y conocer el estado del negocio en un solo lugar.',features:['Ventas y comprobantes','Inventario y alertas','Clientes y reportes'],screen:'Resumen comercial',short:'NP',metrics:['Bs 8.450','86%','124']},
  2:{title:'Agenda inteligente CitaFlow',category:'SISTEMAS',description:'Experiencia ficticia de reservas para profesionales, centros de salud y servicios.',objective:'Organizar horarios, reducir cruces de citas y mejorar el seguimiento.',features:['Calendario visual','Ficha de clientes','Recordatorios'],screen:'Agenda de hoy',short:'CF',metrics:['18','92%','6']},
  3:{title:'Dashboard Pulso',category:'DATOS',description:'Tablero ejecutivo conceptual con indicadores de ventas, gastos y rendimiento.',objective:'Convertir información dispersa en decisiones rápidas y comprensibles.',features:['Indicadores clave','Comparación mensual','Alertas visuales'],screen:'Indicadores del negocio',short:'PL',metrics:['+18%','74%','9']},
  4:{title:'Restaurante Sazón Web',category:'WEB',description:'Sitio ficticio para restaurante con menú visual, reservas, ubicación y contacto.',objective:'Facilitar que nuevos clientes conozcan la oferta y realicen una reserva.',features:['Menú digital','Reservas','Mapa y WhatsApp'],screen:'Reservas y pedidos',short:'SZ',metrics:['32','4.8','12']},
  5:{title:'Catálogo Tienda Nexo',category:'WEB',description:'Catálogo conceptual para mostrar productos y recibir pedidos mediante WhatsApp.',objective:'Presentar productos con claridad sin necesitar una tienda virtual compleja.',features:['Categorías','Ficha de producto','Pedido por WhatsApp'],screen:'Catálogo de productos',short:'TN',metrics:['96','14','28']},
  6:{title:'Gestor de proyectos Orbe',category:'SISTEMAS',description:'Espacio ficticio para organizar tareas, responsables, avances y fechas.',objective:'Dar visibilidad al trabajo del equipo y detectar pendientes a tiempo.',features:['Tablero de tareas','Responsables','Avance por proyecto'],screen:'Proyectos activos',short:'OR',metrics:['12','68%','7']},
  7:{title:'Automatización DocuFlow',category:'AUTOMATIZACIÓN',description:'Flujo conceptual que convierte formularios en PDFs y correos organizados.',objective:'Ahorrar tiempo en documentos repetitivos y reducir errores manuales.',features:['Formulario inicial','PDF automático','Envío por correo'],screen:'Flujos automáticos',short:'DF',metrics:['146','98%','3']},
  8:{title:'Portal educativo AulaNova',category:'WEB + SISTEMAS',description:'Portal ficticio para cursos, materiales, inscripciones y seguimiento básico.',objective:'Centralizar la experiencia de estudiantes y la administración de contenidos.',features:['Cursos y módulos','Inscripciones','Progreso'],screen:'Panel educativo',short:'AN',metrics:['84','12','76%']},
  9:{title:'Identidad visual Luma',category:'BRANDING',description:'Concepto de marca con identidad, paleta y sistema de piezas para redes.',objective:'Construir una presencia reconocible y consistente en distintos canales.',features:['Logo conceptual','Paleta y tipografía','Plantillas sociales'],screen:'Biblioteca de marca',short:'LU',metrics:['24','6','3']},
  10:{title:'Panel inmobiliario Hábitat',category:'SISTEMAS + WEB',description:'Proyecto ficticio para organizar propiedades, contactos y seguimiento comercial.',objective:'Mostrar inmuebles y mantener ordenadas las oportunidades de venta o alquiler.',features:['Propiedades','Contactos interesados','Seguimiento comercial'],screen:'Gestión inmobiliaria',short:'HB',metrics:['48','17','11']}
};

const projectModal = document.getElementById('project-modal');
let lastProjectTrigger = null;
function openProjectModal(projectId, trigger) {
  const project = fictionalProjects[projectId];
  if (!project || !projectModal) return;
  lastProjectTrigger = trigger;
  document.getElementById('project-modal-category').textContent = project.category;
  document.getElementById('project-modal-title').textContent = project.title;
  document.getElementById('project-modal-description').textContent = project.description;
  document.getElementById('project-modal-objective').textContent = project.objective;
  document.getElementById('project-modal-features').innerHTML = project.features.map((item) => '<li>' + item + '</li>').join('');
  document.getElementById('preview-screen-title').textContent = project.screen;
  document.getElementById('preview-short-title').textContent = project.short;
  document.getElementById('metric-a').textContent = project.metrics[0];
  document.getElementById('metric-b').textContent = project.metrics[1];
  document.getElementById('metric-c').textContent = project.metrics[2];
  document.getElementById('project-modal-cta').href = 'https://wa.me/59174280209?text=' + encodeURIComponent('Hola CapiNova, me interesa crear algo similar al proyecto conceptual: ' + project.title + '.');
  projectModal.hidden = false;
  document.body.classList.add('project-modal-open');
  projectModal.querySelector('.project-modal-close')?.focus();
}
function closeProjectModal() {
  if (!projectModal) return;
  projectModal.hidden = true;
  document.body.classList.remove('project-modal-open');
  lastProjectTrigger?.focus();
}
document.querySelectorAll('.project-view').forEach((button) => button.addEventListener('click', () => openProjectModal(button.dataset.project, button)));
projectModal?.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', closeProjectModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && projectModal && !projectModal.hidden) closeProjectModal(); });
