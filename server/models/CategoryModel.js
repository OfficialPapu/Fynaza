const mongoose = require("mongoose")
const CategoriesSchema = mongoose.Schema({
    Category: {
        type: String,
        required: true
    },
    CategoryAttribute: {
        type: String,
        required: true
    },
    Slug: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } })


module.exports = {
    CategoriesSchema: mongoose.model("categories", CategoriesSchema, 'categories'),
};
