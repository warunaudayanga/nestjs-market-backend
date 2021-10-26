import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { toErrorObject } from "../converters/error-message.converter";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): any {

        let ex: any = exception;

        try {
            let errObj = ex.response;

            // if (Array.isArray(errObj.message)) {
            //     const matched = errObj.message[0].match(/[\w][\w\d]*[.]([\d][.])?/);
            //     const errString = String(errObj.message[0]).replace(matched[0], "");
            //     errObj = JSON.parse(errString);
            // }
            // console.log(errObj);

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
            try {
                ex.response = {
                    status: ex.status,
                    code: "ERROR",
                    message: ex.response.message ? ex.response.message : ex.message ? ex.message : ex.response
                };
            } catch (err: any) {}
        }

        super.catch(ex, host);
    }
}
