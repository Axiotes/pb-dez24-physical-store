"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const errorLog = (infoLog) => {
    var _a, _b;
    logger_1.default.error(Object.assign(Object.assign({}, infoLog), { executionTime: `${new Date().getTime() - infoLog.executionTime.getTime()}ms`, error: {
            message: (_a = infoLog.error) === null || _a === void 0 ? void 0 : _a.message,
            stack: (_b = infoLog.error) === null || _b === void 0 ? void 0 : _b.stack,
        } }));
};
exports.default = errorLog;
