import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { Position } from "../entities/position.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { PositionDto } from "../dto/position.dto";
import { SuccessDto } from "../../../common/dto/success.dto";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { PositionErrors } from "../dto/position.errors.dto";
import { REQUEST } from "@nestjs/core";
import { PositionRepository } from "../repositories/position.repository";
import { ReqAuth } from "../../common/repositories/common.repository";

@Injectable({ scope: Scope.REQUEST })
export class PositionService {

    constructor(
        @InjectRepository(PositionRepository) private positionRepository: PositionRepository,
        @Inject(REQUEST) protected readonly req: Request,
        private logger: LoggerService
    ) {}

    async create(createPositionDto: PositionDto): Promise<Position> {
        try {
            return await this.positionRepository.saveAuth(createPositionDto, this.req as ReqAuth);
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new HttpException(PositionErrors.POSITION_409_EXIST_NAME, HttpStatus.CONFLICT);
            }
            this.logger.error(err);
            throw new HttpException(PositionErrors.POSITION_500_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, updatePositionDto: Partial<PositionDto>): Promise<SuccessDto> {
        if (!id) {
            return Promise.reject(new HttpException(PositionErrors.POSITION_400_EMPTY_ID, HttpStatus.NOT_FOUND));
        }
        try {
            const updateResult = await this.positionRepository.update(id, updatePositionDto, this.req as ReqAuth);
            if (updateResult.affected > 0) {
                return new SuccessDto("Position updated successfully.");
            }
            return Promise.reject(new HttpException(PositionErrors.POSITION_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new HttpException(PositionErrors.POSITION_409_EXIST_NAME, HttpStatus.CONFLICT);
            }
            this.logger.error(err);
            throw new HttpException(PositionErrors.POSITION_500_UPDATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    changeStatus(id: string, status: boolean): Promise<SuccessDto> {
        return this.update(id, new PositionDto({ status }));
    }

    activate(id: string): Promise<SuccessDto> {
        return this.changeStatus(id, true);
    }

    deactivate(id: string): Promise<SuccessDto> {
        return this.changeStatus(id, false);
    }

    async get(id: string): Promise<Position> {
        if (!id) {
            return Promise.reject(new HttpException(PositionErrors.POSITION_400_EMPTY_ID, HttpStatus.NOT_FOUND));
        }
        try {
            const position = await this.positionRepository.findOne(id);
            if (position) {
                return position;
            }
            return Promise.reject(new HttpException(PositionErrors.POSITION_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(PositionErrors.POSITION_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(filter: FindConditions<Position>): Promise<Position> {
        try {
            const position = await this.positionRepository.findOne(filter);
            if (position) {
                return position;
            }
            return Promise.reject(new HttpException(PositionErrors.POSITION_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(PositionErrors.POSITION_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll(): Promise<Position[]> {
        try {
            return await this.positionRepository.find();
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(PositionErrors.POSITION_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string): Promise<SuccessDto> {
        try {
            const deleteResult = await this.positionRepository.delete(id);
            if (deleteResult.affected > 0) {
                return new SuccessDto("Position deleted successfully.");
            }
            return Promise.reject(new HttpException(PositionErrors.POSITION_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(PositionErrors.POSITION_500_DELETE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
