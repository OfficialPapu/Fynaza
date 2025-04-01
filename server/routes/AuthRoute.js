const express = require('express');
const { Signup, Login, Logout, ValidateToken, ForgotPassword } = require('../controllers/AuthController');
const AuthRouter = express.Router();

AuthRouter.post("/register", Signup);
AuthRouter.post("/login", Login);
AuthRouter.post("/forgot-password", ForgotPassword);
AuthRouter.post("/logout", Logout);
AuthRouter.get("/validate-token", ValidateToken)

module.exports = { AuthRouter };