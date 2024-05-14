const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSession = new Schema({
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


const UserSession = mongoose.model('UserSession', userSession)

module.exports = UserSession