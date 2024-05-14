const express = require("express")
const path = require("path")
const router = express.Router()
const bcrypt = require("bcrypt")
const UserModel = require("../models/users.models")

router.get('/',(req,res)=>{
    res.render(path.join(__dirname,"../Views/signin.ejs"))
})

router.post('/',async (req,res)=>{
    try {
        const em = req.body.email;
        const pass = req.body.password
        // Asynchronously search for the user
        const searched = await UserModel.findOne({ "email": em });

        if (searched) {
            console.log(pass)
            console.log(searched.password)
            bcrypt.compare(pass,searched.password).then(result =>{
                if(result){
                    res.render("userdashboard.ejs", { 
                        name: searched.name, 
                        email: searched.email, 
                        password: searched.password, 
                        phone: searched.phone, 
                        work: searched.work, 
                        address: searched.address, 
                        city: searched.city, 
                        country: searched.country 
                    });
                }
                else{
                    res.json({
                        status:"FAILED",
                        message:"INVALID CREDENTIALS"
                    })
                }
                
            })
        }
        else{
            console.log("NOT LOGIN")
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Internal server error." });
    }
})

module.exports = router