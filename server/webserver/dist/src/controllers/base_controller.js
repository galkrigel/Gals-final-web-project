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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    constructor(model) {
        this.model = model;
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("base: get all");
            try {
                if (req.query.email) {
                    const objects = yield this.model.find({ email: req.query.email });
                    res.status(200).send(objects);
                }
                else {
                    const objects = yield this.model.find();
                    res.status(200).send(objects);
                }
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("base: get by id: " + req.params.id);
            try {
                const object = yield this.model.findById(req.params.id);
                console.log("id: " + req.params.id);
                console.log("object: " + object);
                res.send(object);
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("base: post: " + req.body);
            try {
                const obj = yield this.model.create(req.body);
                res.status(201).send(obj);
            }
            catch (err) {
                console.log("base post error: " + err);
                res.status(406).send("base fail: " + err.message);
            }
        });
    }
    putById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("base: put by id: " + req.params.id);
            try {
                const obj = yield this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.status(201).send(obj);
            }
            catch (err) {
                console.log("base put error: " + err);
                res.status(406).send("base fail: " + err.message);
            }
            //res.send("put student by id: " + req.params.id);
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("base delete by id: " + req.params.id);
            try {
                const obj = yield this.model.findByIdAndDelete(req.params.id);
                if (obj == null)
                    res.status(400).send(obj);
                else
                    res.status(201).send(obj);
            }
            catch (err) {
                console.log("base delete error: " + err);
                res.status(401).send("base fail: " + err.message);
            }
        });
    }
}
exports.BaseController = BaseController;
const createController = (model) => {
    return new BaseController(model);
};
exports.default = createController;
//# sourceMappingURL=base_controller.js.map