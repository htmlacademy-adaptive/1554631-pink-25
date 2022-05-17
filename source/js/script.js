let header = document.querySelector(".site-header")
let menuToggle = document.querySelector(".menu__toggle")
let menuList = document.querySelector(".menu__list")

header.classList.remove("site-header--no-js")
menuList.classList.remove("menu__list--open")
menuList.classList.add("menu__list--close")
menuToggle.classList.add("menu__toggle--open")
menuToggle.classList.remove("menu__toggle--close")

menuToggle.addEventListener("click", function () {
  if (menuList.classList.contains("menu__list--close")) {
    menuList.classList.remove("menu__list--close");
    menuList.classList.add("menu__list--open");
    menuToggle.classList.add("menu__toggle--close");
    menuToggle.classList.remove("menu__toggle--open");
  } else {
    menuList.classList.remove("menu__list--open");
    menuList.classList.add("menu__list--close");
    menuToggle.classList.add("menu__toggle--open");
    menuToggle.classList.remove("menu__toggle--close");
  }
})
