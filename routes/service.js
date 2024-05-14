const express = require("express")
const path = require("path")
const router = express.Router()
const UserModel = require("../models/users.models")

router.get('/',async (req,res)=>{
    try {
        const searched = await UserModel.find();

        if (searched) {
            res.render("service.ejs", {searched});
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