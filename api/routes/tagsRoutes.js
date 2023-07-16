const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tagsController');
// const authenticate = require('../middleware/authMiddleware');
// const authenticateJWT = require('../middleware/jwtMiddleware');

router.get('/', tagsController.getAllTags);
router.post('/', tagsController.createTag);
router.put('/:id', tagsController.updateTag);

module.exports = router;
