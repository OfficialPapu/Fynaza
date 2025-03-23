const express = require('express');
const SecureRouter = express.Router();

SecureRouter.use('/', (req, res, next) => {
    const userApiKey = req.header("authorization");
    if (!userApiKey || userApiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: "Unauthorized: Invalid API key" });
    }
    next();
}
)


// const { jwt } = require('jsonwebtoken');
// SecureRouter.use("/", (req, res) => {
//     try {
//         const { AccessRole } = req.query;
//         const Token = req.cookies.LOGIN_INFO;
//         if (!Token) return res.status(401).json({ message: "Not authenticated" });
//         const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
//         if (decoded.IP !== req.ip || decoded.UserAgent !== req.headers["user-agent"]) {
//             res.clearCookie("LOGIN_INFO");
//             return res.status(401).json({ message: "Session hijacking detected" });
//         }
//         const UserDetail = { ...decoded };
//         if (AccessRole == "Admin") {
//             if (!UserDetail['Role'].includes("Admin")) {
//                 return res.status(401).json({ message: "Unauthorized access" });
//             }
//         }

//         delete UserDetail.iat;
//         delete UserDetail.exp;
//         res.status(200).json({ User: UserDetail });
//     }
//     catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// })

module.exports = { SecureRouter };