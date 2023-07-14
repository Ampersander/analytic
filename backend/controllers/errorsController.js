const Error = require('../models/errorModel');

// Méthode pour enregistrer une nouvelle erreur
exports.createError = async (req, res) => {
    try {
        const { message, source, lineno, colno, error, timestamp } = req.body;

        const newError = new Error({
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
    try{
        const { id } = req.params;
        const { message, source, lineno, colno, error, timestamp } = req.body;

        const updatedError = await Error.findByIdAndUpdate(id, {
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

        res.json(updatedError);
    }catch(error){
        console.error("Erreur lors de la mise à jour de l'erreur :", error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour de l\'erreur.' });
    }
};