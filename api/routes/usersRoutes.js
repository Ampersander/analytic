// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/jwtMiddleware');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);

// TODO Route pour la confirmation d'email
// router.get('/confirm/:token', userController.confirmEmail);

// TODO Route pour la connexion
router.post('/login', authController.login);

// TODO Route pour la demande de réinitialisation de mot de passe
// router.post('/forgot-password', userController.forgotPassword);

// TODO Route pour la réinitialisation de mot de passe
// router.post('/reset-password/:token', userController.resetPassword);

// route pour la validation d'un utilisateur par un administrateur
//router.put('/users/:userId/validate', authenticateJWT, userController.validateUserApp);

module.exports = router;
