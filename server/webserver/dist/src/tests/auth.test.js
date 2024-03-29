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
const user = {
    email: "testAuth@test.com",
    password: "1234567890",
};
const secUser = {
    email: "testLogout@test.com",
    password: "1234567890",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, app_1.default)();
    console.log("beforeAll");
    yield user_model_1.default.deleteMany({ 'email': user.email });
    yield user_model_1.default.deleteMany({ 'email': secUser.email });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
let accessToken;
let refreshToken;
let newRefreshToken;
describe("Auth tests", () => {
    test("Test Register", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/auth/register").send(user);
        expect(response.statusCode).toBe(201);
    }));
    test("Test Register exist email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/auth/register").send(user);
        expect(response.statusCode).toBe(406);
    }));
    test("Test Register missing password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/register").send({
            email: "test@test.com"
        });
        expect(response.statusCode).toBe(400);
    }));
    test("Test Register missing email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/register").send({
            password: "12345"
        });
        expect(response.statusCode).toBe(400);
    }));
    test("Test Login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send(user);
        expect(response.statusCode).toBe(200);
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
        expect(accessToken).toBeDefined();
    }));
    test("Test Login with missing password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send({ email: "testAuth@test.com" });
        expect(response.statusCode).toBe(400);
    }));
    test("Test Login with missing email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send({ password: "12345" });
        expect(response.statusCode).toBe(400);
    }));
    test("Test Login with null user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send(null);
        expect(response.statusCode).toBe(400);
    }));
    test("Test Login with wrong email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send(Object.assign(Object.assign({}, user), { email: "fakeEmail" }));
        expect(response.statusCode).toBe(400);
    }));
    test("Test Login with wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .post("/auth/login").send(Object.assign(Object.assign({}, user), { password: "1234" }));
        expect(response.statusCode).toBe(401);
    }));
    test("Test forbidden access without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/user");
        expect(response.statusCode).toBe(401);
    }));
    test("Test access with valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/user")
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
    }));
    test("Test access with invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/user")
            .set("Authorization", "JWT 1" + accessToken);
        expect(response.statusCode).toBe(401);
    }));
    jest.setTimeout(10000);
    test("Test access after timeout of token", () => __awaiter(void 0, void 0, void 0, function* () {
        yield new Promise(resolve => setTimeout(() => resolve("done"), 5000));
        const response = yield (0, supertest_1.default)(app)
            .get("/user")
            .set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).not.toBe(200);
    }));
    test("Test refresh without a token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/auth/refresh");
        expect(response.statusCode).toBe(401);
    }));
    test("Test refresh with an unvalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/auth/refresh")
            .set("Authorization", "JWT " + "unvalidToken")
            .send();
        expect(response.statusCode).toBe(401);
    }));
    test("Test refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/auth/refresh")
            .set("Authorization", "JWT " + refreshToken)
            .send();
        expect(response.statusCode).toBe(200);
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
        const newAccessToken = response.body.accessToken;
        newRefreshToken = response.body.refreshToken;
        const response2 = yield (0, supertest_1.default)(app)
            .get("/user")
            .set("Authorization", "JWT " + newAccessToken);
        expect(response2.statusCode).toBe(200);
    }));
    test("Test double use of refresh token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app)
            .get("/auth/refresh")
            .set("Authorization", "JWT " + refreshToken)
            .send();
        expect(response.statusCode).not.toBe(200);
        //verify that the new token is not valid as well
        const response1 = yield (0, supertest_1.default)(app)
            .get("/auth/refresh")
            .set("Authorization", "JWT " + newRefreshToken)
            .send();
        expect(response1.statusCode).not.toBe(200);
    }));
    test("Test logout without token", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/auth/logout");
        expect(response.statusCode).toBe(401);
    }));
    test("Test logout when verify failed", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get("/auth/logout")
            .set("Authorization", "JWT " + "fakeToken");
        expect(response.statusCode).toBe(401);
    }));
    test("Test logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const res1 = yield (0, supertest_1.default)(app).post("/auth/register").send(secUser);
        expect(res1.statusCode).toBe(201);
        const res2 = yield (0, supertest_1.default)(app)
            .post("/auth/login").send(secUser);
        expect(res2.statusCode).toBe(200);
        refreshToken = res2.body.refreshToken;
        const res3 = yield (0, supertest_1.default)(app).get("/auth/logout")
            .set("Authorization", "JWT " + refreshToken);
        expect(res3.statusCode).toBe(200);
    }));
    test("Test login with google without email", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post("/auth/google").send({ email: '' });
        expect(response.statusCode).toBe(400);
    }));
});
//# sourceMappingURL=auth.test.js.map