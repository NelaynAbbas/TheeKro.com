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
                    console.log("LOGIN")
                }
                else{
                    console.log("NOT LOGIN")
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