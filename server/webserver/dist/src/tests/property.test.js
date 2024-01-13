"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user_model"));
const property_model_1 = __importDefault(require("../models/property_model"));
let app;
const user = {
    email: "test@student.property.test",
    password: "1234567890",
};
let accessToken = "";
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield property_model_1.default.deleteMany();
    yield user_model_1.default.deleteMany({ 'email': user.email });
    const response = yield (0, supertest_1.default)(app).post("/auth/register").send(user);
    user._id = response.body._id;
    const response2 = yield (0, supertest_1.default)(app).post("/auth/login").send(user);
    accessToken = response2.body.accessToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
const property = {
    ownerID: "test@student.property.test",
    purpose: "for-rent",
    price: "7700",
    title: "Big offer !!! . . Amazing and cosy 1 Bedroom big apartment with Wi-Fi in the heart of Jumeirah Village Circle, Dubai.",
    rooms: "1",
    baths: "2",
    country: "israel",
    city: "ashdod",
    address: "zahal",
    area: "91.69530048",
};
describe("property post tests", () => {
    const addProperty = (property) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/property")
            .set("Authorization", "JWT " + accessToken)
            .send(property);
        expect(response.statusCode).toBe(201);
        expect(response.body.ownerID).toBe(user._id);
        expect(response.body.title).toBe(property.title);
        expect(response.body.price).toBe(property.price);
    });
    test("Test Get All proeprties - empty response", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/property");
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([]);
    }));
    test("Test Post property", () => __awaiter(void 0, void 0, void 0, function* () {
        addProperty(property);
    }));
    test("Test Get All properties with one property in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/property");
        expect(response.statusCode).toBe(200);
        const rc = response.body[0];
        expect(rc.title).toBe(property.title);
        expect(rc.price).toBe(property.price);
        expect(rc.ownerID).toBe(user._id);
    }));
});
//# sourceMappingURL=property.test.js.map