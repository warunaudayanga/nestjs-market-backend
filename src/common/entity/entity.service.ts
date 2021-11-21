import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { DeepPartial, FindConditions, FindManyOptions, FindOneOptions, getConnection, SaveOptions } from "typeorm";
import { HttpException } from "@nestjs/common";
import { Request } from "express";
import { CommonRepository, ReqAuth } from "./entity.repository";
import { LoggerService } from "../services/logger.service";
import { CommonEntity } from "./entity";
import { SuccessDto } from "./entity.success.dto";
import { StatusString } from "./entity.enums";
import { toFirstCase, toNumber } from "./entity.methods";
import { Err, Errors } from "./entity.errors";
import { DataService } from "../../market/data/services/data.service";
import { returnError } from "../methods/errors";
import { GetAllDto } from "../dto/getAllDto";
import { GetAllResponse } from "./entity.interfaces";
import { Auth } from "../../auth/entities/auth.entity";

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

    public gerError(key: string): HttpException {
        const error = this.errors.get(key);
        return new HttpException(error, error.status);
    }

    // noinspection JSUnusedGlobalSymbols
    async startTransaction(): Promise<boolean> {
        try {
            this.repository.transactionalQueryRunner = await getConnection().createQueryRunner();
            await this.repository.transactionalQueryRunner.connect();
            await this.repository.transactionalQueryRunner.startTransaction();
            return true;
        } catch (err: any) {
            return false;
        }
    }

    // noinspection JSUnusedGlobalSymbols
    async commitTransaction(): Promise<boolean> {
        try {
            await this.repository.transactionalQueryRunner.commitTransaction()
                .finally(() => {
                    this.repository.transactionalQueryRunner.release();
                });
            return true;
        } catch (err: any) {
            return false;
        }
    }

    // noinspection JSUnusedGlobalSymbols
    async rollbackTransaction(): Promise<boolean> {
        try {
            await this.repository.transactionalQueryRunner.rollbackTransaction()
                .finally(() => {
                    this.repository.transactionalQueryRunner.release();
                });
            return true;
        } catch (err: any) {
            return false;
        }
    }

    async create<T extends DeepPartial<Entity> & DeepPartial<CommonEntity>>(entity: T, options?: SaveOptions, eh?: (err: any) => Error | void): Promise<Entity> {

        try {
            return await this.repository.saveAuth(entity, this.req as ReqAuth, options);
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
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_CREATE);
        }
    }

    async createAlt<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions, eh?: (err: any) => Error | void): Promise<Entity> {

        try {
            return await this.repository.saveAlt(entity, options);
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
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_CREATE);
        }
    }

    async createBulk<T extends DeepPartial<Entity> & DeepPartial<CommonEntity>>(entities: T[], options?: SaveOptions, eh?: (err: any) => Error | void): Promise<Entity[]> {

        try {
            return await this.repository.saveBulk(entities, this.req as ReqAuth, options);
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
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_CREATE);
        }
    }

    // async createBulkAlt<T extends DeepPartial<Entity> & DeepPartial<CommonEntity>>(entities: T[], options?: SaveOptions, eh?: (err: any) => Error | void): Promise<Entity[]> {
    //
    //     try {
    //         return await this.repository.saveBulkAlt(entities, options);
    //     } catch (err: any) {
    //         if (eh) {
    //             const e = eh(err);
    //             if (e) {
    //                 throw e;
    //             }
    //         }
    //         if (err.code === "ER_DUP_ENTRY") {
    //             throw this.gerError(Err.E_409_EXIST);
    //         }
    //         this.logger.error(err);
    //         throw this.gerError(Err.E_500_CREATE);
    //     }
    // }

    async update(condition: string | FindConditions<Entity>, partialEntity: QueryDeepPartialEntity<Entity> & Partial<CommonEntity>, eh?: (err: any) => Error | void, alt?: boolean): Promise<SuccessDto> {
        if (!condition) {
            return Promise.reject(this.gerError(Err.E_400_EMPTY_ID));
        }
        try {
            const updateResult = await this.repository.update(condition, partialEntity, !alt ? this.req as ReqAuth : undefined);
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
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_UPDATE);
        }
    }

    updateAlt(condition: string | FindConditions<Entity>, partialEntity: QueryDeepPartialEntity<Entity> & Partial<CommonEntity>, eh?: (err: any) => Error | void): Promise<SuccessDto> {
        return this.update(condition, partialEntity, eh, true);
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
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_RETRIEVE);
        }
    }

    async get(id: string, options?: FindOneOptions<Entity>, eh?: (err: any) => Error | void): Promise<Entity> {
        if (!id) {
            return Promise.reject(this.gerError(Err.E_400_EMPTY_ID));
        }
        const entity = await this.getOne(id, options, eh);
        const queryRunner = await getConnection().createQueryRunner();
        if (entity.createdBy) {
            const creator = await queryRunner.manager.findOne(Auth, { where: { id: entity.createdBy } } );
            entity.createdBy = {
                id: creator.id,
                firstName: creator.profile.firstName,
                lastName: creator.profile.lastName
            };
        }
        if (entity.updatedBy) {
            const updater = await queryRunner.manager.findOne(Auth, { where: { id: entity.updatedBy } } );
            entity.updatedBy = {
                id: updater.id,
                firstName: updater.profile.firstName,
                lastName: updater.profile.lastName
            };
        }
        queryRunner.release();
        return entity;
    }

    async getAll(getAllDto?: GetAllDto, options?: FindManyOptions<Entity>, eh?: (err: any) => Error | void): Promise<GetAllResponse<Entity>> {
        const getAllOpts = getAllDto ? new GetAllDto(getAllDto).asOptions() : {};
        const opt = options ? { ...options, ...getAllOpts } : { ...getAllOpts };
        try {
            const entities = await this.repository.find(opt);
            const queryRunner = await getConnection().createQueryRunner();
            for await (const entity of entities) {
                if (entity.createdBy) {
                    const creator = await queryRunner.manager.findOne(Auth, { where: { id: entity.createdBy } } );
                    entity.createdBy = {
                        id: creator.id,
                        firstName: creator.profile.firstName,
                        lastName: creator.profile.lastName
                    };
                }
                if (entity.updatedBy) {
                    const updater = await queryRunner.manager.findOne(Auth, { where: { id: entity.updatedBy } } );
                    entity.updatedBy = {
                        id: updater.id,
                        firstName: updater.profile.firstName,
                        lastName: updater.profile.lastName
                    };
                }
            }
            await queryRunner.release();
            const total = await this.repository.count(options);
            return { entities, total, page: toNumber(getAllDto?.page), limit: toNumber(getAllDto?.limit) };
        } catch (err: any) {
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
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
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_DELETE);
        }
    }

    async deleteMany(condition: number[] | FindConditions<Entity>, eh?: (err: any) => Error | void): Promise<SuccessDto> {
        try {
            const deleteResult = await this.repository.delete(condition);
            if (deleteResult.affected > 0) {
                return new SuccessDto(`${toFirstCase(this.entityData[0])} deleted successfully.`);
            }
            return Promise.reject(this.gerError(Err.E_404_K));
        } catch (err: any) {
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_DELETE);
        }
    }

    async increment(conditions: FindConditions<Entity>, propertyPath: string, value: number | string, eh?: (err: any) => Error | void): Promise<SuccessDto> {
        try {
            const updateResult = await this.repository.increment(conditions, propertyPath, value);
            if (updateResult.affected > 0) {
                return new SuccessDto(`${toFirstCase(this.entityData[0])} ${propertyPath} increased by ${value} successfully.`);
            }
            return Promise.reject(this.gerError(Err.E_404_CONDITION));
        } catch (err: any) {
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_UPDATE);
        }
    }

    async decrement(conditions: FindConditions<Entity>, propertyPath: string, value: number | string, eh?: (err: any) => Error | void): Promise<SuccessDto> {
        try {
            const updateResult = await this.repository.decrement(conditions, propertyPath, value);
            if (updateResult.affected > 0) {
                return new SuccessDto(`${toFirstCase(this.entityData[0])} ${propertyPath} decreased by ${value} successfully.`);
            }
            return Promise.reject(this.gerError(Err.E_404_CONDITION));
        } catch (err: any) {
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_UPDATE);
        }
    }

    async count(options?: FindConditions<Entity>): Promise<number> {
        try {
            return await this.repository.count(options);
        } catch (err: any) {
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_RETRIEVE);
        }
    }

    async createCode(type: string): Promise<number> {
        if (!this.dataService) {
            throw this.gerError(Err.E_405);
        }
        const value = await this.dataService.get(type);
        return isNaN(Number(value)) ? 1001 : Number(value) + 1;
    }

    saveCode(type: string, code: number): Promise<boolean> {
        if (!this.dataService) {
            throw this.gerError(Err.E_405);
        }
        return this.dataService.set(type, String(code));
    }
}
