const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventType: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    visitorId: {
        type: String,
        required: true
    },
    eventTime: {
        type: Date,
        required: true
    },
    eventData: {
        // Définir la structure des données spécifiques à l'événement
        // Exemple : { key1: 'value1', key2: 'value2' }
        type: Object
    },
    appId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;