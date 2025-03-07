import express, { Express } from "express";
import { StoreRoutes } from "./routes/store.route";
import { executionTimeMiddleware } from "./middlewares/execution-time.middleware";

const app: Express = express();

const storeRouter = new StoreRoutes();

app.use(executionTimeMiddleware);
app.use("/api/v1/store", storeRouter.storeRouter);

export default app;
