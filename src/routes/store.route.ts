import { Router } from "express";
import { StoreController } from "../controllers/store.controller";
import { validateCep } from "../middlewares/valida-cep.middleware";

export class StoreRoutes {
  public storeRouter: Router = Router();
  private storeController: StoreController = new StoreController();

  constructor() {
    this.storeRouter.get(
      "/closer/:cep",
      validateCep,
      this.storeController.closerStore
    );
  }
}
