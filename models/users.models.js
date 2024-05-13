import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    id: String,
    name:String,
    email:String,
    password: String,
    phone: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
})


const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel