const express = require("express");
const path = require("path");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/users.models");
const EmailVerification = require("../models/emailverify.model");
const nodemailer = require("nodemailer");
const userSession = require("../models/session.model");
const UserSession = require("../models/session.model");
require("dotenv").config();

const otpStorage = {}

router.get('/', (req, res) => {
    res.render(path.join(__dirname, "../Views/signup.ejs"));
});

router.post('/', async (req, res) => {
    try {
        const { name, email, password, phone, work, address, city, country } = req.body;

        const searched = await UserModel.findOne({ email });

        if (searched) {
            console.log("User Already Exists");
            return res.redirect("usernotfound");
        }

        console.log("NEW USER");

        const otp = generateOTP();

        otpStorage[otp] = { name, email, password, phone, work, address, city, country };

        sendOTP(email, otp);
        
        res.render('emailverify', { name, email, password, phone, work, address, city, country });

        
        // const newUser = new UserModel({
        //     id: Date.now().toString(),
        //     name,
        //     email,
        //     password: hashedPassword,
        //     phone,
        //     address,
        //     city,
        //     country,
        //     verified: false
        // });

        // await newUser.save();

        // await sendOTP(newUser._id, newUser.email, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

async function sendOTP(email, otp) {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'f219142@cfd.nu.edu.pk',
            pass: 'aaxa pxae tihb zbos',
        },
    });


    const mailOptions = {
        from: 'f219142@cfd.nu.edu.pk',
        to: email,
        subject: 'Verification OTP',
        text: `Your OTP for email verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}


//Email Verify Code
router.get('/emailverify',(req,res)=>{
    res.render(path.join(__dirname,"../Views/emailverify.ejs"))
    
})

router.post('/emailverify', async (req, res) => {
    
    const { otp } = req.body;
    const userData = otpStorage[otp];
    console.log("User data is ", userData)
    if (!userData) {
        const error = "Invalid OTP";
        res.redirect(`/signup`)
    }

    try {
        const saltRounds = 10;
        const hash = await bcrypt.hash(userData.password, saltRounds);

        const newUser = new UserModel({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            work: userData.work,
            address: userData.address,
            city: userData.city,
            country: userData.country,
            password: hash
        });

        const newSession = new UserSession({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            work: userData.work,
            address: userData.address,
            city: userData.city,
            country: userData.country,
            password: hash
        })

        console.log("Iam before save")
        console.log("user data before saving is : ", newUser)
        await newUser.save();
        await newSession.save();

        res.redirect('/signin');
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).send('Error saving user data');
    }
})

module.exports = router;
