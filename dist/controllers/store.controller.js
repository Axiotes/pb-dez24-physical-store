"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
class StoreController {
    closerStore(req, res) {
        res.send(req.params.cep);
    }
}
exports.StoreController = StoreController;
