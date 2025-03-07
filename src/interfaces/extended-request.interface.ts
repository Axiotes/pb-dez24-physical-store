import { Request } from "express";

export interface ExtendedRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  executionTime?: Date;
}
