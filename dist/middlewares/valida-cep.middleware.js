"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCep = void 0;
const validateCep = (req, res, next) => {
    const cep = req.params.cep;
    if (cep.length !== 8) {
        res.status(400).send({ message: "CEP deve ter 8 números" });
        return;
    }
    if (/[a-zA-Z]/.test(cep)) {
        res.status(400).send({ message: "Não é permitido letras em um CEP" });
        return;
    }
    next();
};
exports.validateCep = validateCep;
