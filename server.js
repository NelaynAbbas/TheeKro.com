const express = require('express')
const collection = require("./config/config")
const path = require("path")
const iniializer = require("./config/passport-config")
const UserModel = require("./models/users.models")
const mongoose = require("mongoose")
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://nelaynabbas5:SnQs6PEUoVHFHAbZ@theekro.qukcde7.mongodb.net/?retryWrites=true&w=majority&appName=Theekro')
.then(() => console.log('MongoDB connected…'))
.catch(err => console.log("err"))

const schema = new Schema({
    id: String,
    name:String,
    email:String,
    password: String,
    phone: String,
    address: String,
    city: String,
    country: String
  });
  const Model = mongoose.model('Test', schema);
  const doc = new Model();
  
  doc.save();

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended: false}))

app.use("/",require(path.join(__dirname,"routes/index.js")))

app.use("/signin",require(path.join(__dirname,"routes/signin.js")))
app.use("/signup",require(path.join(__dirname,"routes/signup.js")))
app.use("/forgotpassword",require(path.join(__dirname,"routes/forget.js")))
app.use("/emailverify",require(path.join(__dirname,"routes/emailverify.js")))


app.listen(3000);
