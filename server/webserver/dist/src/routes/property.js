"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const property_controller_1 = __importDefault(require("../controllers/property_controller"));
const auth_middleware_1 = __importDefault(require("../common/auth_middleware"));
router.get("/", property_controller_1.default.get.bind(property_controller_1.default));
router.get("/:id", property_controller_1.default.getById.bind(property_controller_1.default));
router.post("/", auth_middleware_1.default, property_controller_1.default.post.bind(property_controller_1.default));
router.put("/:id", auth_middleware_1.default, property_controller_1.default.putById.bind(property_controller_1.default));
router.delete("/:id", auth_middleware_1.default, property_controller_1.default.deleteById.bind(property_controller_1.default));
exports.default = router;
//# sourceMappingURL=property.js.map