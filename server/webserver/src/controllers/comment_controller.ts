import axios from 'axios';
import { Request, Response } from 'express';
import Comment, { IComment } from '../models/comment_model';
const getByPropertyId = async (req: Request, res: Response) => {
    console.log("get comment by property");
    try {
       // if (req.params.propertyId) {
            const comments = await Comment.find({ propertyId: req.params.propertyId });
            res.status(200).send(comments);
        // } else {
        //     console.log("problem1 with get the comments");
        //     res.status(500).json({ message: "propertyId is required" });
        // }
    } catch (err) {
        console.log("problem2 with get the comments");
        res.status(404).json({ message: err.message });
    }
}

// userId, propertyId, text, _id?
const post = async (req: Request, res: Response) => {
    console.log("comment: post: " + req.body);
    try {
        const obj = await Comment.create(req.body);
        res.status(201).send(obj);
    } catch (err) {
        console.log("comment post error: " + err);
        res.status(406).send("comment post fail: " + err.message);
    }
}

const get = async (req: Request, res: Response) => {
    console.log("comments: get all");
    try {
        const objects = await Comment.find();
        res.status(200).send(objects);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        console.log("comments: get all error");
    }
}


export default {
    getByPropertyId, post, get
}