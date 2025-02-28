import { Request, Response } from "express";

export class StoreController {
  public closerStore(req: Request<{ cep: string }>, res: Response) {
    res.send(req.params.cep);
  }
}
