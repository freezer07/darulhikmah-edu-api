import jsonschema from "jsonschema";
import { ErrorMessage } from "../messages/Error.message";

export class ValidateUtil {
  public validateSchema(schema: any, data: any, lang: string = "th"): void {
    let allMessage: any = [];

    const result = jsonschema.validate(data, schema);
    if (result?.errors?.length) {
      result.errors.forEach((error: any) => {
        allMessage.push(`${error.property}: ${error.message}`);
      });
    }

    allMessage = allMessage.join(", ");
    if (allMessage) {
      throw ErrorMessage.ERROR_VALIDATION(allMessage, lang);
    }
  }

  public isError(error: any): boolean {
    return error && error.stack && error.message;
  }
}
