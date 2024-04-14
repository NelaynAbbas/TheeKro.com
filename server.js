const express = require('express')
const path = require("path")
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname,"public")))

app.use("/",require(path.join(__dirname,"routes/index.js")))

app.use("/signin.html",require(path.join(__dirname,"routes/signin.js")))
app.use("/signup.html",require(path.join(__dirname,"routes/signup.js")))

app.listen(3000);