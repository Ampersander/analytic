const express = require('express');
const router = express.Router();
const visitorsController = require('../controllers/visitorsController');
const errorsController = require('../controllers/errorsController');
const eventsController = require('../controllers/eventsController');
const authenticateApp = require('../middleware/authMiddleware');
const authenticateJWT = require('../middleware/jwtMiddleware');

// Route pour récupérer tous les visiteurs
router.get('/visitors', authenticateApp, visitorsController.getAllVisitors);
// Route pour récupérer un visiteur par ID
router.get('/visitors/:id', authenticateJWT, visitorsController.getVisitorById);
// Route pour créer un nouveau visiteur
router.post('/visitors', authenticateJWT, visitorsController.createVisitor);
// Route pour mettre à jour un visiteur
router.put('/visitors/:id', authenticateJWT, visitorsController.updateVisitor);
// Route pour supprimer un visiteur
router.delete('/visitors/:id', authenticateJWT, visitorsController.deleteVisitor);
//Route pour récupérer toutes les erreurs d'un visiteur
router.get('/visitors/:id/errors', authenticateJWT, errorsController.getAllErrorsByVisitorId);
//Route pour récupérer tous les événements d'un visiteur
router.get('/visitors/:id/events', authenticateJWT, eventsController.getAllEventsByVisitorId);
//Route pour récupérer tous les visiteurs d'une application
router.get('/visitors/app/:appId', authenticateJWT, visitorsController.getAllVisitorsByAppId);


module.exports = router;
