const { OrderSchema, OrderItemsSchema } = require("../models/OrderModel");
const { SendEmail } = require("../services/EmailService");
const ejs = require('ejs');

const OrderList = async (req, res) => {
    try {
        const Orders = await OrderSchema.find({}, "OrderID Shipping.Status GrandTotal OrderItemsID CreatedAt").populate("UserID").populate("Shipping.Address").sort({ CreatedAt: -1 });
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
            return res.sendStatus(404);
        }
        return res.status(200).json(Order);
    } catch (error) {
        res.sendStatus(500);
    }
}

const UpdateOrderByID = async (req, res) => {
    try {
        const { OrderID } = req.params;
        let { updateMode, selectedItems, NewStatus } = req.body
        NewStatus = NewStatus.charAt(0).toUpperCase() + NewStatus.slice(1);
        const OrderData = await OrderSchema.findById(OrderID).populate({ path: 'OrderItemsID', populate: { path: 'ProductID', select: 'Name Price' } }).populate('UserID', 'Name Email').populate('Shipping.Address', 'Name Phone Address City PostalCode');
        const OrderItemID = OrderData.OrderItemsID.map(item => item._id);
        await OrderSchema.updateOne({ _id: OrderID }, { "Shipping.Status": NewStatus });
        if (updateMode == "all") {
            await OrderItemsSchema.updateMany({ _id: { $in: OrderItemID } }, { Status: NewStatus })
        } else {
            const unselectedItems = OrderItemID.filter(id => !selectedItems.includes(id.toString()));
            if (unselectedItems.length > 0) {
                await OrderItemsSchema.updateMany({ _id: { $in: unselectedItems } }, { Status: "Cancelled" });
            }
            if (selectedItems.length > 0) {
                await OrderItemsSchema.updateMany({ _id: { $in: selectedItems } }, { Status: NewStatus });
            }
        }
        const StatusActions = { "Shipped": OrderStatusShipped, "Delivered": OrderStatusDelivered, "Cancelled": OrderStatusCanceled };
        StatusActions[NewStatus]?.(OrderData)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


const OrderStatusDelivered = async (OrderData) => {
    try {
        const to = OrderData.UserID.Email;
        const subject = 'Regarding your Dream Skin Nepal Order!';
        const html = await ejs.renderFile("views/Emails/Notifications/OrderStatusDelivered.ejs", OrderData);
        const info = await SendEmail(to, subject, html);
    } catch (error) {
        res.status(500).send('Error sending email');
    }
}

const OrderStatusShipped = async (OrderData) => {
    try {
        const to = OrderData.UserID.Email;
        const subject = 'Regarding your Dream Skin Nepal Order!';
        const html = await ejs.renderFile("views/Emails/Notifications/OrderStatusShipped.ejs", OrderData);
        const info = await SendEmail(to, subject, html);
    } catch (error) {
        res.status(500).send('Error sending email');
    }
}

const OrderStatusCanceled = async (OrderData) => {
    try {
        const to = OrderData.UserID.Email;
        const subject = 'Regarding your Dream Skin Nepal Order!';
        const html = await ejs.renderFile("views/Emails/Notifications/OrderStatusCanceled.ejs", OrderData);
        const info = await SendEmail(to, subject, html);
    } catch (error) {
        res.status(500).send('Error sending email');
    }
}

module.exports = { OrderList, OrderByID, UpdateOrderByID };