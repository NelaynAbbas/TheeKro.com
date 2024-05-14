const express = require("express")
const path = require("path")
const router = express.Router()
const bcrypt = require("bcrypt")
const AdminModel = require("../models/admin.model")
const UserModel = require("../models/users.models")

router.get('/',(req,res)=>{
    res.render(path.join(__dirname,"../Views/createUser.ejs"))
})

router.post('/', async (req,res)=>{
    try {
        const { name, email, password, phone, work, address, city, country } = req.body;

        const searched = await UserModel.findOne({ email });

        if (searched) {
            console.log("User Already Exists");
            return res.redirect("usernotfound");
        }

        console.log("NEW USER");

        try {
            const saltRounds = 10;
            const hash = await bcrypt.hash(searched.password, saltRounds);
    
            const newUser = new UserModel({
                name: searched.name,
                email: searched.email,
                phone: searched.phone,
                work: searched.work,
                address: searched.address,
                city: searched.city,
                country: searched.country,
                password: hash
            });
    
            const newSession = new UserSession({
                name: seacrhed.name,
                email: seacrhed.email,
                phone: seacrhed.phone,
                work: seacrhed.work,
                address: seacrhed.address,
                city: seacrhed.city,
                country: seacrhed.country,
                password: hash
            })
    
            console.log("Iam before save")
            console.log("user data before saving is : ", newUser)
            await newUser.save();
            await newSession.save();
    
            res.redirect('/admin');
        } catch (error) {
            console.error('Error saving user data:', error);
            res.status(500).send('Error saving user data');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error." });
    }
    
})

module.exports = router