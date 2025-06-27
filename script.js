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
