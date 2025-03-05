"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const successLog = (infoLog) => {
    logger_1.default.info(Object.assign(Object.assign({}, infoLog), { executionTime: `${new Date().getTime() - infoLog.executionTime.getTime()}ms` }));
};
exports.default = successLog;
