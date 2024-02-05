"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const property_controller_1 = __importDefault(require("../controllers/property_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
/**
* @swagger
* tags:
*   name: Property
*   description: The Property API
*/
/**
* @swagger
* components:
*   schemas:
*     Property:
*       type: object
*       required:
*         - ownerId
*         - price
*         - title
*       properties:
*         _id:
*           type: string
*           description: The auto-generated id of the property
*         ownerId:
*           type: string
*           description: The id of the owner
*         price:
*           type: number
*           description: The price of the property
*         title:
*           type: string
*           description: The title of the property
*         country:
*           type: string
*           description: The country of the property
*         city:
*           type: string
*           description: The city of the property
*         address:
*           type: string
*           description: The address of the property
*         rooms:
*           type: number
*           description: The number of rooms of the property
*         baths:
*           type: number
*           description: The number of baths of the property
*         area:
*           type: number
*           description: The area of the property
*       example:
*         _id: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
*         ownerId: 'd290f1ee-6c54-4b01-90e6-d701748f0851'
*         title: 'Beautiful house in the city'
*         price: 500000
*         rooms: 4
*         baths: 2
*         area: 150
*         country: 'Israel'
*         city: 'Ashdod'
*         address: 'Shoam 5'
*/
/**
* @swagger
* /property:
*   get:
*     summary: Get all properties
*     tags: [Property]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: An array of properties
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Property'
*/
router.get("/", property_controller_1.default.get.bind(property_controller_1.default));
/**
 * @swagger
 * /property/{id}:
 *   get:
 *     summary: Get a property by ID
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The property ID
 *     responses:
 *       200:
 *         description: A property object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 */
router.get("/:id", property_controller_1.default.getById.bind(property_controller_1.default));
/**
 * @swagger
 * /property:
 *   post:
 *     summary: Create a new property
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: A property object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 */
router.post("/", auth_middleware_1.default, property_controller_1.default.post.bind(property_controller_1.default));
// router.put("/addComment/:propertyId", authMiddleware, propertyController.addComment.bind(propertyController));
/**
 * @swagger
 * /property/{id}:
 *   put:
 *     summary: Update a property by ID
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The property ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: A property object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 */
router.put("/:id", auth_middleware_1.default, property_controller_1.default.putById.bind(property_controller_1.default));
/**
 * @swagger
 * /property/{id}:
 *   delete:
 *     summary: Delete a property by ID
 *     tags: [Property]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The property ID
 *     responses:
 *       200:
 *         description: Property deleted successfully
 */
router.delete("/:id", auth_middleware_1.default, property_controller_1.default.deleteById.bind(property_controller_1.default));
exports.default = router;
//# sourceMappingURL=property_route.js.map