import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { toErrorObject } from "../converters/error-message.converter";
import { returnError } from "../methods/errors";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): any {

        let ex: any = exception;

        try {
            let errObj = ex.response;

            if (ex.response.statusCode && Array.isArray(ex.response.message)) {
                const matched = errObj.message[0].match(/[\w][\w\d]*[.]([\d][.])?/);
                if (matched) {
                    const errString = String(errObj.message[0]).replace(matched[0], "");
                    errObj = JSON.parse(errString);
                    if (matched[1]) {
                        errObj.iteration = Number(String(matched[1]).replace(".", ""));
                    }
                } else {
                    errObj = toErrorObject(ex.response.message[0]);
                }
            }

            ex.response = {
                status: errObj.status,
                code: errObj.code,
                message: errObj.message,
                iteration: errObj.iteration
            };

        } catch (err: any) {
            let error = {
                status: 500,
                code: "ERROR",
                message: "Internal Server Error"
            };
            if (returnError()) {
                error = {
                    status: 500,
                    code: "UNKNOWN",
                    message: ex.message
                };
            }

            ex = new HttpException(error, ex.status ? ex.status : 500);
        }

        super.catch(ex, host);
    }
}
