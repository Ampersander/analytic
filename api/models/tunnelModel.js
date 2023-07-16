const mongoose = require('mongoose');

const tunnelSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
});

const Tunnel = mongoose.model('Tunnel', tunnelSchema);

module.exports = Tunnel;