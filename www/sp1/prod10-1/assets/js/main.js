var menuOpen = document.getElementById("menu-open");
var menuClose = document.getElementById("menu-close");
var overlay = document.getElementById("overlay");
var menu = document.getElementById("menu-collapse");

menuOpen.addEventListener("click", function() {
    menu.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

menuClose.addEventListener("click", function() {
    menu.classList.add("hidden");
    overlay.classList.add("hidden");
});

overlay.addEventListener("click", function() {
    menu.classList.add("hidden");
    overlay.classList.add("hidden");
});