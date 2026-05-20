const body = document.querySelector("body");

const footer = document.createElement("footer");

// footer.textContent = "my webpage footer";

body.appendChild(footer);

const today = new Date();

const thisYear = today.getFullYear();

// const footer = document.querySelector("footer");

const copyright = document.createElement("p");

copyright.innerHTML = `&copy; Tiya Francy Arangassery ${thisYear}`;

footer.appendChild(copyright);