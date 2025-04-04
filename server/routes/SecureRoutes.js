const express = require('express');
const jwt = require('jsonwebtoken');
const SecureRouter = express.Router();

SecureRouter.use('/', (req, res, next) => {
    const userApiKey = req.header("authorization");
    if (!userApiKey || userApiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: "Unauthorized: Invalid API key" });
    }
    next();
}
)

const UserAuthJWT = (req, res, next) => {
    try {
        const Token = req.cookies.LOGIN_INFO;
        if (!Token) return res.status(401).json({ message: "Not authenticated" });
        const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
        if (decoded.IP !== req.ip || decoded.UserAgent !== req.headers["user-agent"]) {
            res.clearCookie("LOGIN_INFO");
            return res.status(550).json({ message: "Session hijacking detected" });
        }
        next();
    }
    catch (error) {
        res.clearCookie("LOGIN_INFO");
        res.status(550).json({ message: "Internal Server Error" });
    }
}
const AdminAuthJWT = (req, res, next) => {
    try {
        const Token = req.cookies.LOGIN_INFO;
        if (!Token) return res.status(401).json({ message: "Not authenticated" });
        const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
        if (decoded.IP !== req.ip || decoded.UserAgent !== req.headers["user-agent"]) {
            res.clearCookie("LOGIN_INFO");
            return res.status(550).json({ message: "Session hijacking detected" });
        }
        const UserDetail = { ...decoded };
        if (!UserDetail['Role'].includes("Admin")) {
            return res.status(550).json({ message: "Unauthorized access" });
        }
        next();
    }
    catch (error) {
        res.clearCookie("LOGIN_INFO");
        res.status(550).json({ message: "Internal Server Error" });
    }
}

module.exports = { SecureRouter, UserAuthJWT, AdminAuthJWT };