import { Response } from "express";
import { ValidateUtil } from "./Validate.util";
import { ErrorMessage } from "../messages/Error.message";
import ResponseUtil from "./Response.util";

export let contentLanguage: string = "th";

export const setContentLanguage = (lang: string = "th"): void => {
  contentLanguage = lang;
};
class CommonUtil {
  constructor(
    private readonly module_name: string = "CommonUtil",
    private readonly validateUtil: ValidateUtil = new ValidateUtil()
  ) {}

  public getErrorResponse(error: any, res: Response): void {
    if (this.validateUtil.isError(error)) {
      console.log(`Error :=> `, [error.stack, error.message].join(" "));
      error = ErrorMessage.COMMON_ERROR();
    } else {
      console.log(JSON.stringify(error));
    }

    res.json(ResponseUtil.getErrorObject(error));
  }
}

export const Common = new CommonUtil();
