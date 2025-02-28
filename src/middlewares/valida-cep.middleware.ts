import { NextFunction, Request, Response } from "express";

export const validateCep = (
  req: Request<{ cep: string }>,
  res: Response,
  next: NextFunction
) => {
  const cep = req.params.cep;

  if (cep.length !== 8) {
    throw new Error("CEP deve ter 8 números");
  }

  if (/[a-zA-Z]/.test(cep)) {
    throw new Error("Não é permitido letras em um CEP");
  }

  next();
};
