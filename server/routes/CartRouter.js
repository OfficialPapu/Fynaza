const express = require("express");
const { AddToCart } = require("../controllers/CartController");
const CartRouter = express.Router();

CartRouter.post("/add", AddToCart);

module.exports = { CartRouter };