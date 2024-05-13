const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailVerificationSchema = new Schema({
    userId: String,
    otp: String,
    createdAt: String,
    expiresAt: String
})


const EmailVerification = mongoose.model('EmailVerification', emailVerificationSchema)

module.exports = EmailVerification