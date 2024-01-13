"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const propertySchema = new mongoose_1.default.Schema({
    ownerID: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    coverPhoto: {
        type: { url: String }
    },
    phoneNumber: {
        type: { mobile: String, phone: String, whatsapp: String }
    },
    price: {
        type: String,
        required: true,
    },
    rooms: {
        type: String,
    },
    baths: {
        type: String,
    },
    area: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Properties", propertySchema);
//# sourceMappingURL=property_model.js.map