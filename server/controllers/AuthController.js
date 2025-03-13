const { UserSchema } = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const Signup = async (req, res) => {
    try {
        const { Name, Email, Mobile, Password } = req.body;
        if (!Name || !Email || !Mobile || !Password) {
            res.status(200).json({ message: "All fields are mandatory" })
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
            res.status(200).json({ message: "User alredy exist" })
            return;
        }
        const NewUser = new UserSchema({ UID, Name, Email, Mobile, Password });
        await NewUser.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);

    }
}

const Login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            res.status(200).json({ message: "All fields are mandatory" })
            return;
        }
        const User = await UserSchema.findOne({ Email: Email, Password: Password });
        if (User) {
            const token = GenerateJWTToken(User);
            res.cookie("LOGIN_INFO", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                domain: process.env.NODE_ENV === 'production' ? '.fynaza.com' : 'localhost',
                maxAge: 2592000000
            });
            res.status(200).json({ success: true })
        } else {
            res.status(200).json({ message: "Invalid credentials" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const GenerateJWTToken = (User) => {
    const UserData = { ID: User._id, Name: User.Name, Email: User.Email }
    return token = jwt.sign(UserData, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });
}
module.exports = { Signup, Login };