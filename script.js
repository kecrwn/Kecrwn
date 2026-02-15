const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}
