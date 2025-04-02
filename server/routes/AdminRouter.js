const express = require('express');
const { OrderList, OrderByID, UpdateOrderByID } = require('../controllers/AdminController');
const AdminRouter = express.Router();

AdminRouter.get("/orders", OrderList)
AdminRouter.get("/order/:OrderID", OrderByID);
AdminRouter.put("/order/:OrderID", UpdateOrderByID);

module.exports = { AdminRouter };