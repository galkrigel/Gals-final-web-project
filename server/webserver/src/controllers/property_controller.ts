import { BaseController } from "./base_controller";
import { Response } from "express";
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
        super.post(req, res);
    }
}

export default new PropertyController();