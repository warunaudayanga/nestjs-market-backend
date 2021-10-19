import { HttpException } from "@nestjs/common";
import { Request } from "express";
import { LoggerService } from "./logger.service";
import { CommonRepository, ReqAuth } from "../../market/common/repositories/common.repository";
import { CommonEntity } from "../../market/common/entities/common.entity";
import { DeepPartial, FindConditions } from "typeorm";
import { Errors, Messages } from "../dto/errors.dto";
import { SuccessDto } from "../dto/success.dto";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { StatusString } from "../../market/common/enums/common.enums";

export class Service<Entity extends CommonEntity> {

    protected messages: Messages;

    constructor(
        protected entityName: string,
        private repository: CommonRepository<Entity>,
        protected readonly req: Request,
        protected logger: LoggerService
    ) {
        this.messages = new Messages(entityName);
    }

    private gerError(key: string): HttpException {
        const error = this.messages.get(key);
        return new HttpException(error, error.status);
    }

    async create(entity: DeepPartial<Entity> & CommonEntity, eh?: (err: any) => Error | void): Promise<Entity> {

        try {
            return await this.repository.saveAuth(entity, this.req as ReqAuth);
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw this.gerError(Errors.E_409_EXIST);
            }
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            this.logger.error(err);
            throw this.gerError(Errors.E_500_CREATE);
        }
    }

    async update(id: string, partialEntity: QueryDeepPartialEntity<Entity> & Partial<CommonEntity>, eh?: (err: any) => Error | void): Promise<SuccessDto> {
        if (!id) {
            return Promise.reject(this.gerError(Errors.E_400_EMPTY_ID));
        }
        try {
            const updateResult = await this.repository.update(id, partialEntity, this.req as ReqAuth);
            if (updateResult.affected > 0) {
                return new SuccessDto(`${this.messages.capName} updated successfully.`);
            }
            return Promise.reject(this.gerError(Errors.E_404_ID));
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw this.gerError(Errors.E_409_EXIST);
            }
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            this.logger.error(err);
            throw this.gerError(Errors.E_500_UPDATE);
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

    async getOne(filter: FindConditions<Entity> | string, eh?: (err: any) => Error | void): Promise<Entity> {
        try {
            const entity = await this.repository.findOne(filter);
            if (entity) {
                return entity;
            }
            return Promise.reject(this.gerError(Errors.E_404_ID));
        } catch (err: any) {
            if (eh) {
                const e = eh(err);
                if (e) {
                    throw e;
                }
            }
            this.logger.error(err);
            throw this.gerError(Errors.E_500_RETRIEVE);
        }
    }

    async get(id: string, eh?: (err: any) => Error | void): Promise<Entity> {
        if (!id) {
            return Promise.reject(this.gerError(Errors.E_400_EMPTY_ID));
        }
        return await this.getOne(id, eh);
    }

    async getAll(): Promise<Entity[]> {
        try {
            return await this.repository.find();
        } catch (err: any) {
            this.logger.error(err);
            throw this.gerError(Errors.E_500_RETRIEVE);
        }
    }

    async delete(id: string): Promise<SuccessDto> {
        try {
            const deleteResult = await this.repository.delete(id);
            if (deleteResult.affected > 0) {
                return new SuccessDto(`${this.messages.capName} deleted successfully.`);
            }
            return Promise.reject(this.gerError(Errors.E_404_ID));
        } catch (err: any) {
            this.logger.error(err);
            throw this.gerError(Errors.E_500_DELETE);
        }
    }
}
