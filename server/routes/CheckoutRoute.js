const express = require('express');
const { AddNewAddress, AllAddress } = require('../controllers/CheckoutController');
const CheckoutRouter = express.Router();

CheckoutRouter.post("/delivery/add", AddNewAddress);
CheckoutRouter.get("/delivery/:UserID", AllAddress);

module.exports = { CheckoutRouter };