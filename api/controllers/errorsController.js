const Error = require('../models/errorModel');
const User = require('../models/userModel');
const Visitor = require('../models/visitorModel');

// Méthode pour enregistrer une nouvelle erreur
exports.createError = async (req, res) => {
    try {
        const { message, source, lineno, colno, error, timestamp, visitorId, appId } = req.body;

        //check if appId exist in User collection

        const user = await User.find({ appId: appId });

        if (!user) {
            return res.status(404).json({ error: 'AppId non trouvé.' });
        }

        //check if visitorId exist in Visitor collection

        const visitor = await Visitor.find({ visitorId: visitorId });

        if (!visitor) {
            return res.status(404).json({ error: 'VisitorId non trouvé.' });
        }

        const newError = new Error({
            appId,
            visitorId,
            message,
            source,
            lineno,
            colno,
            error,
            timestamp
        });

        const savedError = await newError.save();

        res.status(201).json(savedError);
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'erreur :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'enregistrement de l\'erreur.' });
    }
};

// Méthode pour récupérer toutes les erreurs
exports.getAllErrors = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Accès interdit' });
        }
        const errors = await Error.find();
        res.json(errors);
    } catch (error) {
        console.error("Erreur lors de la récupération des erreurs :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des erreurs.' });
    }
};

// Méthode pour récupérer une erreur par son ID
exports.getErrorById = async (req, res) => {
    try {
        const { id } = req.params;

        const error = await Error.findById(id);

        if (!req.user.isAdmin) {
            if (req.user.appId !== error.appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        if (!error) {
            return res.status(404).json({ error: 'Erreur non trouvée.' });
        }

        res.json(error);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'erreur :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de l\'erreur.' });
    }
};

// Méthode pour supprimer une erreur par son ID
exports.deleteError = async (req, res) => {
    try {
        const { id } = req.params;

        const error = await Error.findById(id);

        if (!req.user.isAdmin) {
            if (req.user.appId !== error.appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        const deletedError = await Error.findByIdAndDelete(id);


        if (!deletedError) {
            return res.status(404).json({ error: 'Erreur non trouvée.' });
        }

        res.json({ message: 'Erreur supprimée avec succès.' });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'erreur :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de l\'erreur.' });
    }
};


exports.updateError = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, source, lineno, colno, error, timestamp, visitorId, appId } = req.body;

        if (!req.user.isAdmin) {
            if (req.user.appId !== appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        const user = await User.find({ appId: appId });

        if (!user) {
            return res.status(404).json({ error: 'AppId non trouvé.' });
        }

        const updatedError = await Error.findByIdAndUpdate(id, {
            appId,
            visitorId,
            message,
            source,
            lineno,
            colno,
            error,
            timestamp
        }, { new: true });


        if (!updatedError) {
            return res.status(404).json({ error: 'Erreur non trouvée.' });
        }

        //check if visitorId exist in Visitor collection

        const visitor = await Visitor.find({ visitorId: visitorId });

        if (!visitor) {
            return res.status(404).json({ error: 'VisitorId non trouvé.' });
        }

        res.json(updatedError);
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'erreur :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour de l\'erreur.' });
    }
};

// Méthode pour récupérer toutes les erreurs d'un visiteur
exports.getAllErrorsByVisitorId = async (req, res) => {
    try {
        const { id } = req.params;

        const errors = await Error.find({ visitorId: id, appId: req.user.appId });

        if (!errors) {
            return res.status(404).json({ error: 'Erreur non trouvée.' });
        }

        res.json(errors);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'erreur :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de l\'erreur.' });
    }
}

// Méthode pour récupérer toutes les erreurs d'une application

exports.getAllErrorsByAppId = async (req, res) => {
    try {
        const { appId } = req.params;

        if (!req.user.isAdmin) {
            if (req.user.appId !== appId) {
                return res.status(403).json({ message: 'Accès interdit' });
            }
        }

        const errors = await Error.find({ appId: appId });

        if (!errors) {
            return res.status(404).json({ error: 'Erreur non trouvée.' });
        }

        res.json(errors);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'erreur :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération de l\'erreur.' });
    }
}