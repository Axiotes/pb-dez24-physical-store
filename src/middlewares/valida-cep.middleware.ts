import { NextFunction, Request, Response } from "express";

export const validateCep = (
  req: Request<{ cep: string }>,
  res: Response,
  next: NextFunction
): void => {
  const cep: string = req.params.cep;

  if (cep.length !== 8) {
    res.status(400).send({ message: "CEP deve ter 8 números" });
  }

  if (/[a-zA-Z]/.test(cep)) {
    res.status(400).send({ message: "Não é permitido letras em um CEP" });
  }

  next();
};
