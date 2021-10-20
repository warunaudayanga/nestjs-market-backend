import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { DeepPartial, FindConditions, FindManyOptions, FindOneOptions } from "typeorm";
import { HttpException } from "@nestjs/common";
import { Request } from "express";
import { CommonRepository, ReqAuth } from "./entity.repository";
import { LoggerService } from "../services/logger.service";
import { CommonEntity } from "./entity";
import { SuccessDto } from "./entity.success.dto";
import { StatusString } from "./entity.enums";
import { toFirstCase } from "./entity.methods";
import { Err, Errors } from "./entity.errors";
import { DataService } from "../../market/data/services/data.service";

export class Service<Entity extends CommonEntity> {

    protected errors: Errors;

    constructor(
        protected entityData: string[],
        protected repository: CommonRepository<Entity>,
        protected readonly req: Request,
        protected logger: LoggerService,
        protected dataService?: DataService
    ) {
        this.errors = new Errors(entityData);
    }

    protected gerError(key: string): HttpException {
        const error = this.errors.get(key);
        return new HttpException(error, error.status);
    }

    async create(entity: DeepPartial<Entity> & CommonEntity, eh?: (err: any) => Error | void): Promise<Entity> {

        try {
            return await this.repository.saveAuth(entity, this.req as ReqAuth);
        } catch (err: any) {
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            if (err.code === "ER_DUP_ENTRY") {
                throw this.gerError(Err.E_409_EXIST);
            }
            this.logger.error(err);
            throw this.gerError(Err.E_500_CREATE);
        }
    }

    async createAlt(entity: DeepPartial<Entity>, eh?: (err: any) => Error | void): Promise<Entity> {

        try {
            return await this.repository.saveAlt(entity);
        } catch (err: any) {
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            if (err.code === "ER_DUP_ENTRY") {
                throw this.gerError(Err.E_409_EXIST);
            }
            this.logger.error(err);
            throw this.gerError(Err.E_500_CREATE);
        }
    }

    async update(id: string, partialEntity: QueryDeepPartialEntity<Entity> & Partial<CommonEntity>, eh?: (err: any) => Error | void): Promise<SuccessDto> {
        if (!id) {
            return Promise.reject(this.gerError(Err.E_400_EMPTY_ID));
        }
        try {
            const updateResult = await this.repository.update(id, partialEntity, this.req as ReqAuth);
            if (updateResult.affected > 0) {
                return new SuccessDto(`${toFirstCase(this.entityData[0])} updated successfully.`);
            }
            return Promise.reject(this.gerError(Err.E_404_ID));
        } catch (err: any) {
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            if (err.code === "ER_DUP_ENTRY") {
                throw this.gerError(Err.E_409_EXIST);
            }
            this.logger.error(err);
            throw this.gerError(Err.E_500_UPDATE);
        }
    }

    changeStatus(id: string, status: boolean): Promise<SuccessDto> {
        return this.update(id, { status, statusString: status ? StatusString.ACTIVE : StatusString.DEACTIVE } as QueryDeepPartialEntity<Entity> & Partial<CommonEntity>);
    }

    activate(id: string): Promise<SuccessDto> {
        return this.changeStatus(id, true);
    }

    deactivate(id: string): Promise<SuccessDto> {
        return this.changeStatus(id, false);
    }

    async getOne(filter: FindConditions<Entity> | string, options?: FindOneOptions<Entity>, eh?: (err: any) => Error | void): Promise<Entity> {
        try {
            const entity = await this.repository.findOne(filter, options);
            if (entity) {
                return entity;
            }
            return Promise.reject(this.gerError(Err.E_404_ID));
        } catch (err: any) {
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            this.logger.error(err);
            throw this.gerError(Err.E_500_RETRIEVE);
        }
    }

    async get(id: string, options?: FindOneOptions<Entity>, eh?: (err: any) => Error | void): Promise<Entity> {
        if (!id) {
            return Promise.reject(this.gerError(Err.E_400_EMPTY_ID));
        }
        return await this.getOne(id, options, eh);
    }

    async getAll(options?: FindManyOptions): Promise<Entity[]> {
        try {
            return await this.repository.find(options);
        } catch (err: any) {
            this.logger.error(err);
            throw this.gerError(Err.E_500_RETRIEVE);
        }
    }

    async delete(id: string, eh?: (err: any) => Error | void): Promise<SuccessDto> {
        try {
            const deleteResult = await this.repository.delete(id);
            if (deleteResult.affected > 0) {
                return new SuccessDto(`${toFirstCase(this.entityData[0])} deleted successfully.`);
            }
            return Promise.reject(this.gerError(Err.E_404_ID));
        } catch (err: any) {
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            this.logger.error(err);
            throw this.gerError(Err.E_500_DELETE);
        }
    }

    async createCode(): Promise<number> {
        if (!this.dataService) {
            throw this.gerError(Err.E_405);
        }
        const value = await this.dataService.get("productCode");
        return isNaN(Number(value)) ? 1001 : Number(value) + 1;
    }

    saveCode(code: number): Promise<boolean> {
        if (!this.dataService) {
            throw this.gerError(Err.E_405);
        }
        return this.dataService.set("productCode", String(code));
    }
}
