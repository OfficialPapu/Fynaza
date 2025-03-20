const mongoose = require('mongoose');

let CartItemSchema = mongoose.Schema({
    ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    Price: Number,
    Quantity: Number,
    Status: {
        type: String,
        enum: ['Active', 'Abandoned', 'Converted'],
        default: 'Active'
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } })

CartItemSchema = mongoose.model('CartItems', CartItemSchema, "CartItems");

let CartSchema = mongoose.Schema({
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    CartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItems" }],
    Total: {
        type: Number,
        default: 0
    },
    Discount: {
        type: Number,
        default: 0
    },
    ShippingMethod: {
        Method: { type: String, default: null },
        Cost: { type: Number, default: 0 }
    }
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } })

CartSchema = mongoose.model('Cart', CartSchema, "Cart");
module.exports = { CartSchema, CartItemSchema };