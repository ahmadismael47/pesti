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
    //     pName = pName.value
    //     pPrice = pPrice.value
    //     pImg = pImg.value
    //     pDesc = pDesc.value
    //     dataa = {pName, pPrice,pImg, pDesc}
    //    data = dataa
    axios({
        method: 'post',
        url: '/api/products',
        data: {
        
          id: 1234,
          name: 'Williams',
          price:1236,
          image:"/assets/images/images 2/products/wisdom.svg",
          description: "Wisdom TC Flowable con",
        

        }
      });
    } catch (error) {
        console.log(error)
    }
}


add.addEventListener('click', addProduct)