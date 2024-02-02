import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import User, { IUser } from "../models/user_model";
import { Express } from "express";

let app: Express;
let accessToken: string;


const userForRegister: IUser = {
  email: "John@gmail.com",
  password: "1234567890",
};

const user: IUser = {
  email: "JohnDoe@gmail.com",
  password: "1234567890",
};

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await User.deleteMany();

  User.deleteMany({ 'email': userForRegister.email });
  User.deleteMany({ 'email': user.email });

  const response = await request(app).post("/auth/register").send(userForRegister);
  userForRegister._id = response.body._id;
  const response2 = await request(app).post("/auth/login").send(userForRegister);
  accessToken = response2.body.accessToken;

});

afterAll(async () => {
  await mongoose.connection.close();
});


describe("user tests", () => {

  const addUser = async (user: IUser) => {
    const response = await request(app).post("/user")
      .set("authorization", "JWT " + accessToken)
      .send(user);
    return response;
  }

  test("Test Get All users - one user in db", async () => {
    const response = await request(app).get("/user").set("authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const st = response.body[0];
    expect(st.email).toBe(userForRegister.email);
    expect(st._id).toBe(userForRegister._id);
  });

  test("Test Get All users with email - one user in db", async () => {
    const response = await request(app).get(`/user?email=${userForRegister.email}`).set("authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const st = response.body[0];
    expect(st.email).toBe(userForRegister.email);
    expect(st._id).toBe(userForRegister._id);
  });

  test("Test Post user", async () => {
    const response = await addUser(user);
    user._id = response.body._id;
    expect(response.statusCode).toBe(201);
  });

  test("Test Post duplicate user ", async () => {
    const response = await addUser(user);
    expect(response.statusCode).toBe(406);
  });

  test("Test Get All users with 2 user in DB", async () => {
    const response = await request(app).get("/user").set("authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("Test get user by id /user/:id", async () => {
    const response = await request(app)
      .get(`/user/${user._id}`).set("authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(user._id);
    expect(response.body.email).toBe(user.email);
  });

  test("Test get user by non existing id /user/:id", async () => {
    const response = await request(app)
      .get(`/user/fakeId`).set("authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(500);
  });


  test("Test PUT /user/:id", async () => {
    const updatedUser = { ...userForRegister, email: "Jane2@gmail.com" };
    const response = await request(app)
      .put(`/user/${userForRegister._id}`)
      .send(updatedUser).set("authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe(updatedUser.email);
  });


  test("Test DELETE /user/:id", async () => {
    const response = await request(app).delete(`/user/${userForRegister._id}`).set("authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(201);
  });

  test("Test DELETE unexisted user /user/:id", async () => {
    const response = await request(app).delete(`/user/${userForRegister._id}`).set("authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({});
  });
});