const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        default: "Nepal",
    },
    PostalCode: {
        type: String,
    },
    WhatsApp: {
        type: String,
    },
    Notes: {
        type: String
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } })

module.exports = mongoose.model("Deliverys", DeliverySchema, "Deliverys");