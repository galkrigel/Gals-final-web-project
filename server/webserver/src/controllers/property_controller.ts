import { BaseController } from "./base_controller";
import { Response, Request } from "express";
import { AuthResquest } from "../common/auth_middleware";
import Property, { IProperty } from "../models/property_model";

class PropertyController extends BaseController<IProperty>{
    constructor() {
        super(Property)
    }

    async post(req: AuthResquest, res: Response) {
        console.log("post property:" + req.body);
        const _id = req.user._id;
        req.body.ownerID = _id;
        req.body.comments = 0;
        super.post(req, res);
    }

    // async addComment(req: Request, res: Response) {
    //     console.log("property: add comment to property: ");
    //     try {
    //         const obj = await Property.findOneAndUpdate({_id: req.params.propertyId}, {$inc: {comments: 1}}, {new: true});
    //         res.status(201).send(obj);
    //     } catch (err) {
    //         console.log("base put error: " + err);
    //         res.status(406).send("base fail: " + err.message);
    //     }
    // }
}

export default new PropertyController();