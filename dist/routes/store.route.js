"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRoutes = void 0;
const express_1 = require("express");
const store_controller_1 = require("../controllers/store.controller");
const valida_cep_middleware_1 = require("../middlewares/valida-cep.middleware");
class StoreRoutes {
    constructor() {
        this.storeRouter = (0, express_1.Router)();
        this.storeController = new store_controller_1.StoreController();
        this.storeRouter.get("/closer/:cep", valida_cep_middleware_1.validateCep, this.storeController.closerStores);
    }
}
exports.StoreRoutes = StoreRoutes;
