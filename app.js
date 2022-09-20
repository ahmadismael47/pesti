const express = require("express")
const app = express()
const products = require("./backend/data/product")
const cors = require("cors")
const dotenv = require("dotenv")
const { auth, requiresAuth } = require("express-openid-connect")
let user = []
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

// app.get("/", (req, res) => {
//   res.send("api")
// })
// app.get("/", (req, res) => {
//   res.json(req.oidc.isAuthenticated() ? "Logged in" : "Logged out")
// })

app.get("/profile", requiresAuth(), (req, res) => {
  // res.json(req.oidc.user)
  user = req.oidc.user
  res.json({ user })
})

app.get("/api/products", (req, res) => {
  res.status(200).json(products)
})
app.post("/api/products", (req, res) => {
  let newProduct = {}
   newProduct = req.body
  products.push(newProduct)
  console.log(newProduct)
  res.status(200).json(products)
})

app.get("/api/products/search", (req, res) => {
  const category = req.query.category

  res.json({
    category,
  })
})
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = 3000

app.listen(PORT, console.log("Server is running on port 3000"))
