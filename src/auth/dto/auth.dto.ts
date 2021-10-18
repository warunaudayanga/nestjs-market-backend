import { CryptAuthDto } from "./crypt-auth.dto";

export class AuthDto {

    constructor(email: string, cryptAuthDto: CryptAuthDto) {
        this.email = email;
        this.password = cryptAuthDto.password;
        this.salt = cryptAuthDto.salt;
    }

    email: string;

    password: string;

    salt: string;

}
