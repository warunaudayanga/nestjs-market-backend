import { Auth } from "../entities/auth.entity";
import { User } from "../../market/user/entities/user.entity";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "./register.dto";

export class AuthDto extends Auth {

    constructor(registerDto: RegisterDto) {
        super();
        const cryptData = AuthService.generatePassword(registerDto.password);
        this.email = registerDto.email;
        this.password = cryptData.password;
        this.salt = cryptData.salt;
        this.profile = registerDto.getUserDto();
    }

    email: string;

    password: string;

    salt: string;

    profile: User;

}
