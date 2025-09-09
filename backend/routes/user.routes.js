// user.routes.js
// Defines the API endpoints for user-related actions.

const { Router } = require('express');
const router = Router();
const {  createUser, loginUser } = require('../controllers/user.controller');

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john@example.com
 *       400:
 *         description: Invalid input
 */
// Create a new user
router.post('/create', createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
// Create a new user
router.post('/login', loginUser);

module.exports = router;
