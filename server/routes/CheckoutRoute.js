const express = require('express');
const { AddNewAddress, AllAddress, PlaceOrder } = require('../controllers/CheckoutController');
const CheckoutRouter = express.Router();

CheckoutRouter.post("/delivery/add", AddNewAddress);
CheckoutRouter.get("/delivery/:UserID", AllAddress);
CheckoutRouter.post("/success", PlaceOrder);

module.exports = { CheckoutRouter };