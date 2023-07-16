const Event = require('../models/eventModel');
const User = require('../models/userModel');
const Visitor = require('../models/visitorModel');

// Méthode pour enregistrer un nouvel événement
exports.createEvent = async (req, res) => {
    try {
        const { eventType, tag, visitorId, eventTime, eventData, appId } = req.body;

        const user = await User.find({ appId: appId });

        if (!user) {
            return res.status(404).json({ error: 'AppId non trouvé.' });
        }

        //check if visitorId exist in Visitor collection

        const visitor = await Visitor.find({ visitorId: visitorId });

        if (!visitor) {
            return res.status(404).json({ error: 'VisitorId non trouvé.' });
        }

        const newEvent = new Event({
            appId,
            eventType,
            tag,
            visitorId,
            eventTime,
            eventData
        });

        const savedEvent = await newEvent.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'événement :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'enregistrement de l\'événement.' });
    }
};

// Méthode pour récupérer tous les événements
exports.getAllEvents = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Accès interdit' });
        }
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des événements.' });
    }
};

// Méthode pour récupérer un événement par son ID
exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        if (!req.user.isAdmin) {
            if (req.user.appId !== event.appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        if (!event) {
            return res.status(404).json({ error: 'Événement non trouvé.' });
        }

        res.json(event);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de l\'événement.' });
    }
};

// Méthode pour supprimer un événement par son ID
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);

        if (!req.user.isAdmin) {
            if (req.user.appId !== event.appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ error: 'Événement non trouvé.' });
        }

        res.json({ message: 'Événement supprimé avec succès.' });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'événement :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de l\'événement.' });
    }
};


exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { eventType, tag, visitorId, eventTime, eventData, appId } = req.body;

        if (!req.user.isAdmin) {
            if (req.user.appId !== appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        const user = await User.find({ appId: appId });

        if (!user) {
            return res.status(404).json({ error: 'AppId non trouvé.' });
        }

        //check if visitorId exist in Visitor collection

        const visitor = await Visitor.find({ visitorId: visitorId });

        if (!visitor) {
            return res.status(404).json({ error: 'VisitorId non trouvé.' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, {
            appId,
            eventType,
            tag,
            visitorId,
            eventTime,
            eventData
        }, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Événement non trouvé.' });
        }

        res.json(updatedEvent);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'événement :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour de l\'événement.' });
    }
};

// Méthode pour récupérer tous les événements d'un visiteur

exports.getAllEventsByVisitorId = async (req, res) => {
    try {
        const { visitorId } = req.params;
        const events = await Event.find({ visitorId: visitorId, appId: req.user.appId });
        res.json(events);
    } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des événements.' });
    }
}

// Méthode pour récupérer tous les événements d'une application

exports.getAllEventsByAppId = async (req, res) => {
    try {
        const { appId } = req.params;

        if (!req.user.isAdmin) {
            if (req.user.appId !== appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        const events = await Event.find({ appId: appId });
        res.json(events);
    } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des événements.' });
    }
}