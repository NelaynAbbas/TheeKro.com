const express = require("express");
const path = require("path");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/users.models");
const EmailVerification = require("../models/emailverify.model");
const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "dsacs2009@gmail.com",
        pass: "polataxi69",
    },
});

router.get('/', (req, res) => {
    res.render(path.join(__dirname, "../Views/signup.ejs"));
});

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, address, city, country } = req.body;

        const searched = await UserModel.findOne({ email });

        if (searched) {
            console.log("User Already Exists");
            // return res.redirect("usernotfound");
        }

        console.log("NEW USER");

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new UserModel({
            id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            city,
            country,
            verified: false
        });

        await newUser.save();

        await sendOTP(newUser._id, newUser.email, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

const sendOTP = async (_id, email, res) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const hashedOTP = await bcrypt.hash(otp.toString(), 10);

        const mailOptions = {
            from: "dsacs2009@gmail.com",
            to: email,
            subject: "Verify Your Email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email and complete the signup.</p><p>This code expires in <b>1 Hour.</b></p>`
        };

        const newEmailVerification = new EmailVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000
        });

        await newEmailVerification.save();
        await transporter.sendMail(mailOptions);

        res.json({
            userId: _id,
            email,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error sending OTP email." });
    }
};

module.exports = router;