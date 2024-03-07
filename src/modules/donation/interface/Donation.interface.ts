export interface RequestGetDonationDetail {
  donate_project_id: number;
  search_keyword: string;
}

export interface DonationProjectDetail {
  donate_project_id: number;
  donate_project_name: string;
  donate_project_description: string;
  donate_project_current_amount: number;
  donate_project_max_amount: number;
  donate_project_start: string;
  donate_project_end: string;
  status_id: number;
  create_at: string;
  update_at: string;
}

export interface RequestAddDonation {
  donate_project_id: number;
  donate_member_id: number;
  donate_name: string;
  donate_phone_number: string;
  donate_idcard_number: string;
  donate_amount: string;
  donate_comment: string;
}
