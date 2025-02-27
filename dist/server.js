"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const connection_1 = __importDefault(require("./db/connection"));
connection_1.default.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    _1.default.listen(3000);
});
