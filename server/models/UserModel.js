const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    UID: {
        type: String,
        unique: true,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Mobile: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
    },
    ProfilePic: {
        type: String,
    },
    Gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    Role: {
        type: [String],
        enum: ['Customer', 'Influencer', 'Admin'],
        default: ['Customer'],
    },
    DOB: {
        type: Date,
    },
}, { timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdateAt' } })

module.exports = { UserSchema: mongoose.model("users", UserSchema, "users") };