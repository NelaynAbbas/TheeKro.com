const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    phone: String,
    work: String,
    address: String,
    city: String,
    country: String,
    verified: Boolean
})


const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel