const Tag = require('../models/tagModel');

// Créer un visiteur
exports.createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du tag.' });
    }
};
