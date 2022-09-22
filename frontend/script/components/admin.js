import { rendNavbar } from "./navbar.js";

rendNavbar();
let pName = document.querySelector(".prod_name");
let pPrice = document.querySelector(".prod_price");
let pImg = document.querySelector(".prod_img");
let pDesc = document.querySelector(".prod_desc");
let pBrand = document.querySelector(".prod_brand");
let pCategory = document.querySelector(".prod_category");
let add = document.querySelector(".add");
const addProduct = async (e) => {
  try {
    //     let {data } = await axios.post("/api/products")
    //     let dataa = {}
    pName = pName.value;
    pPrice = pPrice.value;
    pImg = pImg.value;
    pCategory = pCategory.value;
    pBrand = pBrand.value;
    pDesc = pDesc.value;

    if (
      pName === "" ||
      pBrand === "" ||
      pCategory === "" ||
      pDesc === "" ||
      pImg === "" ||
      pPrice === ""
    )
      return;
    axios({
      method: "post",
      url: "/api/products",
      data: {
        _id: new Date().getTime(),
        name: pName,
        price: pPrice,
        image: pImg,
        description: pDesc,
        category: pCategory,
        brand: pBrand,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

add.addEventListener("click", addProduct);

var productsList = [];
const fetchProducts = async () => {
  try {
    const { data } = await axios.get("/api/products");
    console.log(data);
    productsList = data;
    renderProducts();
  } catch (error) {
    console.log(error);
  }
};
fetchProducts();

// const productsCont = document.querySelector(".prod_list_admin")
// const prodItem = document.createElement("tr")

const productsCont = document.querySelector(".prod_list_admin");
const prodItem = document.createElement("tbody");

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
        brand,
      } = item;

      return `
   
                    
             <tr class="${category} body">
             
             
             <td>${name}</td>
             <td>${price}</td>
             <td>${category}</td>
             <td>${brand}</td>
             <td style="text-align:center" >
         
              <i class="fa-solid fa-pen-to-square" style="font-size:2rem;margin-right:.8rem"></i>
              <button class="trash" data-tab="${id}">  <i class="fa-solid fa-trash "  style="font-size:2rem"></i></button>
             </td>

             </tr>
           
            

        `;
    })
    .join("");
  let trashBtn = document.querySelectorAll(".trash");
  trashBtn.forEach((btn) => btn.addEventListener("click", deleteProd));
};

productsCont.append(prodItem);

const deleteProd = async (e) => {
  e.preventDefault();
  let clicked = e.target.closest(".trash");
  console.log(clicked.dataset.tab);
  try {
    const { data } = await axios.delete(`/api/products/${clicked.dataset.tab}`);

    productsList = data;
    fetchProducts();
  } catch (error) {}
  return;
};

////////////////////////delete product
