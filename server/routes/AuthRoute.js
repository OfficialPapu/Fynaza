const express = require('express');
const { Signup, Login, Logout, ValidateToken } = require('../controllers/AuthController');
const AuthRouter = express.Router();

AuthRouter.post("/register", Signup);
AuthRouter.post("/login", Login);
AuthRouter.post("/logout", Logout);
AuthRouter.get("/validate-token", ValidateToken)

module.exports = { AuthRouter };