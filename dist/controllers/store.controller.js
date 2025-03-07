"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const connection_1 = __importDefault(require("../db/connection"));
const success_log_1 = __importDefault(require("../helpers/success-log"));
const error_log_1 = __importDefault(require("../helpers/error-log"));
dotenv.config();
class StoreController {
    constructor() {
        this.closerStores = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cep = req.params.cep;
            const apiKey = process.env.API_KEY;
            try {
                if (!apiKey) {
                    throw new Error("API Key undefined");
                }
                const address = yield this.getAddress(cep);
                const location = yield this.getCoordinateLocation(address, apiKey);
                const stores = yield this.getStores();
                let closers = [];
                for (let i = 0; i < stores.length; i++) {
                    const store = stores[i];
                    const directionsRes = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${location.lat},${location.lng}&destination=${store.lat},${store.lng}&key=${apiKey}`);
                    const distance = directionsRes.data.routes[0].legs[0].distance;
                    const duration = directionsRes.data.routes[0].legs[0].duration;
                    if (distance.value <= 100000) {
                        closers.push({
                            store,
                            distance,
                            duration,
                        });
                    }
                }
                closers = closers.sort((a, b) => a.distance.value - b.distance.value);
                const response = closers.length === 0
                    ? {
                        status: "success",
                        message: "Não há nenhuma loja a 100km de você",
                    }
                    : { status: "success", data: closers };
                (0, success_log_1.default)({
                    method: req.method,
                    url: req.url,
                    params: req.params,
                    body: req.body,
                    executionTime: req.executionTime,
                });
                res.status(200).send(response);
            }
            catch (err) {
                (0, error_log_1.default)({
                    method: req.method,
                    url: req.url,
                    params: req.params,
                    body: req.body,
                    executionTime: req.executionTime,
                    error: err,
                });
                res.status(500).send({
                    status: "fail",
                    message: "Houve um erro ao procuras lojas mais próximas, tente novamente!",
                });
            }
        });
    }
    getCoordinateLocation(address, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const geocodeRes = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
            return geocodeRes.data.results[0].geometry.location;
        });
    }
    getAddress(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const viaCepRes = yield axios_1.default.get(`https://viacep.com.br/ws/${cep}/json`);
            const data = viaCepRes.data;
            return `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
        });
    }
    getStores() {
        return new Promise((resolve, reject) => {
            connection_1.default.query("SELECT * FROM stores", (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}
exports.StoreController = StoreController;
