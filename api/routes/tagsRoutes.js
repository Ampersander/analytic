const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tagsController');
// const authenticate = require('../middleware/authMiddleware');
// const authenticateJWT = require('../middleware/jwtMiddleware');

router.post('/tags', tagsController.createTag);

module.exports = router;
