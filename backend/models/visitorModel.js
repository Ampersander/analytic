const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    visitorId: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    browserInfo: {
        // Définir la structure des informations sur le navigateur de l'utilisateur
        // Exemple : { name: 'Chrome', version: '91.0.4472.124', platform: 'Windows' }
        type: Object,
        required: true
    },
    deviceInfo: {
        // Définir la structure des informations sur l'appareil de l'utilisateur
        // Exemple : { type: 'Desktop', brand: 'Apple', model: 'MacBook Pro' }
        type: Object,
        required: true
    },
    performanceInfo: {
        // Définir la structure des informations sur les performances du navigateur
        // Exemple : { navigationStart: 1624648833641, loadEventEnd: 1624648837822, domContentLoadedEventEnd: 1624648833777 }
        type: Object,
        required: true
    },
    locationInfo: {
        // Définir la structure des informations de localisation
        // Exemple : { country: 'United States', region: 'California', city: 'San Francisco' }
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
