const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    commentaire: {
        type: String,
        required: true
    }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
