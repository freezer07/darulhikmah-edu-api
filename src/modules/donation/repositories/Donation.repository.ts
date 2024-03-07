import MysqlUtil from "../../../utilities/Mysql.util";
import { RequestGetDonationDetail, RequestAddDonation } from "../interface/Donation.interface";
import { DonationDataEntity } from "../entity/Donation.entity";

export class DonationRepository {
  constructor(private readonly module_name: string = "DonationRepository", private readonly timeout: number = 5000) {}

  public readonly TABLE = "donate_project";
  public readonly AKA_TABLE = "donate_project";
  private readonly SELECT_DONATION_DETAIL = `
    SELECT 
      ${this.AKA_TABLE}.id,
      ${this.AKA_TABLE}.name,
      ${this.AKA_TABLE}.description,
      ${this.AKA_TABLE}.current_amount,
      ${this.AKA_TABLE}.max_amount,
      ${this.AKA_TABLE}.start,
      ${this.AKA_TABLE}.end,
      ${this.AKA_TABLE}.status_id,
      ${this.AKA_TABLE}.create_at,
      ${this.AKA_TABLE}.update_at
    FROM ${this.TABLE} as ${this.AKA_TABLE}
    WHERE 1
  `;
  private readonly ACTIVE_CONDITION = `AND ${this.AKA_TABLE}.status_id = 1`;
  private readonly ORDER_BY_EARLY_ACTIVE = `ORDER BY ${this.AKA_TABLE}.start ASC`;

  public async getDonationProjectData(
    filter: RequestGetDonationDetail,
    moreCondition: string = ""
  ): Promise<DonationDataEntity[]> {
    const selectOption = MysqlUtil.getQuery(`
      ${this.SELECT_DONATION_DETAIL}
      ${moreCondition}
      ${this.ACTIVE_CONDITION}
      ${this.ORDER_BY_EARLY_ACTIVE}
    `);
    const result = await MysqlUtil.select(selectOption);

    return result;
  }

  public async addDonation(insertData: RequestAddDonation): Promise<unknown> {
    const insertOption = MysqlUtil.getInsertQuery(
      `
      INSERT INTO donate_detail
        (donate_project_id, member_id, name, phone_number, idcard_number, amount, comment)
      VALUES (?)
    `,
      [
        insertData.donate_project_id,
        insertData.donate_member_id,
        insertData.donate_name,
        insertData.donate_phone_number,
        insertData.donate_idcard_number,
        insertData.donate_amount,
        insertData.donate_comment,
      ]
    );
    const result = await MysqlUtil.executeInsert(insertOption);

    return [result.insertId, result.affectedRows];
  }
}
