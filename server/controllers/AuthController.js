const ejs = require('ejs');
const { UserSchema } = require("../models/UserModel");
const { serialize } = require('cookie')
const jwt = require('jsonwebtoken');
const { SendEmail } = require('../services/EmailService');
const { CountryInfo } = require('../config/BaseConfig');

const Signup = async (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const { Country, City } = CountryInfo(ip);
        const { Name, Email, Mobile, Password } = req.body;
        if (!Name || !Email || !Mobile || !Password) {
            res.status(400).json({ message: "All fields are mandatory" })
            return;
        }
        const lastUser = await UserSchema.findOne({}, {}, { sort: { 'UID': -1 } });
        let UID;
        if (lastUser && lastUser.UID) {
            const lastUIDNumber = parseInt(lastUser.UID.slice(3), 10);
            UID = `UID${(lastUIDNumber + 1).toString().padStart(3, '0')}`;
        } else {
            UID = 'UID001';
        }
        const IsUserExist = await UserSchema.findOne({ $or: [{ Email }, { Mobile }] });
        if (IsUserExist) {
            res.status(401).json({ message: "User alredy exist" })
            return;
        }
        const NewUser = new UserSchema({ UID, Name, Email, Mobile, Password, Country, City });
        await NewUser.save();
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const Login = async (req, res) => {
    try {
        const { Email, Password, isAdmin } = req.body;
        if (!Email || !Password) {
            res.status(400).json({ message: "All fields are mandatory" })
            return;
        }
        const User = await UserSchema.findOne({ Email: Email, Password: Password });
        if (!User) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if (isAdmin && !User.Role.includes("Admin")) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        await UserSchema.findOneAndUpdate({ Email: Email }, { $inc: { LoginCount: 1 } }, { new: true });
        const token = GenerateJWTToken(User, req);
        res.setHeader("Set-Cookie", serialize("LOGIN_INFO", token, {
            httpOnly: true, secure: true, sameSite: "Strict", path: "/", maxAge: 2592000000, domain: process.env.NODE_ENV === 'production' ? '.fynaza.com' : undefined,
        }));
        res.status(200).json({ UserID: User._id, Name: User.Name, Email: User.Email, Mobile: User.Mobile, Role: User.Role })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const GenerateJWTToken = (User, req) => {
    const UserData = { UserID: User._id, Email: User.Email, UserAgent: req.headers["user-agent"], IP: req.ip, Role: User.Role }
    return token = jwt.sign(UserData, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
}

const ValidateToken = (req, res) => {
    try {
        const { AccessRole } = req.query;
        const Token = req.cookies.LOGIN_INFO;
        if (!Token) return res.status(401).json({ message: "Not authenticated" });
        const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
        if (decoded.IP !== req.ip || decoded.UserAgent !== req.headers["user-agent"]) {
            res.clearCookie("LOGIN_INFO");
            return res.status(401).json({ message: "Session hijacking detected" });
        }
        const UserDetail = { ...decoded };
        if (AccessRole == "Admin") {
            if (!UserDetail['Role'].includes("Admin")) {
                return res.status(401).json({ message: "Unauthorized access" });
            }
        }

        delete UserDetail.iat;
        delete UserDetail.exp;
        res.status(200).json({ User: UserDetail });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const Logout = (req, res) => {
    try {
        res.clearCookie("LOGIN_INFO");
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const ForgotPassword = async (req, res) => {
    try {
        const { Email } = req.body;
        const User = await UserSchema.findOne({ Email });
        if (!User) return res.status(404).json({ message: "Please enter a valid email" });
        const to = User.Email;
        const subject = 'Password Reset - Fynaza';
        const html = await ejs.renderFile("views/Emails/Notifications/ForgotPassword.ejs", User);
        const info = await SendEmail(to, subject, html);
        if (info.rejected.length > 0) {
            return res.status(400).json({ message: "Invalid Email!" });
        }
        return res.status(200).json({ message: "Password sent to your email!" });
    } catch (emailError) {
        if (emailError.response) {
            if (emailError.response.includes("550 No such user")) {
                return res.status(400).json({ message: "The email does not exist." });
            }
            if (emailError.response.includes("Mailbox unavailable")) {
                return res.status(400).json({ message: "The email is deactivated or unavailable." });
            }
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = { Signup, Login, Logout, ForgotPassword };