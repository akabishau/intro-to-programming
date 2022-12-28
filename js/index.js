// configure footer
let currentYear = new Date().getFullYear();
const copyright = document.createElement('p');
copyright.textContent = `\u00A9 ${currentYear} Aleksey Kabishau`;

const footer = document.querySelector('footer');
footer.appendChild(copyright);