const express = require("express");
const OrderRoute = express.Router();
const {saveOrders, getOrders}= require('../controllers/Order')

OrderRoute.post("/add/order", saveOrders);
OrderRoute.get("/orders", getOrders)

module.exports = { OrderRoute };
