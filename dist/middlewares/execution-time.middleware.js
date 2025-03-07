"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executionTimeMiddleware = void 0;
const executionTimeMiddleware = (req, res, next) => {
    req.executionTime = new Date();
    next();
};
exports.executionTimeMiddleware = executionTimeMiddleware;
