const express = require('express')
const collection = require("./config/config")
const path = require("path")

const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,"public")))

app.use("/",require(path.join(__dirname,"routes/index.js")))

app.use("/signin",require(path.join(__dirname,"routes/signin.js")))
app.use("/signup",require(path.join(__dirname,"routes/signup.js")))
app.use("/forgotpassword",require(path.join(__dirname,"routes/forget.js")))
app.use("/emailverify",require(path.join(__dirname,"routes/emailverify.js")))



app.listen(3000);
