const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
        default:''
    }
});
module.exports = mongoose.model('UserModel', UserSchema, 'Users');