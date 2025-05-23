const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    SKU: { type: String, required: true, unique: true },
    Name: { type: String, required: true, trim: true },
    Slug: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    CategoryID: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
    BrandID: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", required: true },
    Price: { type: Number, required: true },
    Discount: {
        Percentage: { type: Number, default: 0 },
        ValidUntil: { type: Date }
    },
    Stock: {
        Quantity: { type: Number, required: true },
        Threshold: { type: Number, default: 10 }
    },
    Media: {
        Images: [
            {
                Url: { type: String, required: true },
            }
        ],
        Videos: [
            {
                Url: { type: String, required: true },
            }
        ]
    },
    Specifications: {
        Color: { type: String },
        Size: { type: String },
        Weight: { type: String },
        CustomAttributes: [
            {
                Key: { type: String, required: true },
                Value: { type: String, required: true }
            }
        ]
    },
    ShippingDetails: {
        Weight: { type: Number },
        Dimensions: {
            Length: { type: Number },
            Width: { type: Number },
            Height: { type: Number }
        }
    },
    Status: { type: String, enum: ['Active', 'Inactive', 'Discontinued'], default: 'Active' }
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } });


module.exports = {
    ProductSchema: mongoose.model('Products', ProductSchema, 'Products'),
};