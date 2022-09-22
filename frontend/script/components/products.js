import { rendNavbar } from "./navbar.js";
// import { productsList } from "../assets/dummyData.js"

rendNavbar();
const productsCont = document.querySelector(".product-list");
const prodItem = document.createElement("ul");

var productsList = [];
const fetchProducts = async () => {
  try {
    const { data } = await axios.get("/api/products");
    productsList = data;
    renderProducts();
  } catch (error) {
    console.log(error);
  }
};
fetchProducts();

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
      } = item;
      return `
            <li class="product-list_items-item ${category}">
                <div class="product-info" data-set=${id}>
                    <img
                    class="product-info_media"
                    alt=""
                    src="${image}"
                    />
                    <div class="product-info_details">
                        <h5>${name}</h5>
                        <span>Php ${price}</span>
                    </div>
                </div>
            </li>
        `;
    })
    .join("");
  const addToCartBtnCont = document.querySelectorAll(".product-info");
  addToCartBtnCont.forEach((btn) => btn.addEventListener("click", addToCarty));
};

const searchBtn = document.querySelector(".search-btn");

const getValue = async () => {
  let search = document.querySelector(".search-input").value;
  try {
    const { data } = await axios.get("/api/products");
    if (search === "") {
      renderProducts(productsList);
    } else {
      let searchedProd = data.filter(
        (p) =>
          p.category.toLowerCase().startsWith(search.toLowerCase()) ||
          p.name.toLowerCase().startsWith(search.toLowerCase()) ||
          p.brand.toLowerCase().startsWith(search.toLowerCase())
      );

      console.log(searchedProd);
      productsList = searchedProd;
      renderProducts();
    }
  } catch (error) {
    console.log(error);
  }
};

searchBtn.addEventListener("click", getValue);

prodItem.classList.add("product-list_items");
productsCont.append(prodItem);

const equipBtn = document.querySelector(".btn--equip");
const lason = document.querySelector(".btn--qwerty");
const allCatBtn = document.querySelector(".btn--all");
const qwerty = document.querySelectorAll(".qwerty");
const equipments = document.querySelectorAll(".equipment");
const btnCont = document.querySelectorAll(".products-btn");
const removeActive = () => {
  btnCont.forEach((b) => b.classList.remove("tab--active"));
};
const renderEquipments = (e) => {
  // for (let qwe of qwerty) {
  //   qwe.classList.add("none")
  // }
  qwerty.forEach((i) => i.classList.add("none"));
  equipments.forEach((i) => i.classList.remove("none"));
  console.log("equipss only");
  removeActive();
  equipBtn.classList.add("tab--active");
};

const renderLason = (e) => {
  for (let qwe of qwerty) {
    qwe.classList.remove("none");
  }
  equipments.forEach((i) => i.classList.add("none"));
  console.log("equipss only");

  removeActive();
  lason.classList.add("tab--active");
};
const renderAll = () => {
  equipments.forEach((i) => i.classList.remove("none"));
  qwerty.forEach((i) => i.classList.remove("none"));
  btnCont.forEach((b) => b.classList.remove("tab--active"));
  allCatBtn.classList.add("tab--active");
  fetchProducts();
};

////////////////////CART

const span = document.createElement("span");
const cart = document.querySelector(".cart");
let cartProducts = [];
import { isLogin } from "./navbar.js";

const addToCarty = (e) => {
  if (isLogin) {
    let clicked = e.target.closest(".product-info");
    getSingleProduct(clicked.dataset.set);
    cart.append(span);
  } else {
    console.log("No user");
  }
};
const openCart = () => {
  cart.classList.toggle("overlay1");
};

const prodCartCont = document.querySelector(".tr");
const createProd = document.createElement("tbody");
const calc = document.createElement("tbody");
let total = 0;
const renderProdCart = async () => {
  try {
    const { data } = await axios.get(`/api/products/cart`);
    createProd.innerHTML = data
      .map((item) => {
        total += item.price;
        return `
          <tr class=${item.name}>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input class="quantity" type="number" value="1" min="0" max="100" />
            <i class="fa-solid fa-trash "  style="font-size:2rem"></i>
            </tr>
          `;
      })
      .join("");

    calc.innerHTML = `
    <tr class=$>
      <td><h2>TOTAL</h2></td>
      <td><h3>${total}</h3></td>
      <td><button class="btn place_order-btn">Place order</td>
      </tr>
    `;
    prodCartCont.append(createProd);
    prodCartCont.append(calc);
  } catch (error) {}
};

renderProdCart();

const quantityInput = document.querySelectorAll(".quantity");
quantityInput.forEach((i) => i.addEventListener("change", function (e) {}));

cart.addEventListener("click", openCart);
equipBtn.addEventListener("click", renderEquipments);
allCatBtn.addEventListener("click", renderAll);
lason.addEventListener("click", renderLason);

const getSingleProduct = async (id) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    cartProducts = data;
  } catch (error) {}
};
