const express = require("express")
const path = require("path")
const router = express.Router()
const bcrypt = require("bcrypt")
const UserModel = require("../models/users.models")


users = []

router.get('/',(req,res)=>{
    res.render(path.join(__dirname,"../Views/signup.ejs"))
})


router.post('/', async (req,res)=>{

    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        
        res.redirect("emailverify");

    } catch (e) {
        console.log("eeeeee");
        res.redirect("/signup");
    }
})


module.exports = router