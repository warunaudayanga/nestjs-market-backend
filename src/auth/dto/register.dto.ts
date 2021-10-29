import { IsEmail, IsNotEmpty } from "class-validator";
import { AuthErrors } from "./auth.errors.dto";
import { toErrString } from "../../common/converters/error-message.converter";
import { UserDto } from "../../market/user/dto/user.dto";

export class RegisterDto extends UserDto {

    constructor(registerDto: RegisterDto) {
        super(registerDto);
        this.email = registerDto?.email;
        this.password = registerDto?.password;
    }

    @IsEmail(undefined, toErrString(AuthErrors.AUTH_400_INVALID_EMAIL))
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_EMAIL))
    public email: string;

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_PASSWORD))
    public password: string;

    public getUserDto(): UserDto {
        return super.get();
    }

}
