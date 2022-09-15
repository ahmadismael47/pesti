const express = require("express")
const app = express()
const products = require("./backend/data/product")
const cors = require("cors")
app.use(express.static("./frontend"))

// app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use(express.json())

app.get("/", (req, res) => {
  res.send("api")
})

app.get("/api/products", (req, res) => {
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

const PORT = 5500

app.listen(PORT, console.log("Server is running on port 5000"))
