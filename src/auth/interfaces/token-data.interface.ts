import { Auth } from "../entities/auth.entity";

export interface TokenData {
    token: string,
    expiresIn: number,
    user: Auth
}
