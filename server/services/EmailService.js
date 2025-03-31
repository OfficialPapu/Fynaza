const nodemailer = require("nodemailer");

const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'abc106065@gmail.com',
        pass: 'cfkp fcvi rjgq ddzc'
    }
});
const SendEmail = async (to, subject, html) => {
    try {
        const from = "abc106065@gmail.com";
        const text = null;
        const mailOptions = { from, to, subject, text, html };
        const info = await Transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
};

module.exports = { SendEmail };
