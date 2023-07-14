const mongoose = require('mongoose');

const errorSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    lineno: {
        type: Number,
        required: true
    },
    colno: {
        type: Number,
        required: true
    },
    error: {
        type: String
    },
    timestamp: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Error = mongoose.model('Error', errorSchema);

module.exports = Error;
