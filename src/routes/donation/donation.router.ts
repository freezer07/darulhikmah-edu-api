import express from "express";
import { DonationController } from "../../modules/donation/controller/Donation.controller";

const donationRouter = express();
const donationController = new DonationController();

donationRouter.get("/detail", (req, res) => donationController.getDonationDetail(req, res));
donationRouter.post("/donate", (req, res) => donationController.addDonation(req, res));

export default donationRouter;
