import { Access } from "../entities/access.entity";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { AccessDto } from "../dto/access.dto";
import { SuccessDto } from "../../../common/dto/success.dto";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { AccessErrors } from "../dto/access.errors.dto";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { AccessRepository } from "../repositories/access.repository";
import { ReqAuth } from "../../common/repositories/common.repository";

@Injectable()
export class AccessService {

    constructor(
        @InjectRepository(AccessRepository) private accessRepository: AccessRepository,
        @Inject(REQUEST) protected readonly req: Request,
        private logger: LoggerService
    ) { }

    async create(createAccessDto: AccessDto): Promise<Access> {
        try {
            return await this.accessRepository.save(createAccessDto, undefined, this.req as ReqAuth);
        } catch (err: any) {
            if (err.errno === 1452) {
                throw new HttpException(AccessErrors.ACCESS_404_PATH, HttpStatus.NOT_FOUND);
            }
            this.logger.error(err);
            throw new HttpException(AccessErrors.ACCESS_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, updateAccessDto: Partial<AccessDto>): Promise<SuccessDto> {
        try {
            const updateResult = await this.accessRepository.update(id, updateAccessDto, this.req as ReqAuth);
            if (updateResult.affected > 0) {
                return new SuccessDto("Access updated successfully.");
            }
            return Promise.reject(new HttpException(AccessErrors.ACCESS_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(AccessErrors.ACCESS_500_UPDATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async get(id: string): Promise<Access> {
        try {
            const access = await this.accessRepository.findOne(id);
            if (access) {
                return access;
            }
            return Promise.reject(new HttpException(AccessErrors.ACCESS_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(AccessErrors.ACCESS_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(filter: FindConditions<Access>): Promise<Access> {
        try {
            const access = await this.accessRepository.findOne(filter);
            if (access) {
                return access;
            }
            return Promise.reject(new HttpException(AccessErrors.ACCESS_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(AccessErrors.ACCESS_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll(): Promise<Access[]> {
        try {
            return await this.accessRepository.find();
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(AccessErrors.ACCESS_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string): Promise<SuccessDto> {
        try {
            const deleteResult = await this.accessRepository.delete(id);
            if (deleteResult.affected > 0) {
                return new SuccessDto("Access deleted successfully.");
            }
            return Promise.reject(new HttpException(AccessErrors.ACCESS_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(AccessErrors.ACCESS_500_DELETE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
