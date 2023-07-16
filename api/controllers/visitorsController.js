const Visitor = require('../models/visitorModel');
const User = require('../models/userModel');

// Récupérer tous les visiteurs
exports.getAllVisitors = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Accès interdit' });
        }
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

        if (!req.user.isAdmin) {
            if (req.user.appId !== visitor.appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

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
        const { appId } = req.body;
        const user = await User.find({ appId: appId });

        if (!user) {
            return res.status(404).json({ error: 'AppId non trouvé.' });
        }

        const visitor = await Visitor.create(req.body);
        res.status(201).json(visitor);
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du visiteur.' });
    }
};

// Mettre à jour un visiteur
exports.updateVisitor = async (req, res) => {
    try {
        const { appId } = req.body;

        if (!req.user.isAdmin) {
            if (req.user.appId !== appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        const user = await User.find({ appId: appId });

        if (!user) {
            return res.status(404).json({ error: 'AppId non trouvé.' });
        }
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

        const visitor = await Visitor.findById(req.params.id);
        if (!req.user.isAdmin) {
            if (req.user.appId !== visitor.appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        const visitorTodelete = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitorTodelete) {
            return res.status(404).json({ message: 'Visiteur non trouvé.' });
        }
        res.json({ message: 'Visiteur supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du visiteur.' });
    }
};

// Récupérer tous les visiteurs d'une application

exports.getAllVisitorsByAppId = async (req, res) => {
    try {
        const { appId } = req.params;

        if (!req.user.isAdmin) {
            if (req.user.appId !== appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        const visitors = await Visitor.find({ appId: appId });

        if (!visitors) {
            return res.status(404).json({ error: 'Erreur non trouvée.' });
        }

        res.json(visitors);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'erreur :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de l\'erreur.' });
    }
}
