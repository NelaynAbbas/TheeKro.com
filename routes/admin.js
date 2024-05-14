const express = require("express")
const path = require("path")
const router = express.Router()
const bcrypt = require("bcrypt")
const AdminModel = require("../models/admin.model")

router.get('/',(req,res)=>{
    res.render(path.join(__dirname,"../Views/admindashboard.ejs"))
})

module.exports = router