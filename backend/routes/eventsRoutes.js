const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const authenticate = require('../middleware/authMiddleware');
const authenticateJWT = require('../middleware/jwtMiddleware');

// Route pour créer un nouvel événement
router.post('/events', authenticate, eventsController.createEvent);

// Route pour récupérer tous les événements
router.get('/events', authenticateJWT, eventsController.getAllEvents);

// Route pour récupérer un événement par ID
router.get('/events/:eventId', authenticateJWT, eventsController.getEventById);

// Route pour mettre à jour un événement
router.put('/events/:eventId', authenticateJWT, eventsController.updateEvent);

// Route pour supprimer un événement
router.delete('/events/:eventId', authenticateJWT, eventsController.deleteEvent);

// Export des routes
module.exports = router;
