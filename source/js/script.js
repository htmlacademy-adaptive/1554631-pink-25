let header = document.querySelector(".site-header")
let menu = document.querySelector(".menu")
let menuToggle = document.querySelector(".menu__toggle")

header.classList.remove("site-header--no-js")
menu.classList.remove("menu--opened")
menu.classList.add("menu--close")

menuToggle.addEventListener("click", function () {
  if (menu.classList.contains("menu--close")) {
    menu.classList.remove("menu--close");
    menu.classList.add("menu--opened");
  }

  else {
    menu.classList.remove("menu--opened");
    menu.classList.add("menu--close");
  }
})
