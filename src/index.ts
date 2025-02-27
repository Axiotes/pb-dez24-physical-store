import express, { Express } from "express";

const app: Express = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

export default app;
