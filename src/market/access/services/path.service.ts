import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { Path } from "../entities/path.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { PathDto } from "../dto/path.dto";
import { SuccessDto } from "../../../common/dto/success.dto";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { PathErrors } from "../dto/path.errors.dto";
import { REQUEST } from "@nestjs/core";
import { PathRepository } from "../repositories/path.repository";
import { ReqAuth } from "../../common/repositories/common.repository";

@Injectable({ scope: Scope.REQUEST })
export class PathService {

    constructor(
        @InjectRepository(PathRepository) private pathRepository: PathRepository,
        @Inject(REQUEST) protected readonly req: Request,
        private logger: LoggerService
    ) {}

    async create(createPathDto: PathDto): Promise<Path> {
        try {
            return await this.pathRepository.saveAuth(createPathDto, this.req as ReqAuth);
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new HttpException(PathErrors.PATH_409_EXIST_PATH, HttpStatus.CONFLICT);
            }
            this.logger.error(err);
            throw new HttpException(PathErrors.PATH_500_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, updatePathDto: Partial<PathDto>): Promise<SuccessDto> {
        if (!id) {
            return Promise.reject(new HttpException(PathErrors.PATH_400_EMPTY_ID, HttpStatus.NOT_FOUND));
        }
        try {
            const updateResult = await this.pathRepository.update(id, updatePathDto, this.req as ReqAuth);
            if (updateResult.affected > 0) {
                return new SuccessDto("Path updated successfully.");
            }
            return Promise.reject(new HttpException(PathErrors.PATH_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new HttpException(PathErrors.PATH_409_EXIST_PATH, HttpStatus.CONFLICT);
            }
            this.logger.error(err);
            throw new HttpException(PathErrors.PATH_500_UPDATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    changeStatus(id: string, status: boolean): Promise<SuccessDto> {
        return this.update(id, new PathDto({ status }));
    }

    activate(id: string): Promise<SuccessDto> {
        return this.changeStatus(id, true);
    }

    deactivate(id: string): Promise<SuccessDto> {
        return this.changeStatus(id, false);
    }

    async get(id: string): Promise<Path> {
        if (!id) {
            return Promise.reject(new HttpException(PathErrors.PATH_400_EMPTY_ID, HttpStatus.NOT_FOUND));
        }
        try {
            const path = await this.pathRepository.findOne(id);
            if (path) {
                return path;
            }
            return Promise.reject(new HttpException(PathErrors.PATH_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(PathErrors.PATH_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(filter: FindConditions<Path>): Promise<Path> {
        try {
            const path = await this.pathRepository.findOne(filter);
            if (path) {
                return path;
            }
            return Promise.reject(new HttpException(PathErrors.PATH_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(PathErrors.PATH_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll(): Promise<Path[]> {
        try {
            return await this.pathRepository.find();
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(PathErrors.PATH_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string): Promise<SuccessDto> {
        try {
            const deleteResult = await this.pathRepository.delete(id);
            if (deleteResult.affected > 0) {
                return new SuccessDto("Path deleted successfully.");
            }
            return Promise.reject(new HttpException(PathErrors.PATH_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(PathErrors.PATH_500_DELETE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
