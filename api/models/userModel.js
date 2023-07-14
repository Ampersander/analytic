// user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    appid: {
        type: String,
        unique: true,
    },
    appsecret: {
        type: String,
    },
    corsApp: {
        type: String,
        required: true
    },
    appConfirmed: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
