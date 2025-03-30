const mongoose = require('mongoose');

const OrderItemsSchema = new mongoose.Schema({
    ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
    StandardPrice: {
        type: Number,
        required: true
    },
    UnitPrice: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Total: {
        type: Number,
        required: true
    },
    Attributes: {
        type: mongoose.Schema.Types.Mixed,
    },
    Status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    }
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' } });



const OrderSchema = new mongoose.Schema({
    OrderID: {
        type: String,
        unique: true,
        required: true,
    },
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    OrderItemsID: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItems" }],
    Total: { type: Number, required: true },
    Discount: { type: Number, default: 0 },
    Shipping: {
        ShipmentID: { type: String },
        Address: { type: mongoose.Schema.Types.ObjectId, ref: "Deliverys" },
        Method: { type: String, default: null },
        Status: { type: String, enum: ["Pending", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
        Cost: { type: Number, default: 0 },
    },
    Payment: {
        Method: { type: String, required: true },
        Screenshot: { type: String },
    },
    Notes: {
        Customer: [{ Note: { type: String }, date: { type: Date, default: Date.now } }],
        Admin: [{ Note: { type: String }, date: { type: Date, default: Date.now } }],
    },
    CouponCode: { type: String },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' } });


module.exports = {
    OrderSchema: mongoose.model("Orders", OrderSchema, "Orders"),
    OrderItemsSchema: mongoose.model("OrderItems", OrderItemsSchema, "OrderItems"),
};