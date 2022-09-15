import { rendNavbar } from "./navbar.js"
// import { productsList } from "../assets/dummyData.js"

rendNavbar()
const productsCont = document.querySelector(".product-list")
const prodItem = document.createElement("ul")

var productsList = []
const fetchProducts = async () => {
  try {
    const { data } = await axios.get("/api/products")
    // const { data } = await axios.get("/api/products")

    // const { data } = await axios.get("/api/products")
    productsList = data
    // renderProducts(productsList)
    console.log(productsList)
    renderProducts(productsList)
  } catch (error) {
    console.log(error)
  }
}
fetchProducts()

const renderProducts = () => {
  prodItem.innerHTML = productsList
    .map((item) => {
      const {
        _id: id,
        name,
        description,
        image,
        category,
        price,
        rating,
        numReviews,
      } = item
      return `
            <li class="product-list_items-item ${category}">
                <div class="product-info">
                    <img
                    class="product-info_media"
                    alt=""
                    src="${image}"
                    />
                    <div class="product-info_details">
                        <h5>${name}</h5>
                        <span>Php ${price}</span>
                        <p>${numReviews} ${rating} sold</p>
                    </div>
                </div>
            </li>
        `
    })
    .join("")
}

prodItem.classList.add("product-list_items")
productsCont.append(prodItem)

const equipBtn = document.querySelector(".btn--equip")
const lason = document.querySelector(".btn--qwerty")
const allCatBtn = document.querySelector(".btn--all")
const qwerty = document.querySelectorAll(".qwerty")
const equipments = document.querySelectorAll(".equipment")
const btnCont = document.querySelectorAll(".products-btn")
const addToCartBtnCont = document.querySelectorAll(".product-info")
const removeActive = () => {
  btnCont.forEach((b) => b.classList.remove("tab--active"))
}
const renderEquipments = (e) => {
  // for (let qwe of qwerty) {
  //   qwe.classList.add("none")
  // }
  qwerty.forEach((i) => i.classList.add("none"))
  equipments.forEach((i) => i.classList.remove("none"))
  console.log("equipss only")
  const clicked = e.target
  removeActive()
  equipBtn.classList.add("tab--active")
}

const renderLason = (e) => {
  for (let qwe of qwerty) {
    qwe.classList.remove("none")
  }
  equipments.forEach((i) => i.classList.add("none"))
  const clicked = e.target
  console.log("equipss only")

  removeActive()
  lason.classList.add("tab--active")
}
const renderAll = () => {
  equipments.forEach((i) => i.classList.remove("none"))
  qwerty.forEach((i) => i.classList.remove("none"))
  btnCont.forEach((b) => b.classList.remove("tab--active"))
  allCatBtn.classList.add("tab--active")
  console.log("equipss only")
}

let counts = 0
const span = document.createElement("span")
const cart = document.querySelector(".cart")
const addToCarty = (e) => {
  counts++

  span.innerHTML = `${counts}`
  cart.append(span)
}
const openCart = () => {
  cart.classList.toggle("overlay1")
}
cart.addEventListener("click", openCart)

addToCartBtnCont.forEach((btn) => btn.addEventListener("click", addToCarty))
equipBtn.addEventListener("click", renderEquipments)
allCatBtn.addEventListener("click", renderAll)
lason.addEventListener("click", renderLason)
