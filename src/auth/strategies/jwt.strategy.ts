import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthErrors } from "../dto/auth.errors.dto";
import { Auth } from "../entities/auth.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: AuthService.getPublicKey(),
            algorithms: ["RS256"]
        });
    }

    // noinspection JSUnusedGlobalSymbols
    async validate(jwtPayload: any): Promise<{ auth: Auth }> {
        const user = await this.authService.getSensitive({ id: jwtPayload.sub });
        if (!user || typeof user === "number") {
            if (user === HttpStatus.NOT_FOUND) {
                throw new HttpException(AuthErrors.AUTH_401_INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
            }
            throw new HttpException(AuthErrors.ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return { auth: user };
    }
}
