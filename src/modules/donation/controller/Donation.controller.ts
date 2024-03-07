import { Request, Response } from "express";
import { Common, setContentLanguage } from "../../../utilities/Common.util";
import { DonationControllerValidator } from "../validate/DonationController.validate";
import ResponseUtil from "../../../utilities/Response.util";
import { ErrorMessage } from "../../../messages/Error.message";

// core
import { DonationMapper } from "../mapper/Donation.mapper";
import { DonationService } from "../service/Donation.service";

// ModuleName
type ModuleName = string;

export class DonationController {
  constructor(
    private readonly moduleName: ModuleName = "DonationController",
    private readonly validator: DonationControllerValidator = new DonationControllerValidator(),
    private readonly mapper: DonationMapper = new DonationMapper(),
    private readonly service: DonationService = new DonationService()
  ) {}

  async getDonationDetail(req: Request, res: Response): Promise<any> {
    const prefiix = `getDonationDetail`;
    console.log(["Start", this.moduleName, prefiix].join("=> "));

    const contentLanguage = req.headers["content-language"] || "th";
    setContentLanguage(contentLanguage);
    try {
      this.validator.getDonationDetailValidate(req);

      const reqestParams = this.mapper.mapRequestGetDonationProjectDetail(req);
      const result = await this.service.getDonationDetail(reqestParams);

      const response = ResponseUtil.getResponseSuccessWithResult(result);

      res.json(response);
    } catch (error: any) {
      console.log(["Error", this.moduleName, prefiix].join("=> "));
      Common.getErrorResponse(error, res);
    }
  }

  async addDonation(req: Request, res: Response): Promise<any> {
    const prefiix = `addDonation`;
    console.log(["Start", this.moduleName, prefiix].join("=> "));

    const contentLanguage = req.headers["content-language"] || "th";
    setContentLanguage(contentLanguage);
    try {
      this.validator.addDonationValidate(req);

      const reqestParams = this.mapper.mapRequestAddDonation(req);
      await this.service.addDonation(reqestParams);

      const response = ResponseUtil.getResponseSuccess();

      res.json(response);
    } catch (error: any) {
      console.log(["Error", this.moduleName, prefiix].join("=> "));
      Common.getErrorResponse(error, res);
    }
  }
}
