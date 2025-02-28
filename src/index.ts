import express, { Express } from "express";
import { StoreRoutes } from "./routes/store.route";

const app: Express = express();

const storeRouter = new StoreRoutes();

app.use("/api/v1/store", storeRouter.storeRouter);

export default app;
