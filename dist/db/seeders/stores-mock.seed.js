"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const stores_mock_1 = require("../mocks/stores.mock");
exports.default = () => {
    connection_1.default.connect();
    stores_mock_1.STORES.forEach((store) => {
        const sql = `
        INSERT INTO stores (name, cep, street, city, number, neighborhood, state, region, latitude, longitude)
        VALUES ('${store.name}', '${store.cep}', '${store.street}', '${store.city}', ${store.number}, 
        '${store.neighborhood}', '${store.state}', '${store.region}', '${store.lat}', '${store.lng}');
    `;
        connection_1.default.query(sql, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
    connection_1.default.end();
};
