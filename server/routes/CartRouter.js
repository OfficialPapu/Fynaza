const express = require("express");
const { AddToCart, RemoveFromCart, CartItems } = require("../controllers/CartController");
const CartRouter = express.Router();

CartRouter.get("/items/:UserID", CartItems);
CartRouter.post("/add", AddToCart);
CartRouter.delete("/remove/:CartItemID", RemoveFromCart);

module.exports = { CartRouter };