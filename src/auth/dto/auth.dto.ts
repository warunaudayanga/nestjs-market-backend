import { Auth } from "../entities/auth.entity";
import { User } from "../../market/user/entities/user.entity";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "./register.dto";

export class AuthDto extends Auth {

    constructor(registerDto: RegisterDto) {
        super();
        if (registerDto.password) {
            const cryptData = AuthService.generatePassword(registerDto.password);
            this.password = cryptData.password;
            this.salt = cryptData.salt;
        }
        this.email = registerDto.email;
        this.nic = registerDto?.nic.toUpperCase();
        this.profile = registerDto.getUserDto();
    }

    email: string;

    nic: string;

    password: string;

    salt: string;

    profile: User;

}
