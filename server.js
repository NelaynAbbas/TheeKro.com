const express = require('express')
const collection = require("./config/config")
const path = require("path")
const iniializer = require("./config/passport-config")
const UserModel = require("./models/users.models")
const mongoose = require("mongoose")
const { Schema } = mongoose;

const app = express()
const port = 3000

mongoose.connect('mongodb+srv://nelaynabbas5:SnQs6PEUoVHFHAbZ@theekro.qukcde7.mongodb.net/?retryWrites=true&w=majority&appName=Theekro')
.then(() => console.log('MongoDB connected…'))
.catch(err => console.log("err"))

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: false}))

app.use("/",require(path.join(__dirname,"routes/index.js")))

app.use("/signin",require(path.join(__dirname,"routes/signin.js")))
app.use("/signup",require(path.join(__dirname,"routes/signup.js")))
app.use("/forgotpassword",require(path.join(__dirname,"routes/forget.js")))
app.use("/usernotfound",require(path.join(__dirname,"routes/usernotfound.js")))
app.use("/userdashboard",require(path.join(__dirname,"routes/userdashboard.js")))
app.use("/service",require(path.join(__dirname,"routes/service.js")))

app.listen(3000);
