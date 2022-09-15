const openModal = document.querySelector(".Login")
const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const btnCloseModal = document.querySelector(".btn--close-modal")

const showModal = () => {
  console.log("Show modal")
  modal.classList.remove("hidden")
  overlay.classList.remove("hidden")
}

const closeModal = () => {
  modal.classList.add("hidden")
  overlay.classList.add("hidden")
}
openModal.addEventListener("click", showModal)
btnCloseModal.addEventListener("click", closeModal)
