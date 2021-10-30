import { IsEmail, IsNotEmpty, Matches, ValidateIf } from "class-validator";
import { AuthErrors } from "./auth.errors.dto";
import { toErrString } from "../../common/converters/error-message.converter";
import { UserDto } from "../../market/user/dto/user.dto";

export class RegisterDto extends UserDto {

    constructor(registerDto: RegisterDto) {
        super(registerDto);
        this.email = registerDto?.email;
        this.password = registerDto?.password;
        this.nic = registerDto?.nic.toUpperCase();
    }

    @IsEmail(undefined, toErrString(AuthErrors.AUTH_400_INVALID_EMAIL))
    @ValidateIf(o => Boolean(o.email ?? false))
    public email: string;

    @Matches(/^([0-9]{9}[xXvV]|[0-9]{12})$/, toErrString(AuthErrors.AUTH_400_INVALID_NIC))
    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_NIC))
    nic: string;

    @IsNotEmpty(toErrString(AuthErrors.AUTH_400_EMPTY_PASSWORD))
    public password: string;

    public getUserDto(): UserDto {
        return super.get();
    }

}
