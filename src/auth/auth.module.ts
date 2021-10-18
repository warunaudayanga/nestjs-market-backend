import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { CommonModule } from "../common/common.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./auth.controller";
import { VerifyTokenService } from "./services/verify-token.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { VerifyToken } from "./entities/verify-token.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Auth, VerifyToken]),
        CommonModule,
        PassportModule,
        JwtModule.register({
            privateKey: AuthService.getPrivateKey(),
            signOptions: { expiresIn: 60 * 60 * 24 }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, VerifyTokenService, JwtStrategy]
})
export class AuthModule {}
