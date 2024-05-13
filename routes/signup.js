const express = require("express")
const path = require("path")
const router = express.Router()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const UserModel = require("../models/users.models")


users = []

router.get('/',(req,res)=>{
    res.render(path.join(__dirname,"../Views/signup.ejs"))
})


router.post('/', async (req, res) => {
    try {
        const em = req.body.email;

        // Asynchronously search for the user
        const searched = await UserModel.findOne({ "email": em });

        if (searched) {
            // User already exists
            console.log("User Already Exists");
            // Send a response indicating user existence
            res.redirect("usernotfound");
        } else {
            // User doesn't exist, proceed with registration
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



module.exports = router