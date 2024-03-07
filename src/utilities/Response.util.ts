export const SUCCESS_CODE = "0000";
export const SUCCESS_MESSAGE = "success";

export interface ResponseSuccess {
  result_code: string;
  result_message: string;
}

export interface ResponseSuccessWithResult extends ResponseSuccess {
  result: any;
}

export interface ResponseSuccessWithResultPaging extends ResponseSuccess {
  total: number;
  totalPage: number;
  currentPage: number;
  result: any;
}

export interface ResponseError extends ResponseSuccess {}

export const getResponseSuccess = (): ResponseSuccess => {
  return {
    result_code: SUCCESS_CODE,
    result_message: SUCCESS_MESSAGE,
  };
};

export const getResponseSuccessWithResult = (result: any): ResponseSuccessWithResult => {
  return {
    result_code: SUCCESS_CODE,
    result_message: SUCCESS_MESSAGE,
    result,
  };
};

export const getResponseSuccessWithResultPaging = (
  result: any,
  total: number,
  totalPage: number,
  currentPage: number
): ResponseSuccessWithResultPaging => {
  return {
    result_code: SUCCESS_CODE,
    result_message: SUCCESS_MESSAGE,
    total,
    totalPage,
    currentPage,
    result,
  };
};

export const getResponseError = (result_code: string, result_message: string): ResponseSuccess => {
  return {
    result_code,
    result_message,
  };
};

export const getErrorObject = (error: any): ResponseError => {
  return getResponseError(error.result_code, error.result_message);
};

export default {
  getResponseSuccess,
  getResponseSuccessWithResult,
  getResponseSuccessWithResultPaging,
  getErrorObject,
};
