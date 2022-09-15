const express = require("express")
const dotenv = require("dotenv")
const products = require("./data/product")
dotenv.config()

const app = express()

app.get("/", (req, res) => {
  res.send("api")
})

app.get("/api/products", (req, res) => {
  res.json(products)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

const PORT = 5000

app.listen(PORT, console.log("Server is running on port 50000"))
