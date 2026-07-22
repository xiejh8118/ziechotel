const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

function handleSubmit(event) {
  event.preventDefault();
  const message = document.getElementById('form-message');
  message.textContent = '需求已记录（演示）。下一版可接入 WhatsApp、邮箱或数据库。';
  message.style.fontWeight = '700';
  return false;
}
