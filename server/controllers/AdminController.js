const { OrderSchema } = require("../models/OrderModel");

const OrderList = async (req, res) => {
    try {
        const Orders = await OrderSchema.find({}, "OrderID Shipping.Status GrandTotal OrderItemsID CreatedAt").populate("UserID", "Name Email").sort({ CreatedAt: -1 });
        res.status(200).json(Orders);
    } catch (error) {
        res.sendStatus(500);
    }
}

const OrderByID = async (req, res) => {
    try {
        const { OrderID } = req.query;
        const Order = await OrderSchema.find({OrderID}).populate("UserID");
        console.log(OrderID);
        
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = { OrderList, OrderByID };