import { Request, Response } from "express";
import { Model } from "mongoose";

export class BaseController<ModelType>{

    model: Model<ModelType>
    constructor(model: Model<ModelType>) {
        this.model = model;
    }

    async get(req: Request, res: Response) {
        console.log("base: get all");
        try {
            if (req.query.email) {
                const objects = await this.model.find({ email: req.query.email });
                res.status(200).send(objects);
            } else {
                const objects = await this.model.find();
                res.status(200).send(objects);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        console.log("base: get by id: " + req.params.id);
        try {
            const object = await this.model.findById(req.params.id);
            console.log("id: " + req.params.id);
            console.log("object: " + object)

            res.send(object);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async post(req: Request, res: Response) {
        console.log("base: post: " + req.body);
        try {
            const obj = await this.model.create(req.body);
            res.status(201).send(obj);
        } catch (err) {
            console.log("base post error: " + err);
            res.status(406).send("base fail: " + err.message);
        }
    }

    async putById(req: Request, res: Response) {
        console.log("base: put by id: " + req.params.id);
        try {
            const obj = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(201).send(obj);
        } catch (err) {
            console.log("base put error: " + err);
            res.status(406).send("base fail: " + err.message);
        }
    }

    async deleteById(req: Request, res: Response) {
        console.log("base delete by id: " + req.params.id);
        try {
            const obj = await this.model.findByIdAndDelete(req.params.id);
            if (obj == null)
                res.status(400).send(obj);
            else
                res.status(201).send(obj);

        } catch (err) {
            console.log("base delete error: " + err);
            res.status(401).send("base fail: " + err.message);
        }
    }
}

const createController = <ModelType>(model: Model<ModelType>) => {
    return new BaseController<ModelType>(model);
}

export default createController;