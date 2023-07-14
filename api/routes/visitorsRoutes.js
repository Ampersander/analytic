const express = require('express');
const router = express.Router();
const visitorsController = require('../controllers/visitorsController');
const authenticateApp = require('../middleware/authMiddleware');
const authenticateJWT = require('../middleware/jwtMiddleware');

router.get('/visitors', authenticateApp, visitorsController.getAllVisitors);
router.get('/visitors/:id', authenticateJWT, visitorsController.getVisitorById);
router.post('/visitors', authenticateJWT, visitorsController.createVisitor);
router.put('/visitors/:id', authenticateJWT, visitorsController.updateVisitor);
router.delete('/visitors/:id', authenticateJWT, visitorsController.deleteVisitor);

module.exports = router;
