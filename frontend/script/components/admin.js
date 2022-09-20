let pName = document.querySelector(".prod_name")
let pPrice = document.querySelector(".prod_price")
let pImg = document.querySelector(".prod_img")
let pDesc = document.querySelector(".prod_desc")
let add = document.querySelector(".add")
const addProduct =async (e) =>{
    e.preventDefault()
    try {
    //     let {data } = await axios.post("/api/products")
    //     let dataa = {}
        pName = pName.value
        pPrice = pPrice.value
        pImg = pImg.value
        pDesc = pDesc.value
    //     dataa = {pName, pPrice,pImg, pDesc}
    //    data = dataa
    axios({
        method: 'post',
        url: '/api/products',
        data: {
        
          id: new Date().getTime(),
          name:pName,
          price:pPrice,
          image:pImg,
          description: pDesc
        

        }
      });
    } catch (error) {
        console.log(error)
    }
}


add.addEventListener('click', addProduct)







var productsList = []
const fetchProducts = async () => {
  try {
    const { data } = await axios.get("/api/products")
    // const { data } = await axios.get("/api/products")

    // const { data } = await axios.get("/api/products")
    productsList = data
    // renderProducts(productsList)
    console.log(productsList)
    renderProducts()
  } catch (error) {
    console.log(error)
  }
}
fetchProducts()






