import { contentLanguage } from "../utilities/Common.util";
import { CommonConstant } from "../constant/Common.constant";

export const ErrorMessage = {
  COMMON_ERROR: (message?: string, lang?: string) => {
    return {
      result_code: [CommonConstant.SERVICE_CODE, `0000`].join(""),
      result_message: getMessage("COMMON_ERROR"),
    };
  },
  ERROR_ADD_DONATION: () => {
    return {
      result_code: [CommonConstant.SERVICE_CODE, `0001`].join(""),
      result_message: getMessage("ERROR_ADD_DONATION"),
    };
  },
  ERROR_VALIDATION: (message?: string, lang?: string) => {
    return {
      result_code: [CommonConstant.SERVICE_CODE, `1000`].join(""),
      result_message: message ? message : getMessage("ERROR_VALIDATION", lang),
    };
  },
};

const MESSAGE: any = {
  COMMON_ERROR: () => {
    return {
      th: "พบปัญหาบางงอย่าง กรุณาลองอีกครั้ง",
      en: "An error occurred, please try again.",
    };
  },
  ERROR_ADD_DONATION: () => {
    return {
      th: "ไม่สามารถเพิ่มยอดบริจาคได้ กรุณาลองอีกครั้ง",
      en: "Cannot to adjust donate, please try again.",
    };
  },

  ERROR_VALIDATION: () => {
    return {
      th: "ข้อมูลไม่ครบถ้วน กรุณาลองอีกครั้ง",
      en: "Incomplete information, please try again.",
    };
  },
};

const getMessage = (key: string, lang?: string, params: any[] = []): any => {
  lang = lang || contentLanguage || "th";
  if (params) {
    return MESSAGE?.[key](...params)?.[lang];
  } else {
    return MESSAGE?.[key]?.[lang];
  }
};

export default {
  ErrorMessage,
};
