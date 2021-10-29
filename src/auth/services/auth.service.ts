import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { Auth } from "../entities/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../common/services/logger.service";
import { SuccessDto } from "../../common/entity/entity.success.dto";
import { Service } from "../../common/entity/entity.service";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { AuthRepository } from "../repositories/auth.repository";
import { AuthErrors } from "../dto/auth.errors.dto";
import { join } from "path";
import { readFileSync } from "fs";
import { JwtService } from "@nestjs/jwt";
import { VerifyTokenService } from "./verify-token.service";
import { EmailService } from "../../common/services/email.service";
import { pbkdf2Sync, randomBytes } from "crypto";
import { CryptAuthDto } from "../dto/crypt-auth.dto";
import { VerifyToken } from "../entities/verify-token.entity";
import { returnError } from "../../common/methods/errors";
import { RegisterDto } from "../dto/register.dto";
import { VerifyTokenDto } from "../dto/verify-token.dto";
import { StatusString } from "../../common/entity/entity.enums";
import { AuthDataDto } from "../dto/auth-data.dto";
import { TokenData } from "../interfaces/token-data.interface";
import { AuthType } from "../enums/auth.enums";
import { AuthDto } from "../dto/auth.dto";
import { CommonEntity } from "../../common/entity/entity";
import { UserErrors } from "../../market/user/dto/user.errors.dto";

@Injectable({ scope: Scope.REQUEST })
export class AuthService extends Service<Auth>{

    private static keyPath = join(__dirname, "../config/keys");

    private static PRV_KEY = readFileSync(join(AuthService.keyPath, "id_rsa_prv.pem"), "utf8");

    private static PUB_KEY = readFileSync(join(AuthService.keyPath, "id_rsa_pub.pem"), "utf8");

    public static EXPIRES_IN = 60 * 60 * 24;

    private writeErrorHandler = (err) : Error | void => {
        if (err.errno === 1062 && err.sqlMessage?.match(/(for key 'users\.)/)) {
            return new HttpException(UserErrors.USER_409_EXIST_NIC, HttpStatus.CONFLICT);
        }
    }

    constructor(
        @InjectRepository(AuthRepository) private authRepository: AuthRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected logger: LoggerService,
        private jwtService: JwtService,
        private verifyTokenService: VerifyTokenService,
        private emailService: EmailService
    ) {
        super(["auth", "email"], authRepository, req, logger);
    }

    public static getPrivateKey(): string {
        return AuthService.PRV_KEY;
    }

    public static getPublicKey(): string {
        return AuthService.PUB_KEY;
    }

    public static generateRandomHash(): string {
        return randomBytes(48).toString("hex");
    }

    public static generatePassword(password: string): CryptAuthDto {
        const salt = randomBytes(32).toString("hex");
        const hash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
        return { salt, password: hash };
    }

    public static verifyHash(password: string, hash: string, salt: string): boolean {
        const generatedHash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
        return hash === generatedHash;
    }

    async register(registerDto: RegisterDto): Promise<SuccessDto> {
        await this.startTransaction();
        try {
            const authDto = new AuthDto(registerDto);
            const auth = await this.createAlt(authDto, undefined, this.writeErrorHandler);
            const verifyTokenDto = new VerifyTokenDto(auth, AuthService.generateRandomHash());
            const verifyToken = await this.repository.queryRunner.manager.save(VerifyToken, verifyTokenDto) as VerifyToken & CommonEntity;
            await this.sendVerificationEmail(auth, verifyToken);
            await this.commitTransaction();
            return new SuccessDto("User registered successfully. Check your email for the verification.");
        } catch (err: any) {
            await this.rollbackTransaction();
            throw err;
        }
    }

    async verify(verifyTokenDto: VerifyTokenDto): Promise<string> {

        if (!verifyTokenDto || !verifyTokenDto.auth || !verifyTokenDto.token) {
            return "invalid_data";
        }

        try {
            const isVerified = await this.isVerified(verifyTokenDto.auth);

            if (isVerified === true) {
                return "already_verified";
            } else if (typeof isVerified === "number") {
                return isVerified === 404 ? "auth_not_found" : "server_error";
            }

            if (await this.verifyTokenService.check(verifyTokenDto)) {
                if (await this.setVerified(verifyTokenDto.auth) && await this.verifyTokenService.deleteBool(verifyTokenDto)) {
                    return "success";
                }
                return "fail";
            }
            return "token_not_found";

        } catch (err: any) {
            this.logger.error(err);
            return "server_error";
        }
    }

    async requestRecovery(email: string): Promise<SuccessDto> {
        const auth = await this.getOne({ email });
        const verifyTokenDto = new VerifyTokenDto(auth, AuthService.generateRandomHash());
        const verifyToken = await this.verifyTokenService.createAlt(verifyTokenDto);
        await this.sendRecoveryEmail(auth, verifyToken);
        return new SuccessDto("Password recovery email sent successfully.");
    }

    async verifyRecovery(verifyTokenDto: VerifyTokenDto): Promise<VerifyToken | string> {

        if (!verifyTokenDto || !verifyTokenDto.auth || !verifyTokenDto.token) {
            return "invalid_data";
        }

        const auth = await this.getSensitive({ id: verifyTokenDto.auth });

        if (typeof auth === "number") {
            return auth === 404 ? "auth_not_found" : "server_error";
        }

        try {
            if (await this.verifyTokenService.check(verifyTokenDto)) {
                if (await this.verifyTokenService.deleteBool(verifyTokenDto)) {
                    return await this.verifyTokenService.createAlt(new VerifyTokenDto(auth, this.issueJWT(auth).token));
                }
                return "fail";
            }
            return "token_not_found";
        } catch (err: any) {
            this.logger.error(err);
            return "server_error";
        }
    }

    async resetPassword(auth: string, password: string): Promise<SuccessDto> {
        if (await this.verifyTokenService.check({ auth })) {
            await this.changePassword(auth, password);
            if (await this.verifyTokenService.deleteBool({ auth })) {
                return new SuccessDto("Password changed successfully.");
            }
            return Promise.reject(new HttpException(AuthErrors.AUTH_500_UPDATE, HttpStatus.INTERNAL_SERVER_ERROR));
        }
        return Promise.reject(new HttpException(AuthErrors.AUTH_401_INVALID_TOKEN, HttpStatus.UNAUTHORIZED));
    }

    async authenticate(authDataDto: AuthDataDto): Promise<TokenData> {

        try {
            const auth = await this.getSensitive({ email: authDataDto.username });

            if (typeof auth === "number") {
                if (auth === 500) {
                    return Promise.reject(new HttpException(AuthErrors.AUTH_500_LOGIN, HttpStatus.INTERNAL_SERVER_ERROR));
                }
                return Promise.reject(new HttpException(AuthErrors.AUTH_401_INVALID, HttpStatus.UNAUTHORIZED));
            }

            if (!auth.verified) {
                return Promise.reject(new HttpException(AuthErrors.AUTH_401_NOT_VERIFIED, HttpStatus.UNAUTHORIZED));
            }

            if (auth.statusString !== StatusString.ACTIVE) {
                return Promise.reject(new HttpException(AuthErrors.AUTH_401_NOT_ACTIVE, HttpStatus.UNAUTHORIZED));
            }

            if (!AuthService.verifyHash(authDataDto.password, auth.password, auth.salt)) {
                return Promise.reject(new HttpException(AuthErrors.AUTH_401_INVALID, HttpStatus.UNAUTHORIZED));
            }

            const authWithUser = await this.get(auth.id);

            const tokenObject = this.issueJWT(auth);

            return {
                token: tokenObject.token,
                expiresIn: tokenObject.expires,
                auth: authWithUser
            };

        } catch (err: any) {
            throw new HttpException(AuthErrors.AUTH_500_LOGIN, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    changePassword(id: string, password: string): Promise<SuccessDto> {
        return this.updateAlt(id, AuthService.generatePassword(password));
    }

    changeType(id: string, authType: AuthType): Promise<SuccessDto> {
        return this.updateAlt(id, { type: authType });
    }

    activate(id: string): Promise<SuccessDto> {
        return this.updateAlt(id, { status: true, statusString: StatusString.ACTIVE });
    }

    deactivate(id: string): Promise<SuccessDto> {
        return this.updateAlt(id, { status: false, statusString: StatusString.DEACTIVE });
    }

    delete(id: string): Promise<SuccessDto> {
        return this.updateAlt(id, { verified: false, status: false, statusString: StatusString.DELETED });
    }

    undelete(id: string): Promise<SuccessDto> {
        return this.updateAlt(id, { verified: false, status: false, statusString: StatusString.PENDING });
    }

    async hardDelete(id: string): Promise<SuccessDto> {
        try {
            const deleteResult = await this.authRepository.delete(id);
            if (deleteResult.affected > 0) {
                return Promise.resolve(new SuccessDto());
            }
            return Promise.reject(new HttpException(AuthErrors.AUTH_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
            throw new HttpException(AuthErrors.AUTH_500_DELETE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async isVerified(id: string): Promise<boolean | HttpStatus> {
        try {
            const auth = await this.getOne({ id });
            return auth.verified;
        } catch (err: any) {
            if (err.response?.status === 404) {
                return HttpStatus.NOT_FOUND;
            }
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async setVerified(id: string, verified?: boolean): Promise<boolean | HttpStatus> {
        try {
            const auth = await this.updateAlt(id, {
                verified: verified !== undefined ? verified : true,
                status: verified !== undefined ? verified : true,
                statusString: verified !== undefined ? verified ? StatusString.ACTIVE : StatusString.PENDING : StatusString.ACTIVE
            });
            if (auth) {
                return true;
            }
            return HttpStatus.NOT_FOUND;
        } catch (err: any) {
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    public issueJWT = (auth: Auth): { expires: number; token: string } => {
        const id = auth.id;
        const expiresIn = 60 * 60 * 24;
        const payload = { sub: id, iat: Date.now() };
        const accessToken = this.jwtService.sign(payload, { expiresIn, algorithm: "RS256" });
        return {
            token: "Bearer " + accessToken,
            expires: expiresIn
        };
    }

    async getSensitive(filter: { id?: string, email?: string }): Promise<Auth | number> {
        try {
            const auth = await this.authRepository
                .createQueryBuilder("auth")
                .addSelect("auth.password")
                .addSelect("auth.salt")
                .where(filter)
                .getOne();
            if (auth) {
                return auth;
            }
            return HttpStatus.NOT_FOUND;
        } catch (err: any) {
            if (err.kind === "ObjectId") {
                return HttpStatus.NOT_FOUND;
            }
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    private async sendVerificationEmail(auth: Auth, verifyToken: VerifyToken): Promise<void> {

        const subject = "Verify Your Email";
        const html = `<br>
                      <br>
                      <br>
                      <h1 style="text-align: center;">Hello ${auth.profile.firstName}. ${process.env.COMPANY_NAME ? "Welcome to " + process.env.COMPANY_NAME + "." : ""} </h1>
                      <h3 style="text-align: center;color: #999">We are glad to see you.</h3>
                      <br>
                      <br>
                      <h3 style="text-align: center;">Click <a href='http://localhost:8080/api/auth/verify?auth=${auth.id}&token=${verifyToken.token}'>here</a> to verify your email.</h3>`;

        return await this.sendMail(auth.email, subject, html);
    }

    private async sendRecoveryEmail(auth: Auth, verifyToken: VerifyToken): Promise<void> {

        const subject = "Password Recovery";
        const html = `<br>
                      <br>
                      <br>
                      <h3 style="text-align: center;">Click <a href='http://localhost:8080/api/auth/recovery?auth=${auth.id}&token=${verifyToken.token}'>here</a> to reset your password.</h3>`;

        return await this.sendMail(auth.email, subject, html);
    }

    private sendMail(email, subject, html): Promise<void> {

        const from = process.env.COMPANY_NAME;

        return this.emailService.sendMail(from, email, subject, html)
            .then(info => {
                if (info.accepted.includes(email)) {
                    return;
                }
                return Promise.reject(new HttpException(AuthErrors.AUTH_417_EMAIL_REJECT, HttpStatus.EXPECTATION_FAILED));
            })
            .catch(err => {
                this.logger.error(err);
                if (returnError()) {
                    throw err;
                }
                throw new HttpException(AuthErrors.AUTH_500_EMAIL_SEND, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}
