import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { pbkdf2Sync, randomBytes } from "crypto";
import { readFileSync } from "fs";
import { join } from "path";
import { JwtService } from "@nestjs/jwt";
import { AuthDataDto } from "../dto/auth-data.dto";
import { AuthErrors } from "../dto/auth.errors.dto";
import { TokenData } from "../interfaces/token-data.interface";
import { LoggerService } from "../../common/services/logger.service";
import { VerifyTokenService } from "./verify-token.service";
import { EmailService } from "../../common/services/email.service";
import { VerifyTokenDto } from "../dto/verify-token.dto";
import { AuthType, StatusString } from "../enums/auth.enums";
import { SuccessDto } from "../../common/dto/success.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, Repository } from "typeorm";
import { Auth } from "../entities/auth.entity";
import { VerifyToken } from "../entities/verify-token.entity";
import { CreateAuthDto } from "../dto/create-auth.dto";
import { CryptAuthDto } from "../dto/crypt-auth.dto";
import { AuthDto } from "../dto/auth.dto";
import { UserErrors } from "../../market/user/dto/user.errors.dto";

@Injectable()
export class AuthService {

    private static keyPath = join(__dirname, "../config/keys");

    private static PRV_KEY = readFileSync(join(AuthService.keyPath, "id_rsa_prv.pem"), "utf8");

    private static PUB_KEY = readFileSync(join(AuthService.keyPath, "id_rsa_pub.pem"), "utf8");

    public static EXPIRES_IN = 60 * 60 * 24;

    constructor(
        @InjectRepository(Auth) private authRepository: Repository<Auth>,
        private jwtService: JwtService,
        private logger: LoggerService,
        private verifyTokenService: VerifyTokenService,
        private emailService: EmailService
    ) {}

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

    async register(createAuthDto: CreateAuthDto): Promise<SuccessDto> {
        const authDto = new AuthDto(createAuthDto);
        const auth = await this.create(authDto);
        const verifyToken = await this.verifyTokenService.create(auth, AuthService.generateRandomHash());
        await this.sendVerificationEmail(auth, verifyToken);
        return new SuccessDto("User registered successfully. Check your email for the verification.");
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
                if (await this.setVerified(verifyTokenDto.auth) && await this.verifyTokenService.delete(verifyTokenDto.auth)) {
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
        const verifyToken = await this.verifyTokenService.create(auth, AuthService.generateRandomHash());
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
                if (await this.verifyTokenService.delete(verifyTokenDto.auth)) {
                    return await this.verifyTokenService.create(auth, this.issueJWT(auth).token);
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
            if (await this.verifyTokenService.delete(auth)) {
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

            if (auth.statusString !== StatusString.Active) {
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

    async create(auth: Auth): Promise<Auth> {
        try {
            const createdAuth = await this.authRepository.save(auth);
            if (createdAuth) {
                return createdAuth;
            }
            return Promise.reject(new HttpException(AuthErrors.AUTH_500_CREATE, HttpStatus.INTERNAL_SERVER_ERROR));
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                if (err.sql.match(/(INSERT INTO `users`)/)) {
                    throw new HttpException(UserErrors.USER_409_EXIST_NIC, HttpStatus.CONFLICT);
                }
                throw new HttpException(AuthErrors.AUTH_409_EXIST_EMAIL, HttpStatus.CONFLICT);
            }
            this.logger.error(err);
            throw new HttpException(AuthErrors.AUTH_500_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, auth: Partial<Auth>): Promise<SuccessDto> {
        try {
            const updateResult = await this.authRepository.update(id, auth);
            if (Number(updateResult.affected) > 0) {
                return new SuccessDto("User updated successfully.");
            }
            return Promise.reject(new HttpException(AuthErrors.AUTH_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new HttpException(AuthErrors.AUTH_409_EXIST_EMAIL, HttpStatus.CONFLICT);
            }
            this.logger.error(err);
            throw new HttpException(AuthErrors.AUTH_500_UPDATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    changePassword(id: string, password: string): Promise<SuccessDto> {
        return this.update(id, AuthService.generatePassword(password));
    }

    changeType(id: string, authType: AuthType): Promise<SuccessDto> {
        return this.update(id, { type: authType });
    }

    activate(id: string): Promise<SuccessDto> {
        return this.update(id, { status: true, statusString: StatusString.Active });
    }

    deactivate(id: string): Promise<SuccessDto> {
        return this.update(id, { status: false, statusString: StatusString.Deactive });
    }

    delete(id: string): Promise<SuccessDto> {
        return this.update(id, { verified: false, status: false, statusString: StatusString.Deleted });
    }

    undelete(id: string): Promise<SuccessDto> {
        return this.update(id, { verified: false, status: false, statusString: StatusString.Pending });
    }

    get(id: string): Promise<Auth> {
        return this.getOne({ id });
    }

    async getAll(): Promise<Auth[]> {
        try {
            return await this.authRepository.find();
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(AuthErrors.AUTH_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(filter: FindConditions<Auth>): Promise<Auth> {
        try {
            const auth = await this.authRepository.findOne(filter);
            if (auth) {
                return auth;
            }
            return Promise.reject(new HttpException(AuthErrors.AUTH_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(AuthErrors.AUTH_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async isVerified(id: string): Promise<boolean | HttpStatus> {
        try {
            const auth = await this.getOne({ id });
            if (auth) {
                return auth.verified;
            }
            return HttpStatus.NOT_FOUND;
        } catch (err: any) {
            this.logger.error(err);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async setVerified(id: string, verified?: boolean): Promise<boolean | HttpStatus> {
        try {
            const auth = await this.update(id, {
                verified: verified !== undefined ? verified : true,
                status: verified !== undefined ? verified : true,
                statusString: verified !== undefined ? verified ? StatusString.Active : StatusString.Pending : StatusString.Active
            });
            if (auth) {
                return true;
            }
            return HttpStatus.NOT_FOUND;
        } catch (err: any) {
            this.logger.error(err);
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
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
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async hardDelete(id: string): Promise<SuccessDto> {
        try {
            const deleteResult = await this.authRepository.delete(id);
            if (deleteResult.affected > 0) {
                return Promise.resolve(new SuccessDto());
            }
            return Promise.reject(new HttpException(AuthErrors.AUTH_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            throw new HttpException(AuthErrors.AUTH_500_DELETE, HttpStatus.INTERNAL_SERVER_ERROR);
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
                throw new HttpException(AuthErrors.AUTH_500_EMAIL_SEND, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}
