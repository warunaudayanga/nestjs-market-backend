import { VerifyToken } from "../entities/verify-token.entity";
import { AuthDto } from "./auth.dto";
import { Auth } from "../entities/auth.entity";

export class VerifyTokenDto extends VerifyToken {

    constructor(auth?: Auth | AuthDto, token?: string) {
        super();
        this.auth = auth?.id;
        this.token = token;
    }

    auth: string

    token: string

}
