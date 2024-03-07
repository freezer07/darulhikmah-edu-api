import { Request } from "express";
import { DonationDataEntity } from "../entity/Donation.entity";
import { RequestGetDonationDetail, DonationProjectDetail, RequestAddDonation } from "../interface/Donation.interface";

export class DonationMapper {
  constructor(private readonly module_name: string = "DonationMapper") {}

  public mapRequestGetDonationProjectDetail(req: Request): RequestGetDonationDetail {
    return {
      donate_project_id: Number(req?.query?.donate_project_id || 0),
      search_keyword: String(req?.query?.search_keyword || "").trim(),
    };
  }
  public mapDonationProjectDetailData(entity: DonationDataEntity[]): DonationProjectDetail[] {
    return entity.map((donate) => ({
      donate_project_id: donate.id,
      donate_project_name: donate.name,
      donate_project_description: donate.description,
      donate_project_current_amount: donate.current_amount,
      donate_project_max_amount: donate.max_amount,
      donate_project_start: donate.start,
      donate_project_end: donate.end,
      status_id: donate.status_id,
      create_at: donate.create_at,
      update_at: donate.update_at,
    }));
  }

  public mapRequestAddDonation(req: Request): RequestAddDonation {
    return {
      donate_project_id: req.body.donate_project_id,
      donate_member_id: req.body.donate_member_id,
      donate_name: req.body.donate_name,
      donate_phone_number: req.body.donate_phone_number,
      donate_idcard_number: req.body.donate_idcard_number,
      donate_amount: req.body.donate_amount,
      donate_comment: req.body.donate_comment,
    };
  }
}
