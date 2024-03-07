import { ErrorMessage } from "../../../messages/Error.message";

import { DonationRepository } from "../repositories/Donation.repository";
import { RequestGetDonationDetail, RequestAddDonation } from "../interface/Donation.interface";
import { DonationMapper } from "../mapper/Donation.mapper";
export class DonationService {
  constructor(
    private readonly moduleName: string = "DonationService",
    private readonly repo: DonationRepository = new DonationRepository(),
    private readonly mapper: DonationMapper = new DonationMapper()
  ) {}
  public async getDonationDetail(req: RequestGetDonationDetail): Promise<any[]> {
    const prefiix = `getDonationDetail`;
    console.log(["Start", this.moduleName, prefiix].join("=> "));

    let moreCondition = "";
    if (+req.donate_project_id) {
      moreCondition += `AND ${this.repo.TABLE}.id = '${req.donate_project_id}' `;
    }
    if (req.search_keyword) {
      moreCondition += `AND (
        ${this.repo.TABLE}.name like '%${req.search_keyword}%'
        OR ${this.repo.TABLE}.description like '%${req.search_keyword}%'
      ) `;
    }

    const data = await this.repo.getDonationProjectData(req, moreCondition);
    const result = this.mapper.mapDonationProjectDetailData(data);

    return result;
  }

  public async addDonation(req: RequestAddDonation): Promise<number> {
    const prefiix = `getDonationDetail`;
    console.log(["Start", this.moduleName, prefiix].join("=> "));

    const [insertId, affectedRows] = (await this.repo.addDonation(req)) as any;
    if (affectedRows <= 0) {
      throw ErrorMessage.ERROR_ADD_DONATION();
    }

    return affectedRows;
  }
}
