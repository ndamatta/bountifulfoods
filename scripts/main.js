// HAMBURGER BUTTON
function toggleMenu() {
    document.getElementById("mainNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
};

const x = document.getElementById("hamburgerBtn")
x.onclick = toggleMenu;

// COPYRIGHT AND LAST MODIFIED
let lastModified = document.querySelector(".lastmodified")
let lastModified2 = document.querySelector(".lastmodified2")
let currentYear = document.querySelector("#currentyear")

const lastModifiedOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
};
const currentYearOptions = {
    year: "numeric",
};
lastModified.textContent = ` Last Modified: ${new Date(document.lastModified).toLocaleDateString("en-US", lastModifiedOptions)}`;
currentYear.textContent = `${new Date().toLocaleDateString("en-US", currentYearOptions)}`