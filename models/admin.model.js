const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: String,
    email: String,
})

const adminModel = mongoose.model('adminModel', adminSchema)

module.exports = adminModel