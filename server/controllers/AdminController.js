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
        const { OrderID } = req.params;
        const Order = await OrderSchema.findOne({ _id: OrderID }).populate("UserID").populate("OrderItemsID")
            .populate({
                path: "OrderItemsID",
                populate: {
                    path: "ProductID",
                    model: "Products"
                }
            }).populate("Shipping.Address").exec();

        if (!Order) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json(Order);
    } catch (error) {
        res.sendStatus(500);
    }
}

const UpdateOrderByID = async (req, res) => {
    try {
        const { OrderID } = req.params;
        const { updateMode, selectedItems } = req.body
        if (updateMode == "all") {

        }
        res.sendStatus(200);

    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = { OrderList, OrderByID, UpdateOrderByID };