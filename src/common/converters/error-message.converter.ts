import { toJSON, toString } from "./json.converter";
export interface AppError {
    status: number;
    code: string;
    message: string;
}

export const toErrString = (errObj: AppError): { message: string } => {
    return {
        message: toString(errObj)
    };
};

export const toErrorObject = (str: string): AppError => {
    return toJSON(str) as AppError;
};
