"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
exports.default = () => {
    connection_1.default.connect();
    const sql = `
        CREATE TABLE IF NOT EXISTS stores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            cep VARCHAR(8) NOT NULL,
            street VARCHAR(255) NOT NULL,
            city VARCHAR(60) NOT NULL,
            number INT NOT NULL,
            neighborhood VARCHAR(60) NOT NULL,
            state VARCHAR(20) NOT NULL,
            region VARCHAR(21) NOT NULL,
            latitude VARCHAR(255) NOT NULL,
            logitude VARCHAR(255) NOT NULL
        );
    `;
    connection_1.default.query(sql, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Tabela 'stores' criada com sucesso ou já existente");
        connection_1.default.end();
    });
};
