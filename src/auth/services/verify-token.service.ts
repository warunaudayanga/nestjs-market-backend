import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoggerService } from "../../common/services/logger.service";
import { VTokenErrors } from "../dto/verify-token.errors.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "../entities/auth.entity";
import { Repository, FindConditions } from "typeorm";
import { VerifyToken } from "../entities/verify-token.entity";

@Injectable()
export class VerifyTokenService {

    constructor(@InjectRepository(VerifyToken) private verifyTokenRepository: Repository<VerifyToken>, private readonly logger: LoggerService) { }

    async create(auth: Auth, token: string): Promise<VerifyToken | null> {
        try {
            return await this.verifyTokenRepository.save({ auth: auth.id, token });
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(VTokenErrors.VTOKEN_500_CREATE_TOKEN, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(auth_id: string): Promise<boolean> {
        try {
            const deleteResult = await this.verifyTokenRepository.delete({ auth: auth_id });
            return Boolean(deleteResult.affected);
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(VTokenErrors.VTOKEN_500_DELETE_TOKEN, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async check(filter: FindConditions<VerifyToken>): Promise<boolean> {
        try {
            return Boolean(await this.verifyTokenRepository.findOne(filter));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(VTokenErrors.VTOKEN_500_DELETE_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
