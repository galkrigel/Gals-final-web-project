import env from "dotenv";
env.config();
import express, { Express } from "express";
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/user_route";
import fileRoute from "./routes/file_route";
import propertyRoute from "./routes/property_route";
import authRoute from "./routes/auth_route";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const initApp = (): Promise<Express> => {
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
  const specs = swaggerJsDoc(options);

  const corsOptions = {
    origin: 'http://localhost:5173',

  };
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.once("open", () => console.log("Connected to Database"));
    db.on("error", (error) => console.error(error));
    const url = process.env.DB_URL;
    mongoose.connect(url!).then(() => {
      const app = express();
      app.use(cors(corsOptions));
      // app.use(bodyParser.json());
      // app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json({ limit: '50mb' }))
      app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
      app.use("/user", userRoute);
      app.use("/file", fileRoute);
      app.use("/property", propertyRoute);
      app.use("/auth", authRoute);
      app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
      app.use("/public", express.static("public"));
      resolve(app);
    });
  });
  return promise;
};

export default initApp;
