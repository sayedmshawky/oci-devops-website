/* ============================================================
   OCI DevOps — Multilingual Website Script
   Features: Language toggle, scroll animations, pipeline
   ============================================================ */

'use strict';

/* ── Language Management ── */
const body        = document.body;
const langBtnEn   = document.getElementById('lang-en');
const langBtnEs   = document.getElementById('lang-es');
const langBtnAr   = document.getElementById('lang-ar');
const htmlEl      = document.documentElement;

let currentLang = localStorage.getItem('oci-lang') || 'en';

const spanishTranslations = {
  'Services': 'Servicios',
  'Pipeline': 'Pipeline',
  'Deployment': 'Despliegue',
  'Regions': 'Regiones',
  'Why OCI': 'Por que OCI',
  'Contact': 'Contacto',
  'Get Started': 'Comenzar',
  '🚀 Oracle Cloud Infrastructure': '🚀 Oracle Cloud Infrastructure',
  'Accelerate Your Delivery\nwith OCI DevOps': 'Acelera tus entregas\ncon OCI DevOps',
  'A fully managed, end-to-end CI/CD platform on Oracle Cloud. Build, test, and deploy applications faster — with enterprise-grade security, governance, and observability built in.': 'Una plataforma CI/CD integral y administrada en Oracle Cloud. Construye, prueba y despliega aplicaciones mas rapido, con seguridad, gobierno y observabilidad empresarial integrados.',
  'Start Your Project': 'Inicia tu proyecto',
  'Explore Services': 'Explorar servicios',
  'Uptime SLA': 'SLA de disponibilidad',
  'Deploy Targets': 'Destinos de despliegue',
  'Ideal Cost': 'Costo ideal',
  'Build Pipeline': 'Pipeline de build',
  'Running • 2m 18s': 'En ejecucion • 2m 18s',
  'OKE Deployment': 'Despliegue OKE',
  '✓ Succeeded • 3 pods': '✓ Correcto • 3 pods',
  'Canary Release': 'Release canary',
  '10% → 100% traffic': '10% → 100% trafico',
  '⚙️ CI/CD Pipeline': '⚙️ Pipeline CI/CD',
  'From Code to Production in Minutes': 'Del codigo a produccion en minutos',
  'OCI DevOps automates every stage of your software delivery workflow with built-in quality gates and approvals.': 'OCI DevOps automatiza cada etapa de entrega de software con controles de calidad y aprobaciones integradas.',
  'Code': 'Codigo',
  'Build': 'Build',
  'Test': 'Pruebas',
  'Package': 'Paquete',
  'Approve': 'Aprobar',
  'Deploy': 'Desplegar',
  'Monitor': 'Monitorear',
  '🛠️ Core Services': '🛠️ Servicios principales',
  'Everything You Need to Ship Faster': 'Todo lo que necesitas para entregar mas rapido',
  'OCI Ops provides DevOps, Azure DevOps integration, cloud infrastructure, automation, and platform engineering services across the tools your teams already use.': 'OCI Ops ofrece servicios de DevOps, integracion con Azure DevOps, infraestructura cloud, automatizacion e ingenieria de plataformas sobre las herramientas que tus equipos ya usan.',
  'Code Repositories': 'Repositorios de codigo',
  'Private Git repositories hosted on OCI with pull requests, code reviews, branch protection rules, and repository insights. Scale without limits.': 'Repositorios Git privados en OCI con pull requests, revisiones de codigo, reglas de proteccion de ramas e informacion del repositorio. Escala sin limites.',
  'Code Review': 'Revision de codigo',
  'Build Pipelines (CI)': 'Pipelines de build (CI)',
  'Automated build stages that compile, test, and package your code. Run parallel stages, use managed build runners, and cache dependencies for speed.': 'Etapas automatizadas que compilan, prueban y empaquetan tu codigo. Ejecuta etapas paralelas, usa runners administrados y cachea dependencias para mayor velocidad.',
  'Parallel Stages': 'Etapas paralelas',
  'Build Cache': 'Cache de build',
  'Deployment Pipelines (CD)': 'Pipelines de despliegue (CD)',
  'Deploy to OCI Compute, OKE Kubernetes clusters, or Oracle Functions. Supports Blue-Green and Canary strategies with automatic traffic shifting and rollback.': 'Despliega en OCI Compute, clusters OKE Kubernetes u Oracle Functions. Soporta estrategias blue-green y canary con cambio automatico de trafico y rollback.',
  'Security & OCI Vault': 'Seguridad y OCI Vault',
  'Securely manage secrets, certificates, and encryption keys with OCI Vault integration. Role-based access with IAM policies and audit logging across every pipeline step.': 'Gestiona secretos, certificados y claves de cifrado con OCI Vault. Acceso por roles con politicas IAM y auditoria en cada paso del pipeline.',
  'Secrets': 'Secretos',
  'OKE Kubernetes Integration': 'Integracion OKE Kubernetes',
  'First-class integration with Oracle Kubernetes Engine. Deploy containerized workloads to OKE clusters with private endpoint support, namespace targeting, and Helm chart deployments.': 'Integracion de primera clase con Oracle Kubernetes Engine. Despliega cargas contenerizadas en OKE con endpoints privados, namespaces y Helm charts.',
  'Observability & Logging': 'Observabilidad y logs',
  'Real-time visibility into build and deployment pipelines via OCI Logging and Monitoring integration. Create custom dashboards, alerts, and trace pipeline execution history.': 'Visibilidad en tiempo real de pipelines de build y despliegue con OCI Logging y Monitoring. Crea dashboards, alertas y trazabilidad de ejecucion.',
  'Monitoring': 'Monitoreo',
  'Alerts': 'Alertas',
  'Azure DevOps Services Setup': 'Configuracion de Azure DevOps Services',
  'Design and configure Azure DevOps projects, boards, repos, pipelines, approvals, service connections, and secure integrations with OCI, Azure, GitHub, Docker, Kubernetes, and third-party tools.': 'Disenamos y configuramos proyectos, boards, repos, pipelines, aprobaciones, service connections e integraciones seguras con OCI, Azure, GitHub, Docker, Kubernetes y herramientas de terceros.',
  'All Platforms': 'Todas las plataformas',
  'Azure DevOps Integration': 'Integracion con Azure DevOps',
  'Connect Azure DevOps with OCI, Azure, GitHub, Bitbucket, Jira, Slack, Teams, container registries, Kubernetes clusters, security scanners, and release approval workflows.': 'Conecta Azure DevOps con OCI, Azure, GitHub, Bitbucket, Jira, Slack, Teams, registries de contenedores, clusters Kubernetes, scanners de seguridad y flujos de aprobacion.',
  'Release Gates': 'Controles de release',
  'Cloud Infrastructure Services': 'Servicios de infraestructura cloud',
  'Plan, build, and automate secure cloud foundations: networking, compute, Kubernetes, load balancers, DNS, certificates, backups, monitoring, IAM, and infrastructure as code.': 'Planifica, construye y automatiza bases cloud seguras: redes, compute, Kubernetes, balanceadores, DNS, certificados, backups, monitoreo, IAM e infraestructura como codigo.',
  'Cloud Foundation': 'Base cloud',
  'OCI Cost Optimization': 'Optimizacion de costos OCI',
  'Analyze OCI usage, right-size compute, optimize storage, review idle resources, improve tagging, set budgets, and build dashboards that help teams control cloud spend.': 'Analiza el uso de OCI, ajusta compute, optimiza storage, revisa recursos inactivos, mejora etiquetas, configura presupuestos y dashboards para controlar el gasto cloud.',
  'Right Sizing': 'Ajuste de tamanos',
  'Spend Control': 'Control de gasto',
  'Database Health Check': 'Health Check de bases de datos',
  'Review database performance, backup posture, security configuration, capacity trends, patching status, slow queries, high availability, and operational risks.': 'Revisa rendimiento, backups, seguridad, tendencias de capacidad, parches, consultas lentas, alta disponibilidad y riesgos operativos de bases de datos.',
  'Availability': 'Disponibilidad',
  'Grafana Setup': 'Configuracion de Grafana',
  'Install and configure Grafana dashboards, data sources, alerts, SSO, folders, permissions, and monitoring views for infrastructure, applications, Kubernetes, and databases.': 'Instala y configura dashboards de Grafana, fuentes de datos, alertas, SSO, carpetas, permisos y vistas de monitoreo para infraestructura, aplicaciones, Kubernetes y bases de datos.',
  '🎯 Deployment Targets': '🎯 Destinos de despliegue',
  'Deploy Anywhere on OCI': 'Despliega en cualquier lugar de OCI',
  'One pipeline, multiple targets. OCI DevOps supports rolling, blue-green, and canary releases across all OCI compute services.': 'Un pipeline, multiples destinos. OCI DevOps soporta releases rolling, blue-green y canary en los servicios compute de OCI.',
  'Containerized workloads, Helm charts, private clusters': 'Cargas contenerizadas, Helm charts, clusters privados',
  'OCI Compute Instances': 'Instancias OCI Compute',
  'VM / Bare Metal rolling deployments with instance groups': 'Despliegues rolling en VM / Bare Metal con grupos de instancias',
  'Serverless functions — zero infrastructure to manage': 'Funciones serverless, sin infraestructura que administrar',
  'Blue-Green Strategy': 'Estrategia blue-green',
  'Zero-downtime deployments with instant switchover': 'Despliegues sin downtime con cambio instantaneo',
  'Canary Releases': 'Releases canary',
  'Gradual traffic shifting from 1% to 100% with auto-rollback': 'Cambio gradual de trafico de 1% a 100% con rollback automatico',
  '✨ Why Choose OCI DevOps': '✨ Por que elegir OCI DevOps',
  'Built for Enterprise Scale': 'Construido para escala empresarial',
  "OCI DevOps combines the simplicity of a managed service with the power of Oracle's global cloud infrastructure.": 'OCI DevOps combina la simplicidad de un servicio administrado con la potencia de la infraestructura global de Oracle Cloud.',
  'Platform Uptime SLA': 'SLA de disponibilidad de plataforma',
  'OCI Regions Worldwide': 'Regiones OCI en el mundo',
  'Managed Infrastructure': 'Infraestructura administrada',
  'Pay-as-You-Go Model': 'Modelo pay-as-you-go',
  'No upfront costs. You only pay for compute time during builds and deployments — zero cost when pipelines are idle.': 'Sin costos iniciales. Pagas solo por compute durante builds y despliegues, con costo cero cuando los pipelines estan inactivos.',
  'Enterprise Governance': 'Gobierno empresarial',
  'Built-in approval gates, audit trails, and RBAC via OCI IAM ensure full control over every deployment.': 'Aprobaciones integradas, auditoria y RBAC con OCI IAM aseguran control total sobre cada despliegue.',
  'Auto-Scaling': 'Autoescalado',
  'Build runners scale on-demand. Never wait for resources — OCI provisions managed compute automatically for every build.': 'Los runners escalan bajo demanda. No esperes recursos: OCI aprovisiona compute administrado automaticamente para cada build.',
  'Infrastructure as Code': 'Infraestructura como codigo',
  'Deep integration with OCI Resource Manager (Terraform) to provision infrastructure alongside application deployments.': 'Integracion con OCI Resource Manager (Terraform) para aprovisionar infraestructura junto con despliegues de aplicaciones.',
  'Security by Default': 'Seguridad por defecto',
  'OCI Vault for secrets, end-to-end encryption, private endpoint support, and compliance with global security standards.': 'OCI Vault para secretos, cifrado extremo a extremo, endpoints privados y cumplimiento de estandares globales de seguridad.',
  'Multi-Region Availability': 'Disponibilidad multiregion',
  'Deploy to 40+ OCI regions worldwide. Use multi-region pipelines for disaster recovery and global distribution.': 'Despliega en mas de 40 regiones OCI. Usa pipelines multiregion para recuperacion ante desastres y distribucion global.',
  '🚀 Project Intake': '🚀 Solicitud de proyecto',
  'Tell Us About Your\nCloud Project': 'Cuentanos sobre tu proyecto cloud',
  'Share your project goals and contact details. Our team will review the request and get in touch to plan the right OCI DevOps path.': 'Comparte tus objetivos y datos de contacto. Nuestro equipo revisara la solicitud y se pondra en contacto para planificar el camino adecuado.',
  'Fast response': 'Respuesta rapida',
  'Project review and first contact': 'Revision del proyecto y primer contacto',
  'Clear scope': 'Alcance claro',
  'CI/CD, OKE, security, and migration needs': 'Necesidades de CI/CD, OKE, seguridad y migracion',
  'Full name': 'Nombre completo',
  'Email': 'Correo electronico',
  'Phone / WhatsApp': 'Telefono / WhatsApp',
  'Company': 'Empresa',
  'Project type': 'Tipo de proyecto',
  'Timeline': 'Plazo',
  'Project details': 'Detalles del proyecto',
  'Send Project Details': 'Enviar detalles del proyecto',
  'Submit the form and we will receive your request at support@ociops.com.': 'Envia el formulario y recibiremos tu solicitud en support@ociops.com.',
  '© 2026 OCI Ops. All rights reserved.': '© 2026 OCI Ops. Todos los derechos reservados.',
  'Docs': 'Documentacion',
  'Support': 'Soporte'
  ,
  'Home': 'Inicio',
  '🌐 OCI Global Footprint': '🌐 Presencia global de OCI',
  'OCI Regions Map': 'Mapa de regiones OCI',
  'Plan deployments across Oracle Cloud commercial regions. Use this map to compare region locations, availability domains, and geographic coverage for resilient architecture design.': 'Planifica despliegues en regiones comerciales de Oracle Cloud. Usa este mapa para comparar ubicaciones, dominios de disponibilidad y cobertura geografica para disenos resilientes.',
  'Commercial regions listed': 'Regiones comerciales listadas',
  'Continental groups': 'Grupos continentales',
  'Primary commercial realm': 'Realm comercial principal',
  '📍 Commercial Regions': '📍 Regiones comerciales',
  'Region Directory': 'Directorio de regiones',
  "Based on Oracle's public OCI commercial realms list. Availability domain counts are shown as AD.": 'Basado en la lista publica de regiones comerciales de OCI de Oracle. Los dominios de disponibilidad se muestran como AD.',
  'Source: Oracle Cloud Infrastructure documentation, "Regions and Availability Domains." Exact data center addresses are not published here; city-level region locations are used for architecture planning.': 'Fuente: documentacion de Oracle Cloud Infrastructure, "Regions and Availability Domains." No se publican direcciones exactas de data centers; se usan ubicaciones por ciudad para planificacion de arquitectura.',
  'Oracle Regions Docs': 'Docs de regiones Oracle'
};

function applySpanishTranslations() {
  document.querySelectorAll('.content-en').forEach(element => {
    if (!element.dataset.enText) {
      element.dataset.enText = element.textContent.trim();
      element.dataset.enHtml = element.innerHTML;
    }
    const originalText = element.dataset.enText;
    element.textContent = spanishTranslations[originalText] || originalText;
  });
}

function restoreEnglishText() {
  document.querySelectorAll('.content-en[data-en-html]').forEach(element => {
    element.innerHTML = element.dataset.enHtml;
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('oci-lang', lang);
  restoreEnglishText();

  if (lang === 'ar') {
    body.classList.add('lang-ar');
    body.classList.remove('lang-es');
    htmlEl.setAttribute('lang', 'ar');
    htmlEl.setAttribute('dir', 'rtl');
    langBtnAr.classList.add('active');
    langBtnEn.classList.remove('active');
    langBtnEs.classList.remove('active');
  } else if (lang === 'es') {
    body.classList.remove('lang-ar');
    body.classList.add('lang-es');
    htmlEl.setAttribute('lang', 'es');
    htmlEl.setAttribute('dir', 'ltr');
    langBtnEs.classList.add('active');
    langBtnEn.classList.remove('active');
    langBtnAr.classList.remove('active');
    applySpanishTranslations();
  } else {
    body.classList.remove('lang-ar', 'lang-es');
    htmlEl.setAttribute('lang', 'en');
    htmlEl.setAttribute('dir', 'ltr');
    langBtnEn.classList.add('active');
    langBtnAr.classList.remove('active');
    langBtnEs.classList.remove('active');
  }

  document.querySelectorAll('option[data-en]').forEach(option => {
    option.textContent = option.dataset[lang] || option.dataset.en;
  });

  // Restart pipeline animation on lang change
  restartPipelineAnimation();
}

window.setLanguage = setLanguage;

langBtnEn.addEventListener('click', () => setLanguage('en'));
langBtnEs.addEventListener('click', () => setLanguage('es'));
langBtnAr.addEventListener('click', () => setLanguage('ar'));

/* ── Navigation: Scroll Effect ── */
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ── Mobile Hamburger ── */
const hamburger  = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ── Scroll Animations (Intersection Observer) ── */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  animObserver.observe(el);
});

/* ── Pipeline Animation ── */
const connectors  = document.querySelectorAll('.pipeline-connector');
const pipeSteps   = document.querySelectorAll('.pipeline-step');

function runPipelineSequence() {
  let i = 0;
  pipeSteps.forEach(s => s.classList.remove('active'));
  connectors.forEach(c => c.classList.remove('filled'));

  function step() {
    if (i < pipeSteps.length) {
      pipeSteps[i].classList.add('active');
      if (i < connectors.length) {
        connectors[i].classList.add('filled');
      }
      i++;
      setTimeout(step, 700);
    }
  }
  step();
}

function restartPipelineAnimation() {
  runPipelineSequence();
}

// Start pipeline when in view
const pipelineSection = document.querySelector('.pipeline-section');
const pipelineObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    runPipelineSequence();
    // Repeat every 5s while in view
    if (!pipelineSection._interval) {
      pipelineSection._interval = setInterval(runPipelineSequence, 5000);
    }
  } else {
    clearInterval(pipelineSection._interval);
    pipelineSection._interval = null;
  }
}, { threshold: 0.3 });

if (pipelineSection) pipelineObserver.observe(pipelineSection);

// Apply saved language after pipeline animation helpers are ready.
setLanguage(currentLang);

/* ── Animated Number Counters ── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, stepTime);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  counterObserver.observe(el);
});

/* ── Smooth Scroll for Anchor Links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Hero Section: Parallax Tilt on mouse (subtle) ── */
const hero = document.querySelector('.hero');
if (hero) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    const badges = document.querySelectorAll('.hero-badge');
    badges.forEach((b, i) => {
      const depth = (i + 1) * 0.4;
      b.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
}

/* ── Project Contact Form ── */
const projectForm = document.getElementById('project-contact-form');
const formNote = document.getElementById('form-note');
const WEB3FORMS_ACCESS_KEY = '51d334ef-aab9-4249-b953-272c2ecec346';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

function setFormNote(type, enText, arText, esText = enText) {
  if (!formNote) return;

  const enNote = formNote.querySelector('.content-en');
  const arNote = formNote.querySelector('.content-ar');

  formNote.classList.remove('success', 'error');
  if (type) formNote.classList.add(type);

  enNote.dataset.enText = enText;
  enNote.dataset.enHtml = enText;
  enNote.textContent = currentLang === 'es' ? esText : enText;
  arNote.textContent = arText;
}

if (projectForm) {
  projectForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!projectForm.reportValidity()) return;

    const formData = new FormData(projectForm);
    const submitButton = projectForm.querySelector('button[type="submit"]');
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const phone = formData.get('phone')?.trim();
    const company = formData.get('company')?.trim() || 'Not provided';
    const projectType = formData.get('projectType');
    const timeline = formData.get('timeline');
    const details = formData.get('details')?.trim();

    const subject = `New OCI DevOps project request - ${name}`;
    const bodyLines = [
      'New project request from ociops.com',
      '',
      `Customer name: ${name}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone}`,
      `Company: ${company}`,
      `Project type: ${projectType}`,
      `Timeline: ${timeline}`,
      '',
      'Project details:',
      details,
      '',
      'Please contact the customer to discuss next steps.'
    ];

    formData.set('access_key', WEB3FORMS_ACCESS_KEY);
    formData.set('subject', subject);
    formData.set('from_name', 'OCI Ops Website');
    formData.set('replyto', email);
    formData.set('message', bodyLines.join('\n'));

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute('aria-busy', 'true');
    }

    setFormNote(
      null,
      'Sending your request...',
      'جاري إرسال طلبك...',
      'Enviando tu solicitud...'
    );

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Form submission failed.');
      }

      projectForm.reset();
      setFormNote(
        'success',
        'Request sent successfully. We will contact you soon.',
        'تم إرسال الطلب بنجاح. سنتواصل معك قريباً.',
        'Solicitud enviada correctamente. Nos pondremos en contacto pronto.'
      );
    } catch (error) {
      setFormNote(
        'error',
        'Sorry, the request could not be sent. Please email support@ociops.com.',
        'عذراً، تعذر إرسال الطلب. يرجى مراسلة support@ociops.com.',
        'Lo sentimos, no se pudo enviar la solicitud. Escribe a support@ociops.com.'
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
      }
    }
  });
}
