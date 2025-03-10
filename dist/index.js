"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const store_route_1 = require("./routes/store.route");
const execution_time_middleware_1 = require("./middlewares/execution-time.middleware");
const app = (0, express_1.default)();
const storeRouter = new store_route_1.StoreRoutes();
app.use(execution_time_middleware_1.executionTimeMiddleware);
app.use("/api/v1/store", storeRouter.storeRouter);
exports.default = app;
