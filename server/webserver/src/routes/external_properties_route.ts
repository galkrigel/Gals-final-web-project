import express from "express";
const router = express.Router();
import propertiesController from "../controllers/external_properties_controller";

router.get("/properties", propertiesController.get);

export default router;