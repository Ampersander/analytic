// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route pour l'inscription
router.post('/register', userController.register);

// Route pour la confirmation d'email
router.get('/confirm/:token', userController.confirmEmail);

// Route pour la connexion
router.post('/login', userController.login);

// Route pour la demande de réinitialisation de mot de passe
router.post('/forgot-password', userController.forgotPassword);

// Route pour la réinitialisation de mot de passe
router.post('/reset-password/:token', userController.resetPassword);

module.exports = router;
