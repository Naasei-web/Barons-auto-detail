const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const form = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const service = form.elements.service.value.trim();
    const message = form.elements.message.value.trim();

    if (!name || !email || !phone || !service || !message) {
      formMessage.textContent = 'Please complete all fields before sending your enquiry.';
      formMessage.className = 'form-message error';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.className = 'form-message error';
      return;
    }

    formMessage.textContent = 'Thanks for your enquiry. We will be in touch soon.';
    formMessage.className = 'form-message success';
    form.reset();
  });
}
