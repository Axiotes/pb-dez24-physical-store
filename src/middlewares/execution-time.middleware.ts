import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../interfaces/extended-request.interface";

export const executionTimeMiddleware = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  req.executionTime = new Date();
  next();
};
