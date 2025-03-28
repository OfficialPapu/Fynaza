const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const ConnectDB = require('./config/DBConnection');
const { CategoryRouter } = require('./routes/CategoryRoute');
const { ProductRouter } = require('./routes/ProductRoute');
const bodyParser = require('body-parser');
const { SecureRouter } = require('./routes/SecureRoutes');
const { AuthRouter } = require('./routes/AuthRoute');
const { CartRouter } = require('./routes/CartRouter');
const { CheckoutRouter } = require('./routes/CheckoutRoute');
require('dotenv/config');
ConnectDB();



//CORS
app.use(cors({ origin: process.env.NODE_ENV === 'production' ? 'https://fynaza.com' : 'http://localhost:3000', credentials: true }));
app.options("*", cors());



// Middleware for parsing URL-encoded form data (optional if you're expecting form submissions)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static('public'))
app.use('/', SecureRouter);

//Category
app.use("/api/categories", CategoryRouter);

//Product
app.use('/api/product', ProductRouter);

//auth
app.use("/api/auth", AuthRouter);

//cart
app.use("/api/cart", CartRouter);
app.use("/api/checkout", CheckoutRouter);


const startServer = async () => {
    try {
        await ConnectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on Port http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database. Server not started.');
    }
};

startServer();