import { Request } from "express";
import { ValidateUtil } from "../../../utilities/Validate.util";
import { getDonationDetailSchema, addDonationSchema } from "../schema/Donation.schema";

export class DonationControllerValidator {
  constructor(private readonly validateUtil: ValidateUtil = new ValidateUtil()) {}

  public getDonationDetailValidate(request: Request): void {
    this.validateUtil.validateSchema(getDonationDetailSchema, request.query);
  }

  public addDonationValidate(request: Request): void {
    this.validateUtil.validateSchema(addDonationSchema, request.body);
  }
}
