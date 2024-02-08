"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const comment_route_1 = __importDefault(require("./routes/comment_route"));
const file_route_1 = __importDefault(require("./routes/file_route"));
const property_route_1 = __importDefault(require("./routes/property_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const external_properties_route_1 = __importDefault(require("./routes/external_properties_route"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const initApp = () => {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Web Dev 2022 REST API",
                version: "1.0.0",
                description: "REST server including authentication using JWT",
            },
            servers: [{ url: "http://localhost:3001", },],
        },
        apis: ["./src/routes/*.ts"],
    };
    const specs = (0, swagger_jsdoc_1.default)(options);
    const corsOptions = {
        origin: 'http://localhost:5173',
    };
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.once("open", () => console.log("Connected to Database"));
        db.on("error", (error) => console.error(error));
        const url = process.env.DB_URL;
        mongoose_1.default.connect(url).then(() => {
            const app = (0, express_1.default)();
            app.use((0, cors_1.default)(corsOptions));
            // app.use(bodyParser.json());
            // app.use(bodyParser.urlencoded({ extended: true }));
            app.use(body_parser_1.default.json({ limit: '50mb' }));
            app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
            app.use("/user", user_route_1.default);
            app.use("/file", file_route_1.default);
            app.use("/property", property_route_1.default);
            app.use("/auth", auth_route_1.default);
            app.use("/comment", comment_route_1.default);
            app.use("/external", external_properties_route_1.default);
            app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
            app.use("/public", express_1.default.static("public"));
            resolve(app);
        });
    });
    return promise;
};
exports.default = initApp;
//# sourceMappingURL=app.js.map