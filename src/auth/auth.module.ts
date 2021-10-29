import { Global, Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./auth.controller";
import { VerifyTokenService } from "./services/verify-token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { VerifyToken } from "./entities/verify-token.entity";
import { AuthRepository } from "./repositories/auth.repository";
import { VerifyTokenRepository } from "./repositories/verify-token.repository";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Auth, AuthRepository, VerifyToken, VerifyTokenRepository]),
        JwtModule.register({
            privateKey: AuthService.getPrivateKey(),
            signOptions: { expiresIn: AuthService.EXPIRES_IN }
        }),
        PassportModule
    ],
    controllers: [AuthController],
    providers: [AuthService, VerifyTokenService, JwtStrategy],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
