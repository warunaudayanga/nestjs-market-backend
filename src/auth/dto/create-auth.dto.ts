import { IsEmail, IsNotEmpty } from "class-validator";
import { AuthErrors } from "./auth.errors.dto";
import { toErrString } from "../../common/converters/error-message.converter";
import { UserDto } from "../../market/user/dto/user.dto";

export class CreateAuthDto extends UserDto {

    constructor(createAuthDto: CreateAuthDto) {
        super(createAuthDto);
        this.email = createAuthDto?.email;
        this.password = createAuthDto?.password;
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
