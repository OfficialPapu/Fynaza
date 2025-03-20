const mongoose = require('mongoose');

let CartItemSchema = mongoose.Schema({
    ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    Price: Number,
    Quantity: Number,
    status: {
        type: String,
        enum: ['Active', 'Abandoned', 'Converted'],
        default: 'Active'
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } })

CartItemSchema = mongoose.model('CartItem', CartItemSchema, "CartItems");

let CartSchema = mongoose.Schema({
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    CartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }],
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