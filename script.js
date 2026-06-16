/* ============================================================
   OCI DevOps — Bilingual Website Script
   Features: Language toggle, scroll animations, pipeline
   ============================================================ */

'use strict';

/* ── Language Management ── */
const body        = document.body;
const langBtnEn   = document.getElementById('lang-en');
const langBtnAr   = document.getElementById('lang-ar');
const htmlEl      = document.documentElement;

let currentLang = localStorage.getItem('oci-lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('oci-lang', lang);

  if (lang === 'ar') {
    body.classList.add('lang-ar');
    htmlEl.setAttribute('lang', 'ar');
    htmlEl.setAttribute('dir', 'rtl');
    langBtnAr.classList.add('active');
    langBtnEn.classList.remove('active');
  } else {
    body.classList.remove('lang-ar');
    htmlEl.setAttribute('lang', 'en');
    htmlEl.setAttribute('dir', 'ltr');
    langBtnEn.classList.add('active');
    langBtnAr.classList.remove('active');
  }

  document.querySelectorAll('option[data-en][data-ar]').forEach(option => {
    option.textContent = option.dataset[lang];
  });

  // Restart pipeline animation on lang change
  restartPipelineAnimation();
}

langBtnEn.addEventListener('click', () => setLanguage('en'));
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

if (projectForm) {
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!projectForm.reportValidity()) return;

    const formData = new FormData(projectForm);
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

    const mailto = `mailto:support@ociops.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailto;

    if (formNote) {
      formNote.classList.add('success');
      formNote.querySelector('.content-en').textContent = 'Email draft opened for support@ociops.com. Send it to submit the request.';
      formNote.querySelector('.content-ar').textContent = 'تم فتح مسودة بريد إلى support@ociops.com. أرسلها لتقديم الطلب.';
    }
  });
}
