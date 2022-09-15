import { rendNavbar } from "./components/navbar.js"
/////////////////////////////////////////NAV LINKS
rendNavbar()
///////////////////////////////////////////nav nav nav end end end

//////////////////////////////TABS TABS TABS TABS TABS
let tabs = document.querySelectorAll(".tab")
const tabContainer = document.querySelector(".tab-container")
const contentT = document.querySelectorAll(".content")

tabContainer.addEventListener("click", function (event) {
  const clicked = event.target.closest(".tab")
  if (!clicked) return

  tabs.forEach((t) => t.classList.remove("tab--active"))
  clicked.classList.add("tab--active")

  contentT.forEach((c) => c.classList.remove("content--active"))
  document
    .querySelector(`.content--${clicked.dataset.tab}`)
    .classList.add("content--active")
})
//////////////////////////////TABS TABS TABS END END END

/////////////////////////////////SLIDE SLIDE SLIDE SLIDE

const slides = document.querySelectorAll(".slide")
const btnLeft = document.querySelector(".slider_btn--left")
const btnRight = document.querySelector(".slider_btn--right")
const dotContainer = document.querySelector(".dots")
let currentSlide = 0
let maxSlide = slides.length

const createDots = function () {
  slides.forEach(function (s, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots_dot"  data-slide="${i}"></button>`
    )
  })
}
createDots()

const activeDot = (slide) => {
  document
    .querySelectorAll(".dots_dot")
    .forEach((dot) => dot.classList.remove("dots_dot--active"))

  document
    .querySelector(`.dots_dot[data-slide="${slide}"]`)
    .classList.add("dots_dot--active")
}

const goToSlide = (slide) => {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${150 * (i - slide)}%)`
  })
}
goToSlide(0)

const nextSlide = () => {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0
  } else {
    currentSlide++
  }
  goToSlide(currentSlide)
  activeDot(currentSlide)
}
const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1
  } else {
    currentSlide--
  }
  goToSlide(currentSlide)
  activeDot(currentSlide)
}
btnRight.addEventListener("click", nextSlide)
btnLeft.addEventListener("click", prevSlide)

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots_dot")) {
    const { slide } = e.target.dataset
    goToSlide(slide)
    activeDot(slide)
  }
})
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`))

// btnRight.addEventListener("click", function () {
//   currentSlide++
//   slides.forEach(
//     (s, i) => (s.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
//   )
// })
