// userController.js

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const uuid = require('uuid');
const mailer = require('../utils/mailer');

// Méthode pour s'inscrire
exports.register = async (req, res) => {
  const { name, email, password, corsApp } = req.body;
  const appId = uuid.v4();

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'L\'utilisateur existe déjà' });
    }

    // Créer un nouvel utilisateur
    const user = new User({ name, email, password, confirmed: false, corsApp, appId });

    await user.save();

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id }, 'secret');

    // Envoyer un e-mail de confirmation
    await sendConfirmationEmail(email, token);

    res.status(200).json({ message: 'Inscription réussie. Vérifiez votre boîte de réception pour la confirmation.' });
  } catch (error) {
    console.log('Erreur lors de l\'inscription :', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
};

// Méthode pour confirmer l'adresse e-mail
exports.confirmEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, 'secret');

    // Marquer l'utilisateur comme confirmé
    const user = await User.findById(decoded.userId);
    user.confirmed = true;
    await user.save();

    res.status(200).json({ message: 'Adresse e-mail confirmée avec succès' });
  } catch (error) {
    console.log('Erreur lors de la confirmation d\'e-mail :', error);
    res.status(400).json({ message: 'Token invalide ou expiré' });
  }
};

// Méthode pour se connecter
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier les informations de connexion
    const user = await User.findOne({ email });
    if (!user || !user.confirmed) {
      return res.status(401).json({ message: 'Identifiants de connexion invalides' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Identifiants de connexion invalides' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id }, 'secret');

    res.status(200).json({ token });
  } catch (error) {
    console.log('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

// Méthode pour demander une réinitialisation de mot de passe
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user || !user.confirmed) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    // Générer un token de réinitialisation de mot de passe
    const resetToken = jwt.sign({ userId: user._id }, 'reset-secret', { expiresIn: '1h' });

    // Envoyer un e-mail avec le lien de réinitialisation de mot de passe
    mailController.sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: 'Un e-mail de réinitialisation de mot de passe a été envoyé' });
  } catch (error) {
    console.log('Erreur lors de la demande de réinitialisation de mot de passe :', error);
    res.status(500).json({ message: 'Erreur lors de la demande de réinitialisation de mot de passe' });
  }
};

// Méthode pour réinitialiser le mot de passe
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Vérifier le token de réinitialisation de mot de passe
    const decoded = jwt.verify(token, 'reset-secret');

    // Trouver l'utilisateur correspondant
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    // Mettre à jour le mot de passe de l'utilisateur
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    console.log('Erreur lors de la réinitialisation du mot de passe :', error);
    res.status(400).json({ message: 'Token invalide ou expiré' });
  }
};

const sendConfirmationEmail = async (email, token) => {
  const mailOptions = {
    from: 'webanalytics@platform.com',
    to: email,
    subject: 'Confirmation d\'inscription',
    text: `Cliquez sur le lien suivant pour confirmer votre inscription : http://localhost:3000/confirm/${token}`,
  };

  await mailer.sendEmail(mailOptions)
};