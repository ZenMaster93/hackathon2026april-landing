/* ============================================
   ZenHire Hackathon — interactions
   ============================================ */

(() => {
  'use strict';

  // ---- Nav: add .scrolled class after scrolling ----
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all others
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });
      // Toggle current
      item.classList.toggle('open', !isOpen);
    });
  });

  // ---- Scroll reveal (IntersectionObserver) ----
  const revealTargets = document.querySelectorAll('.reveal, .score-row');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealTargets.forEach(el => revealObserver.observe(el));

  // ---- Smooth-scroll offset compensation for fixed nav ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // ---- Subtle parallax on hero floaters based on mouse ----
  const hero = document.querySelector('.hero');
  const floaters = document.querySelectorAll('.floater');
  if (hero && floaters.length) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      floaters.forEach((f, i) => {
        const depth = (i + 1) * 6;
        f.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
      });
    });
    hero.addEventListener('mouseleave', () => {
      floaters.forEach(f => { f.style.transform = ''; });
    });
  }
})();
