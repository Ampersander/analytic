// userController.js

const User = require('../models/userModel');
const mailController = require('./mailController');
const { v4: uuidv4 } = require('uuid');

// Méthode pour valider un utilisateur par un administrateur
exports.validateWebmaster = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    // Rechercher l'utilisateur dans la base de données
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si l'utilisateur est déjà confirmé
    if (user.confirmed) {
      return res.status(409).json({ message: 'L\'utilisateur est déjà confirmé' });
    }

    // Valider l'utilisateur
    user.confirmed = true;

    // Générer l'appsecret et appid pour le webmaster
    user.appSecret = uuidv4();
    user.appId = uuidv4();

    // Envoyer un e-mail de confirmation et d'informations à l'utilisateur
    // mailController.sendConfirmationAndAppInfoEmail(user.email, user.appId, user.appSecret);

    // Enregistrer les modifications de l'utilisateur dans la base de données
    await user.save();

    res.status(200).json({ message: 'Utilisateur validé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la validation de l\'utilisateur :', error);
    res.status(500).json({ message: 'Erreur lors de la validation de l\'utilisateur' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des utilisateurs.' });
  }
}
