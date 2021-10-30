import { IsNotEmpty } from "class-validator";
import { toErrString } from "../../common/converters/error-message.converter";
import { AuthErrors } from "./auth.errors.dto";

export class ChangePasswordDto {

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_PASSWORD))
    current: string;

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_NEW_PASSWORD))
    new: string;

}
