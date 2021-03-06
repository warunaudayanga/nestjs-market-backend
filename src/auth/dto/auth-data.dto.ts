import { IsNotEmpty } from "class-validator";
import { toErrString } from "../../common/converters/error-message.converter";
import { AuthErrors } from "./auth.errors.dto";

export class AuthDataDto {

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_USERNAME))
    username: string;

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_PASSWORD))
    password: string;

}
