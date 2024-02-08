import express from "express";
const router = express.Router();
import commentController from "../controllers/comment_controller";
import authMiddleware from "../common/auth_middleware";

 /**
 * @swagger
 * tags:
 *   name: Comment
 *   description: The Comment API
 */

/**
* @swagger
* components:
*   schemas:
*     Comment:
*       type: object
*       required:
*         - email
*         - text
*       properties:
*         email:
*           type: string
*           description: The user email
*         text:
*           type: string
*           description: The comment text
*         ownerId:
*           type: string
*           description: The user id 
*         _id:
*           type: string
*           description: The comment id
*       example:
*         email: 'bob@gmail.com'
*         text: 'this is a comment'
*/

/**
 * @swagger
 * /{propertyId}:
 *   get:
 *     summary: Retrieve a list of comments by property ID
 *     description: Retrieve a list of comments for the property with the specified ID. Requires authentication.
 *     parameters:
 *       - in: path
 *         name: propertyId
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID
 *     responses:
 *       200:
 *         description: A list of comments for the property
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/byId/:propertyId", authMiddleware, commentController.getByPropertyId.bind(commentController));
 
/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new comment
 *     description: Create a new comment for a property. Requires authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/", authMiddleware, commentController.post.bind(commentController));


/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of comments
 *     description: Retrieve a list of all comments. Requires authentication.
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/", authMiddleware, commentController.get.bind(commentController));


export default router;