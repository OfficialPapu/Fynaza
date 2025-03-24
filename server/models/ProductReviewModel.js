const mongoose = require('mongoose');

const ProductReviewSchema = new mongoose.Schema({
    ProductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    Rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    Comment: {
        type: String,
        trim: true
    }
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } });

module.exports = mongoose.model('ProductReviews', ProductReviewSchema, "ProductReviews");