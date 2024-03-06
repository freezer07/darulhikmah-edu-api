// src/index.ts
// minimal Express API

import express from "express";
import cors from "cors";

// custom router
import appRouter from "./routes/app.router";
import helloRouter from "./routes/hello.router";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", helloRouter);
app.use("/api", appRouter);

export default app;
