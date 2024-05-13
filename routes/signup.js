const express = require("express")
const path = require("path")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const UserModel = require("../models/users.models")
const EmailVerification = require("../models/emailverify.model")
const nodemailer = require("nodemailer")
require("dotenv").config()

let Transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
})

router.get('/',(req,res)=>{
    res.render(path.join(__dirname,"../Views/signup.ejs"))
})


router.post('/', async (req, res) => {
    try {
        const em = req.body.email;

        
        const searched = await UserModel.findOne({ "email": em });

        if (searched) {
            
            console.log("User Already Exists");
            
            res.redirect("usernotfound");
        } else {
            console.log("NEW USER");

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const doc = new UserModel({
                id: Date.now().toString(),
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.phone,
                address: req.body.address,
                city: req.body.city,
                country: req.body.country
            });

            await doc.save(); // Wait for the document to be saved

            res.redirect("emailverify"); // Redirect to email verification page
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error." });
    }
});

const sendOTP = async( _id, email ) => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();

    const mailOption = {
        from : process.env.AUTH_EMAIL,
        to : email,
        subject : <p>Eter</p>
    }
}

module.exports = router