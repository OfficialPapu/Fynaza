const express = require("express");
const { AddToCart, RemoveFromCart, CartItems, UpdateQuantity } = require("../controllers/CartController");
const CartRouter = express.Router();

CartRouter.get("/items/:UserID", CartItems);
CartRouter.post("/add", AddToCart);
CartRouter.put("/update/:CartItemID", UpdateQuantity);
CartRouter.delete("/remove/:CartItemID", RemoveFromCart);

module.exports = { CartRouter };