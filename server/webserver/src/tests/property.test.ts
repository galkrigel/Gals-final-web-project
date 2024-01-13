import { Express } from "express";
import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import User, { IUser } from "../models/user_model";
import Property, { IProperty } from "../models/property_model";

let app: Express;

const user: IUser = {
    email: "test@student.property.test",
    password: "1234567890",
  }
let accessToken = "";

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await Property.deleteMany();

  await User.deleteMany({ 'email': user.email });
  const response = await request(app).post("/auth/register").send(user);
  user._id = response.body._id;
  const response2 = await request(app).post("/auth/login").send(user);
  accessToken = response2.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
});

const property: IProperty = 
{
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
  const addProperty = async (property: IProperty) => {
    const response = await request(app)
      .post("/property")
      .set("Authorization", "JWT " + accessToken)
      .send(property);
    expect(response.statusCode).toBe(201);
    expect(response.body.ownerID).toBe(user._id);
    expect(response.body.title).toBe(property.title);
    expect(response.body.price).toBe(property.price);
  };

  test("Test Get All proeprties - empty response", async () => {
    const response = await request(app).get("/property");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Post property", async () => {
    addProperty(property);
  });

  test("Test Get All properties with one property in DB", async () => {
    const response = await request(app).get("/property");
    expect(response.statusCode).toBe(200);
    const rc = response.body[0];
    expect(rc.title).toBe(property.title);
    expect(rc.price).toBe(property.price);
    expect(rc.ownerID).toBe(user._id);
  });

});