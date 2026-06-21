document.addEventListener('DOMContentLoaded', () => {
  function trackEvent(action, label = '') {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, { event_category: 'engagement', event_label: label });
    }
  }
  document.querySelectorAll('.post-link, .writing-link').forEach(link => {
    link.addEventListener('click', () => {
      const title = link.closest('.post-card, .writing-card')?.querySelector('h2, .post-title, .writing-title')?.textContent.trim() || 'Unknown Post';
      trackEvent('read_post_click', title);
    });
  });
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', () => {
      trackEvent('cta_click', btn.textContent.trim());
    });
  });
  document.querySelectorAll('a[href="#contact"], a[href$="#contact"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('contact_click', 'Discuss this work');
    });
  });
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
      trackEvent('external_link_click', link.href);
    });
  });
  if (window.location.search.includes('sent=true')) {
    trackEvent('contact_form_success', 'Contact Form Submitted');
  }
});