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

// Mettre à jour un tag
exports.updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        // Vérifier si le tag existe
        const tag = await Tag.findById(id);
        if (!tag) {
            return res.status(404).json({ message: 'Tag non trouvé.' });
        }

        // Mettre à jour le champ "comment" du tag
        tag.comment = comment;
        await tag.save();

        res.json(tag);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du tag.' });
    }
};

// Get all tags
exports.getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des tags.' });
    }
}