import express from "express";
import donationRouter from "./donation/donation.router";

const appRouter = express();
appRouter.use("/donation", donationRouter);

export default appRouter;
