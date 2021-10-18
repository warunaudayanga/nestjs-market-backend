import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { toErrorObject } from "../converters/error-message.converter";

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): any {

        let ex: any = exception;

        try {
            let errObj = ex.response;
            if (ex.response.statusCode && Array.isArray(ex.response.message)) {
                errObj = toErrorObject(ex.response.message[0]);
            }
            ex.response = {
                status: errObj.status,
                code: errObj.code,
                message: errObj.message
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
