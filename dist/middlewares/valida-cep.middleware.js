"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCep = void 0;
const validateCep = (req, res, next) => {
    const cep = req.params.cep;
    if (cep.length !== 8) {
        throw new Error("CEP deve ter 8 números");
    }
    if (/[a-zA-Z]/.test(cep)) {
        throw new Error("Não é permitido letras em um CEP");
    }
    next();
};
exports.validateCep = validateCep;
