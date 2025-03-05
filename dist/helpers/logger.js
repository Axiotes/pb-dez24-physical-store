"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.File({
            filename: `${__dirname}/../../logs/success.log`,
            level: "info",
            format: winston_1.default.format.combine(winston_1.default.format((info) => info.level === "error" || info.level === "warn" ? false : info)()),
        }),
        new winston_1.default.transports.File({
            filename: `${__dirname}/../../logs/error.log`,
            level: "error",
        }),
    ],
});
exports.default = logger;
