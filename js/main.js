document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  document.querySelector('.nav-toggle')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('open');
  });

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.section-wrap, .testimonial, footer');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el, i) => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 100;
      
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('visible');
        el.classList.add(`reveal-delay-${(i % 3) + 1}`);
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});
