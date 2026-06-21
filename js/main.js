document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  document.querySelector('.nav-toggle')?.addEventListener('click', (e) => {
    const navToggle = e.currentTarget;
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    document.querySelector('.nav-links').classList.toggle('open');
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.section-wrap, .testimonial, footer');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el, i) => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 50;
      
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
        el.classList.add(`reveal-delay-${(i % 3) + 1}`);
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});

// Seasonal favicon swap — auto-detects date, no maintenance needed
function setSeasonalFavicon() {
  const m = new Date().getMonth() + 1;
  const d = new Date().getDate();
  let icon = '/favicon.svg';
  if ((m === 12 && d >= 29) || (m === 1 && d <= 2)) icon = '/favicons/favicon-nye.svg';
  else if (m === 2 && d >= 12 && d <= 14)            icon = '/favicons/favicon-val.svg';
  else if (m === 3 && d >= 14 && d <= 17)            icon = '/favicons/favicon-stpat.svg';
  else if (m === 7 && d >= 1  && d <= 7)             icon = '/favicons/favicon-july4.svg';
  else if (m === 10 && d >= 24)                      icon = '/favicons/favicon-halloween.svg';
  else if (m === 11 && d >= 20 && d <= 28)           icon = '/favicons/favicon-thanks.svg';
  else if (m === 12 && d >= 10 && d <= 26)           icon = '/favicons/favicon-xmas.svg';
  const link = document.querySelector('link[rel="icon"]');
  if (link) link.href = icon;
}
setSeasonalFavicon();