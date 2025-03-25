const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
    } catch (error) {
        process.exit(1);
    }
}

module.exports = ConnectDB;