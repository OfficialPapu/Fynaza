const express = require('express');
const { OrderList, OrderByID } = require('../controllers/AdminController');
const AdminRouter = express.Router();

AdminRouter.get("/orders", OrderList)
AdminRouter.get("/order:/OrderID", OrderByID)

module.exports = {AdminRouter};