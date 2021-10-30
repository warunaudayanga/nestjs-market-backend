import { VerifyToken } from "../entities/verify-token.entity";

export class VerifyTokenDto extends VerifyToken {

    constructor(auth: string, token?: string) {
        super();
        this.auth = auth;
        this.token = token;
    }

    auth: string;

    token: string;

}
