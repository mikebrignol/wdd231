const year = new Date().getFullYear();

document.getElementById("currentYear").textContent = `© ${year} - Mike Brignol - Haiti`;

const last = document.lastModified;

document.getElementById("lastModified").textContent = `Last Modified: ${last}`;