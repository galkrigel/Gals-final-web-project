import express from "express";
const router = express.Router();
import authController from "../controllers/auth_controller";


/**
* @swagger
* tags:
*   name: Auth
*   description: The Authentication API
*/

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 */

router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 */

router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);

export default router;