export const getDonationDetailSchema = {
  type: "object",
  properties: {},
  required: [],
};

export const addDonationSchema = {
  type: "object",
  properties: {
    donate_project_id: { type: "string", required: true },
    donate_member_id: { type: "number" },
    donate_name: { type: "string", required: true },
    donate_phone_number: { type: "string" },
    donate_idcard_number: { type: "string" },
    donate_amount: { type: "number", required: true },
    donate_comment: { type: "string" },
  },
  required: ["donate_project_id", "donate_name", "donate_amount"],
};
