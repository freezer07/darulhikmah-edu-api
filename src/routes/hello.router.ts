import express, { Request, Response } from "express";
import moment from "moment";

const helloRouter = express();

helloRouter.get("/hello", (req: Request, res: Response) => {
  res.json({
    timeStamp: +moment().format("X"),
    appName: process.env.APP_NAME,
    statusMessage: "ready",
  });
});

export default helloRouter;
