const express = require('express');
const router = express.Router();
const errorsController = require('../controllers/errorsController');
const authenticate = require('../middleware/authMiddleware');
const authenticateJWT = require('../middleware/jwtMiddleware');

// Route pour créer une nouvelle erreur
router.post('/errors', authenticate, errorsController.createError);

// Route pour récupérer toutes les erreurs
router.get('/errors', authenticateJWT, errorsController.getAllErrors);

// Route pour récupérer une erreur par ID
router.get('/errors/:errorId', authenticateJWT, errorsController.getErrorById);

// Route pour mettre à jour une erreur
router.put('/errors/:errorId', authenticateJWT, errorsController.updateError);

// Route pour supprimer une erreur
router.delete('/errors/:errorId', authenticateJWT, errorsController.deleteError);

// Export des routes
module.exports = router;
