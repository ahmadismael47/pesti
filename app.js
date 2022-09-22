const express = require("express")
const app = express()
const products = require("./backend/data/product")
const cors = require("cors")
const dotenv = require("dotenv")
const { auth, requiresAuth } = require("express-openid-connect")
const multer = require('multer')
const path  = require("path")
const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, "images")

  },
  filename:(req,file, cb)=>{
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer ({storage: storage})
let user = []
let newProduct = products
let cartProduct = []

dotenv.config()

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET,
  })
)

app.use(express.static("./frontend"))

app.use(cors())

app.use(express.json())

app.post("/upload", upload.single("image"),(req, res) =>{
  res.json({message:"Uploaded"})
})

app.get("/profile", requiresAuth(), (req, res) => {
  // res.json(req.oidc.user)
  user = req.oidc.user
  res.json({ user })
})

app.get("/api/products", (req, res) => {
  res.status(200).json(newProduct)
})
app.post("/api/products", (req, res) => {
  let createdProduct = req.body
  newProduct.push(createdProduct)
  res.status(200).json(newProduct)
})

app.get("/api/products/search", (req, res) => {
  const category = req.query.category

  res.json({
    category,
  })
})

app.get("/api/products/cart", (req,res) =>{

      res.status(200).json(cartProduct)
})
app.get("/api/products/:id", (req, res) => {
  const product = newProduct.find((p) => p._id === req.params.id)
  cartProduct.push(product) 
  res.json(cartProduct)
})
app.delete("/api/products/:id", (req, res) => {
  const product = newProduct.filter((p) => p._id !== req.params.id)
  newProduct = product
  res.json(newProduct)
})



const PORT = 3000

app.listen(PORT, console.log("Server is running on port 3000"))
