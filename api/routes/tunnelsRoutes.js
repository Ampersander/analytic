/**
 * @swagger
 * components:
 *   schemas:
 *     Tunnel:
 *       type: object
 *       required: [comment, tags]
 *       properties:
 *         _id: { type: string, description: The auto-generated id of the tunnel }
 *         comment: { type: string, description: The comment of the tunnel }
 *         tags: { type: array, description: The tags of the tunnel }
 *       example: { _id: ObjectID('...'), comment: 'Comment', tags: ['tag1', 'tag2'] }
 * tags:
 *   name: Tunnels
 *   description: The tunnels managing API
 * /tunnels:
 *   get:
 *     summary: Lists all the tunnels
 *     tags: [Tunnels]
 *     responses:
 *       200:
 *         description: The list of the tunnels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tunnel'
 *   post:
 *     summary: Create a new tunnel
 *     tags: [Tunnels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tunnel'
 *             example: { comment: 'Comment', tags: ['tag1', 'tag2'] }
 *     responses:
 *       200:
 *         description: The created tunnel.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tunnel'
 *       400:
 *        description: Some parameters may be missing or invalid
 *       500:
 *         description: Some server error happened
 * /tunnels/{_id}:
 *   get:
 *     summary: Get the tunnel by id
 *     tags: [Tunnels]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tunnel id
 *     responses:
 *       200:
 *         description: The tunnel response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tunnel'
 *       404:
 *         description: The tunnel was not found
 *   put:
 *    summary: Update the tunnel by the id
 *    tags: [Tunnels]
 *    parameters:
 *      - in: path
 *        name: _id
 *        schema:
 *          type: string
 *        required: true
 *        description: The tunnel id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Tunnel'
 *            example: { comment: 'Comment', tags: ['tag1', 'tag2'] }
 *    responses:
 *      200:
 *        description: The tunnel was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Tunnel'
 *      404:
 *        description: The tunnel was not found
 *      500:
 *        description: Some server error happened
 *   delete:
 *     summary: Remove the tunnel by id
 *     tags: [Tunnels]
 *     parameters:
 *       - in: path
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tunnel id
 *
 *     responses:
 *       200:
 *         description: The tunnel was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tunnel'
 *       404:
 *         description: The tunnel was not found
 */

const express = require('express');
const router = express.Router();
const tunnelsController = require('../controllers/tunnelsController');
// const authenticate = require('../middleware/authMiddleware');
// const authenticateJWT = require('../middleware/jwtMiddleware');

router.get('/', tunnelsController.getAll);
router.get('/:id', tunnelsController.getById);
router.post('/', tunnelsController.create);
router.put('/:id', tunnelsController.update);
router.delete('/:id', tunnelsController.delete);

module.exports = router;