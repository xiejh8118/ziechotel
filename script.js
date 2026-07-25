const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 30);
});

menuBtn?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') ?? false;
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => nav?.classList.remove('open'));
});

// Progressive enhancement: content remains visible if JavaScript ever fails.
document.documentElement.classList.add('reveal-ready');
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxClose = document.querySelector('.lightbox-close');

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.image-button').forEach((button) => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = button.dataset.full || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

const booking = document.querySelector('.booking-modal');
const bookingForm = document.querySelector('#bookingForm');
const bookingClose = document.querySelector('.booking-close');
const roomSelect = bookingForm?.elements?.room;

function closeBooking() {
  if (!booking) return;
  booking.classList.remove('open');
  booking.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.open-booking').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.room-card');
    if (card && roomSelect) {
      const room = card.dataset.room || '';
      [...roomSelect.options].forEach((option, index) => {
        if (option.textContent.startsWith(room)) roomSelect.selectedIndex = index;
      });
    }
    if (!booking) return;
    booking.classList.add('open');
    booking.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });
});

bookingClose?.addEventListener('click', closeBooking);
booking?.addEventListener('click', (event) => {
  if (event.target === booking) closeBooking();
});

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const lines = [
    'Hello, I would like to enquire about a booking.',
    `Name: ${data.get('name') || ''}`,
    `Room: ${data.get('room') || ''}`,
    `Check-in: ${data.get('checkin') || ''}`,
    `Check-out: ${data.get('checkout') || ''}`
  ];
  const url = `https://wa.me/855189958899?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener');
});

let lang = 'zh';
document.querySelectorAll('.lang-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    lang = lang === 'zh' ? 'en' : 'zh';
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-zh][data-en]').forEach((element) => {
      element.textContent = element.dataset[lang] || element.textContent;
    });
    document.querySelectorAll('.lang-toggle').forEach((toggle) => {
      toggle.textContent = lang === 'zh' ? 'EN' : '中';
    });
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightbox();
    closeBooking();
  }
});
