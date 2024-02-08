import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import Comment, { IComment } from "../models/comment_model";
import User, { IUser } from "../models/user_model";
import Property, { IProperty } from "../models/property_model";
import { Express } from "express";

let app: Express;
let accessToken: string;

const userForComment: IUser = {
    email: "commenter@gmail.com",
    password: "1234567890",
};

const propertyForComment: IProperty =
{
    ownerID: userForComment._id,
    purpose: "for-rent",
    price: 6000,
    title: "This is a house for rent",
    rooms: 5,
    baths: 2,
    country: "Israel",
    city: "ashdod",
    address: "shoam 2",
    area: 145,
};

const commentForTest: IComment = {
    userId: '',
    propertyId: '',
    text: "This is a comment",
};

beforeAll(async () => {
    app = await initApp();
    console.log("beforeAll");
    await Comment.deleteMany();
    User.deleteMany({ 'email': userForComment.email });
    Property.deleteMany({ 'ownerId': userForComment._id });

    const response = await request(app).post("/auth/register").send(userForComment);
    userForComment._id = response.body._id;
    propertyForComment.ownerID = userForComment._id;
    commentForTest.userId = userForComment._id;

    const response2 = await request(app).post("/auth/login").send(userForComment);
    accessToken = response2.body.accessToken;

    const response3 = await request(app).post("/property").set("Authorization", "JWT " + accessToken).send(propertyForComment);
    propertyForComment._id = response3.body._id;
    commentForTest.propertyId = propertyForComment._id;
});

afterAll(async () => {
    await mongoose.connection.close();
});


describe("comment tests", () => {

    const addComment = async (comment: IComment) => {
        const response = await request(app).post("/comment")
            .set("authorization", "JWT " + accessToken)
            .send(comment);
        return response;
    }

    test("Test Get All comments - zero comments in db", async () => {
        const response = await request(app).get("/comment").set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("Test Post comment", async () => {
        const response = await addComment(commentForTest);
        expect(response.statusCode).toBe(201);
    });

    test("Test Post duplicate comment ", async () => {
        const response = await addComment(commentForTest);
        expect(response.statusCode).toBe(201);
    });

    test("Test Post comment without an userId ", async () => {
        const response = await addComment({ userId: '', propertyId: propertyForComment._id, text: "This is a comment" });
        expect(response.statusCode).toBe(406);
    });

    test("Test Get All comments with 2 comments in DB", async () => {
        const response = await request(app).get("/comment").set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    });

    test("Test get comment by property id /comment/byId/:propertyId", async () => {
        const response = await request(app)
            .get(`/comment/byId/${propertyForComment._id}`).set("authorization", "JWT " + accessToken);
            console.log("testtttttttt " +response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].userId).toBe(userForComment._id);
        expect(response.body[0].propertyId).toBe(propertyForComment._id);
        expect(response.body[0].text).toBe(commentForTest.text);
    });

    test("Test get comment witout /comment/byId/:propertyId", async () => {
        const response = await request(app)
            .get(`/comment/byId`).set("authorization", "JWT " + accessToken);
        expect(response.statusCode).toBe(404);
    });

});




/*

import { Express } from "express";
import mongoose from "mongoose";

let app: Express;
import initApp from "../app";
import request from "supertest";

let server;

beforeAll(async () => {
    app = await initApp();
  });

afterAll(async () => {
    await mongoose.connection.close();
});

describe("external property tests", () => {

    test("Test Get All external proeprties", async () => {
        const response = await request(app).get("/external/properties");
        expect(response.statusCode).toBe(200);
      });

} );


*/