import { Access } from "../entities/access.entity";
import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { Service } from "../../../common/entity/entity.service";
import { DeepPartial, SaveOptions } from "typeorm";
import { CommonEntity } from "../../../common/entity/entity";
import { AccessErrors } from "../dto/access.errors.dto";
import { AccessRepository } from "../repositories/access.repository";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { SuccessDto } from "../../../common/entity/entity.success.dto";

@Injectable({ scope: Scope.REQUEST })
export class AccessService extends Service<Access> {

    private writeErrorHandler = (err) : Error | void => {
        if (err.errno === 1452) {
            if (err.sqlMessage?.match(/(REFERENCES `auth`)/)) {
                return new HttpException(AccessErrors.ACCESS_404_AUTH, HttpStatus.NOT_FOUND);
            } else if (err.sqlMessage?.match(/(REFERENCES `access_path`)/)) {
                return new HttpException(AccessErrors.ACCESS_404_PATH, HttpStatus.NOT_FOUND);
            }
        }
    }

    constructor(
        @InjectRepository(AccessRepository) private accessRepository: AccessRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected logger: LoggerService
    ) {
        super(["access"], accessRepository, req, logger);
    }

    create<T extends DeepPartial<Access> & DeepPartial<CommonEntity>>(entity: T, options?: SaveOptions): Promise<Access> {
        return super.create(entity, options, this.writeErrorHandler);
    }

    update(id: string, partialEntity: QueryDeepPartialEntity<Access> & Partial<CommonEntity>): Promise<SuccessDto> {
        return super.update(id, partialEntity, this.writeErrorHandler);
    }

}
