import { IsEmail, IsNotEmpty } from "class-validator";
import { AuthErrors } from "./auth.errors.dto";
import { toErrString } from "../../common/converters/error-message.converter";

export class CreateAuthDto {

    @IsEmail(undefined, toErrString(AuthErrors.AUTH_400_INVALID_EMAIL))
    email: string;

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_PASSWORD))
    password: string;

}
