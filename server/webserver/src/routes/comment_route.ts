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


     security:

router.get("/:propertyId", authMiddleware, commentController.getByPropertyId.bind(commentController));
 
router.post("/", authMiddleware, commentController.post.bind(commentController));

router.get("/", authMiddleware, commentController.get.bind(commentController));


export default router;