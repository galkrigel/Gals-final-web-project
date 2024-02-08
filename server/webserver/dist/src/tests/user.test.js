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
let app;
let accessToken;
const userForRegister = {
    email: "John@gmail.com",
    password: "1234567890",
};
const user = {
    email: "JohnDoe@gmail.com",
    password: "1234567890",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield user_model_1.default.deleteMany();
    user_model_1.default.deleteMany({ 'email': userForRegister.email });
    user_model_1.default.deleteMany({ 'email': user.email });
    const response = yield (0, supertest_1.default)(app).post("/auth/register").send(userForRegister);
    userForRegister._id = response.body._id;
    const response2 = yield (0, supertest_1.default)(app).post("/auth/login").send(userForRegister);
    accessToken = response2.body.accessToken;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
describe("user tests", () => {
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/user")
            .set("authorization", "JWT " + accessToken)
            .send(user);
        return response;
    });
    test("Test Get All users - one user in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/user").set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const st = response.body[0];
        expect(st.email).toBe(userForRegister.email);
        expect(st._id).toBe(userForRegister._id);
    }));
    test("Test Get All users with email - one user in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get(`/user?email=${userForRegister.email}`).set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        const st = response.body[0];
        expect(st.email).toBe(userForRegister.email);
        expect(st._id).toBe(userForRegister._id);
    }));
    test("Test Post user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield addUser(user);
        user._id = response.body._id;
        expect(response.statusCode).toBe(201);
    }));
    test("Test Post duplicate user ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield addUser(user);
        expect(response.statusCode).toBe(406);
    }));
    test("Test Get All users with 2 user in DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/user").set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    }));
    test("Test get user by id /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get(`/user/${user._id}`).set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(user._id);
        expect(response.body.email).toBe(user.email);
    }));
    test("Test get user by non existing id /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get(`/user/fakeId`).set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(500);
    }));
    test("Test PUT /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = Object.assign(Object.assign({}, userForRegister), { email: "Jane2@gmail.com" });
        const response = yield (0, supertest_1.default)(app)
            .put(`/user/${userForRegister._id}`)
            .send(updatedUser).set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(201);
        expect(response.body.email).toBe(updatedUser.email);
    }));
    test("Test DELETE /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/user/${userForRegister._id}`).set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(201);
    }));
    test("Test DELETE unexisted user /user/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).delete(`/user/${userForRegister._id}`).set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(400);
        expect(response.body).toStrictEqual({});
    }));
});
//# sourceMappingURL=user.test.js.map