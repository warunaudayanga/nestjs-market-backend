import { Auth } from "../entities/auth.entity";
import { User } from "../../market/user/entities/user.entity";
import { CreateAuthDto } from "./create-auth.dto";
import { AuthService } from "../services/auth.service";

export class AuthDto extends Auth {

    constructor(createAuthDto: CreateAuthDto) {
        super();
        const cryptData = AuthService.generatePassword(createAuthDto.password);
        this.email = createAuthDto.email;
        this.password = cryptData.password;
        this.salt = cryptData.salt;
        this.profile = createAuthDto.getUserDto();
    }

    email: string;

    password: string;

    salt: string;

    profile: User;

}
