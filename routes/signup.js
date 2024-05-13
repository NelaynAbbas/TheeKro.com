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


router.post('/', async (req,res)=>{
    em = req.body.email;
    try{
        UserModel.find({em}).then(result =>{
            if(result.length > 0){
                console.log("User Already Exis");
            }
            else{
                console.log("NEW USER");
            }
        })


        const hashedPassword = await bcrypt.hash(req.body.password,10)
        
        const doc = new UserModel({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            phone:req.body.phone,
            address:req.body.address,
            city:req.body.city,
            country:req.body.country
        });
        
        doc.save();
        res.redirect("emailverify");

    } catch (e) {
        console.log(e);
        res.redirect("/signup");
    }
})

module.exports = router