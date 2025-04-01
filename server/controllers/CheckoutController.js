const ejs = require('ejs');
const { CartItemSchema } = require("../models/CartModel");
const DeliverySchema = require("../models/DeliveryModel");
const { OrderSchema, OrderItemsSchema } = require("../models/OrderModel");
const { ProductSchema } = require("../models/ProductModel");
const { UserSchema } = require("../models/UserModel");
const { SendEmail } = require("../services/EmailService");

const AddNewAddress = async (req, res) => {
    try {
        const { UserID, Name, Phone, City, Address, PostalCode } = req.body;
        const newAddress = new DeliverySchema({ UserID, Name, Phone, City, Address, PostalCode });
        const savedAddress = await newAddress.save();
        res.status(201).json({ AddressID: savedAddress._id });
    } catch (error) {
        res.sendStatus(500);
    }
}
const AllAddress = async (req, res) => {
    try {
        const { UserID } = req.params;
        const Addresses = await DeliverySchema.find({ UserID }, { _id: 1, Name: 1, Address: 1, City: 1, PostalCode: 1, Phone: 1 });
        const AddressesToSend = Addresses.map(address => ({
            ID: address._id,
            Name: address.Name,
            Address: `${address.Address}, ${address.City}${address.PostalCode ? ", " + address.PostalCode : ""}`,
            Phone: address.Phone,
        }));
        res.status(200).json(AddressesToSend);
    } catch (error) {
        res.sendStatus(500);
    }
}
function generateShipmentID() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const timePart = String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0');
    return `FY${year}${month}${timePart}`;
}


const PlaceOrder = async (req, res) => {
    try {
        const { PaymentMethod, PickupLocation, AddressID, PickupCost, Total, Subtotal, Discount, UserID, CartItems } = req.body;
        if (!PaymentMethod || !PickupLocation || !AddressID || !CartItems || CartItems.length === 0 || !Total || !UserID) {
            return res.status(400).json({ message: "Missing required fields or empty cart" });
        }
        const User = await UserSchema.findById(UserID);
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        let OrderItemsID = [];
        for (const [key, Item] of Object.entries(CartItems)) {
            const Product = await ProductSchema.findById(Item.ProductID);
            if (!Product) {
                return res.status(404).json({ message: `Product not found: ${Item.ProductID}` });
            }
            let UnitPrice = Item.PriceAfterDiscount ? Item.PriceAfterDiscount : Item.Price;
            let OrderItem = new OrderItemsSchema({
                ProductID: Product._id,
                BasePrice: Product.Price,
                UnitPrice: UnitPrice,
                Quantity: Item.Quantity,
                Total: UnitPrice * Item.Quantity,
            });
            await CartItemSchema.updateOne(
                { _id: Item.CartItemID },
                { $set: { Status: 'Converted' } }
            );
            await OrderItem.save();
            OrderItemsID.push(OrderItem._id);
        }
        let LastOrderID = (await OrderSchema.findOne().sort({ OrderID: -1 }).select('OrderID -_id').limit(1))?.OrderID || "ORD-0000-000";
        let OrderID = `ORD-${new Date().getFullYear()}-${String(parseInt(LastOrderID.split('-')[2]) + 1).padStart(3, '0')}`;
        const NewOrder = new OrderSchema({
            OrderID,
            UserID,
            OrderItemsID,
            BaseTotal: Subtotal,
            GrandTotal: Total,
            Discount,
            Shipping: {
                ShipmentID: generateShipmentID(),
                Address: AddressID,
                Method: PickupLocation,
                Status: "Pending",
                Cost: PickupCost || 0,
            },
            Payment: {
                Method: PaymentMethod,
            },
        });

        await NewOrder.save();
        const OrderData = await OrderSchema.findById(NewOrder._id).populate({ path: 'OrderItemsID', populate: { path: 'ProductID', select: 'Name Price' } }).populate('UserID', 'Name Email').populate('Shipping.Address', 'Name Phone Address City PostalCode');
        await UserNotify(OrderData);
        await AdminNotify(OrderData);
        res.status(201).json({ OrderID: OrderID });
    } catch (error) {
        res.sendStatus(500);
    }
}


const AdminNotify = async (OrderData) => {
    try {
        const to = 'pappuyadav982675@gmail.com';
        const subject = 'New Order Notification';
        const html = await ejs.renderFile("views/Emails/Notifications/NotifyAdmin.ejs", OrderData);
        const info = await SendEmail(to, subject, html);
    } catch (error) {
        res.status(500).send('Error sending email');
    }
}

const UserNotify = async (OrderData) => {
    try {
        const to = OrderData.UserID.Email;
        const subject = 'Order placed successfully - Fynaza';
        const html = await ejs.renderFile("views/Emails/Notifications/NotifyUser.ejs", OrderData);
        const info = await SendEmail(to, subject, html);
    } catch (error) {
        res.status(500).send('Error sending email');
    }
}
module.exports = { AddNewAddress, AllAddress, PlaceOrder }; 