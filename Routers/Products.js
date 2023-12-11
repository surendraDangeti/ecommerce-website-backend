const express = require("express");
const productsRoute = express.Router();
const { getProducts , addnewProduct } = require('../controllers/Products');



productsRoute.get("/products", getProducts );
productsRoute.post("/add/products", addnewProduct);

module.exports = { productsRoute };
