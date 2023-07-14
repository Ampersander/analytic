const Visitor = require('../models/visitorModel');

// Récupérer tous les visiteurs
exports.getAllVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des visiteurs.' });
    }
};

// Récupérer un visiteur par son ID
exports.getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: 'Visiteur non trouvé.' });
        }
        res.json(visitor);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du visiteur.' });
    }
};

// Créer un visiteur
exports.createVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.create(req.body);
        res.status(201).json(visitor);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du visiteur.' });
    }
};

// Mettre à jour un visiteur
exports.updateVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!visitor) {
            return res.status(404).json({ message: 'Visiteur non trouvé.' });
        }
        res.json(visitor);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du visiteur.' });
    }
};

// Supprimer un visiteur
exports.deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: 'Visiteur non trouvé.' });
        }
        res.json({ message: 'Visiteur supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du visiteur.' });
    }
};
