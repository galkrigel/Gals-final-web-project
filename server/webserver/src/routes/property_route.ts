import express from "express";
const router = express.Router();
import propertyController from "../controllers/property_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/", propertyController.get.bind(propertyController));

router.get("/:id", propertyController.getById.bind(propertyController));

router.post("/", authMiddleware, propertyController.post.bind(propertyController));

router.put("/:id", authMiddleware, propertyController.putById.bind(propertyController));

router.delete("/:id", authMiddleware, propertyController.deleteById.bind(propertyController));

export default router;