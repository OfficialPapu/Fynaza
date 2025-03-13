const express = require('express');
const { Signup, Login } = require('../controllers/AuthController');
const AuthRouter = express.Router();

AuthRouter.post("/register", Signup)
AuthRouter.post("/login", Login)

module.exports = { AuthRouter };