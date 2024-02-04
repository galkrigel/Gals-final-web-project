"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = __importDefault(require("../controllers/user_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
/**
* @swagger
* tags:
*   name: User
*   description: The User API
*/
/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - email
*         - password
*       properties:
*         email:
*           type: string
*           description: The user email
*         password:
*           type: string
*           description: The user password
*         firstName:
*           type: string
*           description: The user first name
*         secondName:
*           type: string
*           description: The user second name
*         imgUrl:
*           type: string
*           description: The user image url
*         refreshTokens:
*           type: [string]
*           description: The user refresh tokens
*       example:
*         email: 'bob@gmail.com'
*         password: '123456'
*/
/**
* @swagger
* /user:
*   get:
*     summary: Get all users
*     tags: [User]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: An array of users
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/User'
*/
router.get("/", auth_middleware_1.default, user_controller_1.default.get.bind(user_controller_1.default));
/**
* @swagger
* /user/{id}:
*   get:
*     summary: Get a user by ID
*     tags: [User]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user ID
*     responses:
*       200:
*         description: A user object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.get("/:id", auth_middleware_1.default, user_controller_1.default.getById.bind(user_controller_1.default));
/**
* @swagger
* /user:
*   post:
*     summary: Create a new user
*     tags: [User]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: A user object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.post("/", auth_middleware_1.default, user_controller_1.default.post.bind(user_controller_1.default));
/**
* @swagger
* /user/{id}:
*   put:
*     summary: Update a user by ID
*     tags: [User]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       200:
*         description: A user object
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/
router.put("/:id", auth_middleware_1.default, user_controller_1.default.putById.bind(user_controller_1.default));
/**
* @swagger
* /user/{id}:
*   delete:
*     summary: Delete a user by ID
*     tags: [User]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The user ID
*     responses:
*       200:
*         description: User deleted successfully
*/
router.delete("/:id", auth_middleware_1.default, user_controller_1.default.deleteById.bind(user_controller_1.default));
exports.default = router;
//# sourceMappingURL=user_route.js.map