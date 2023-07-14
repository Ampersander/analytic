const Event = require('../models/eventModel');

// Méthode pour enregistrer un nouvel événement
exports.createEvent = async (req, res) => {
    try {
        const { eventType, actionId, visitorId, eventTime, eventData } = req.body;

        const newEvent = new Event({
            eventType,
            actionId,
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
        const { eventType, actionId, visitorId, eventTime, eventData } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(id, {
            eventType,
            actionId,
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
