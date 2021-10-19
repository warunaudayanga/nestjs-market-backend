import { Access } from "../entities/access.entity";
import { HttpException, Inject, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { AccessRepository } from "../repositories/access.repository";
import { Service } from "../../../common/services/entity.service";
import { DeepPartial } from "typeorm";
import { CommonEntity } from "../../common/entities/common.entity";
import { AccessErrors } from "../dto/access.errors.dto";

@Injectable({ scope: Scope.REQUEST })
export class AccessService extends Service<Access> {

    private writeEh = (err) : Error | void => {
        if (err.sqlMessage.match(/(REFERENCES `auth`)/)) {
            return new HttpException(AccessErrors.ACCESS_400_INVALID_AUTH, 400);
        }
    }

    constructor(
        @InjectRepository(AccessRepository) private accessRepository: AccessRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected logger: LoggerService
    ) {
        super("access", accessRepository, req, logger);
    }

    create(entity: DeepPartial<Access> & CommonEntity): Promise<Access> {
        return super.create(entity, this.writeEh);
    }

}
