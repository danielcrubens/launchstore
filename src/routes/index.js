const express = require("express")
const routes = express.Router()
const HomeController = require("../app/controllers/HomeController")
const products = require("./products")
const users = require("./users")
const cart = require("./cart")


//Home
routes.get("/", HomeController.index)
//Products
routes.use("/products", products)
//Users
routes.use("/users",users)
//Cart
routes.use("/cart",cart)

//Alias
routes.get("/ads/create", function (req, res) {
  return res.redirect("/products/create")
})
routes.get("/accounts", function (req, res) {
  return res.redirect("/users/login")
})

module.exports = routes
