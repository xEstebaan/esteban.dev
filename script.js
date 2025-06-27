// Validación y feedback del formulario de contacto

// Carga y cambio de idioma
// Carga de archivos de idioma y cambio dinámico
// Utiliza fetch para cargar archivos JSON de idioma y actualiza el contenido de la página
// Permite cambiar entre español e inglés con un botón
let currentLang = "es";
const langFiles = {
  es: "lang/es.json",
  en: "lang/en.json",
};
const langLabels = {
  es: "ES",
  en: "EN",
};

async function loadLang(lang) {
  const res = await fetch(langFiles[lang]);
  const dict = await res.json();
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.innerHTML = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.placeholder = dict[key];
  });
  document.getElementById("lang-label").textContent = langLabels[lang];
}

document.getElementById("lang-btn").addEventListener("click", () => {
  currentLang = currentLang === "es" ? "en" : "es";
  loadLang(currentLang);
});

window.addEventListener("DOMContentLoaded", () => loadLang(currentLang));

// ======= MENÚ LATERAL MOBILE =======
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');
const mobileLangLink = document.querySelector('.mobile-link.lang-link');

function closeMobileMenu() {
  mobileMenuToggle.classList.remove('active');
  mobileMenu.classList.remove('active');
  mobileOverlay.classList.remove('active');
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

function openMobileMenu() {
  mobileMenuToggle.classList.add('active');
  mobileMenu.classList.add('active');
  mobileOverlay.classList.add('active');
  mobileMenuToggle.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
}

if (mobileMenuToggle && mobileMenu && mobileOverlay) {
  mobileMenuToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  mobileOverlay.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// Cambia el idioma al hacer click en el botón de Language del menú lateral mobile
if (mobileLangLink) {
  mobileLangLink.addEventListener('click', function(e) {
    e.preventDefault();
    currentLang = currentLang === "es" ? "en" : "es";
    loadLang(currentLang);
    closeMobileMenu();
  });
}
