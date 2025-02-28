import express, { Express } from "express";
import storeRouter from "./routes/store.route";

const app: Express = express();

app.use("api/v1/store", storeRouter);

export default app;
