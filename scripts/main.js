// HAMBURGER BUTTON
function toggleMenu() {
    document.getElementById("mainNav").classList.toggle("open");
    document.getElementById("hamburgerBtn").classList.toggle("open");
};

const x = document.getElementById("hamburgerBtn")
if (x) {x.onclick = toggleMenu;}

// LAZY LOAD
const imagesToLoad = document.querySelectorAll(".home-main img[data-src]");

const imgOptions = {
    threshold: 1,
    rootMargin: "0px 0px 50px 0px"
};

const loadImages = (image) => {
image.setAttribute("src", image.getAttribute("data-src"));
image.onload = () => {image.removeAttribute("data-src");};
};

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
        if (item.isIntersecting) {
            loadImages(item.target);
            observer.unobserve(item.target);
        }
        });
    }, imgOptions);

    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} 
else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
};

// COPYRIGHT AND LAST MODIFIED
let lastModified = document.querySelector(".lastmodified")
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
lastModified.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString("en-US", lastModifiedOptions)}`;
currentYear.textContent = `${new Date().toLocaleDateString("en-US", currentYearOptions)}`

//
const drinksH2 = document.querySelector('#drinks h2')
if (drinksH2) {
    drinksH2.textContent = displayDrinks();
}
function displayDrinks() {
    if (localStorage.getItem('drinksTotal') == 0 || localStorage.getItem('drinksTotal') == null) {
        return "You didn't build any drink yet!"
    }
    else {
        return `You built ${localStorage.getItem('drinksTotal')} drinks`
    }
}