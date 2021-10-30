import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { VerifyToken } from "../entities/verify-token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../common/services/logger.service";
import { Service } from "../../common/entity/entity.service";
import { VerifyTokenRepository } from "../repositories/verify-token.repository";
import { FindConditions } from "typeorm";
import { returnError } from "../../common/methods/errors";
import { VTokenErrors } from "../dto/verify-token.errors.dto";
import { VerifyTokenDto } from "../dto/verify-token.dto";

@Injectable()
export class VerifyTokenService extends Service<VerifyToken>{

    constructor(
        @InjectRepository(VerifyTokenRepository) private verifyTokenRepository: VerifyTokenRepository,
        protected logger: LoggerService
    ) {
        super(["verify token"], verifyTokenRepository, undefined, logger);
    }

    async check(filter: FindConditions<VerifyToken>): Promise<boolean> {
        try {
            return Boolean(await this.getOne(filter));
        } catch (err: any) {
            if (err.response?.status === 404) {
                return false;
            }
            this.logger.error(err);
            throw new HttpException(VTokenErrors.VTOKEN_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteBool(verifyTokenDto: Partial<VerifyTokenDto>): Promise<boolean> {
        try {
            const deleteResult = await this.verifyTokenRepository.delete({ auth: verifyTokenDto.auth });
            return Boolean(deleteResult.affected);
        } catch (err: any) {
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
            throw new HttpException(VTokenErrors.VTOKEN_500_DELETE_TOKEN, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
