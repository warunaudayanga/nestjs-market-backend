import { DeepPartial, FindManyOptions, FindOneOptions, ObjectID, QueryRunner, Repository, SaveOptions, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { Request } from "express";
import { Auth } from "../../auth/entities/auth.entity";
import { CommonEntity } from "./entity";
import { omit } from "./entity.methods";

export type ReqAuth = Request & { user: { auth: Auth } }

export class CommonRepository<Entity> extends Repository<Entity> {

    public queryRunner: QueryRunner;

    constructor(private EntityTarget) {
        super();
    }

    isTransactional(): boolean {
        return this.queryRunner.isTransactionActive;
    }

    saveAuth<T extends DeepPartial<Entity> & DeepPartial<CommonEntity>>(entity: T, req: ReqAuth, options?: SaveOptions): Promise<Entity> {
        omit(entity);
        entity.createdBy = req.user.auth.id;
        entity.updatedBy = null;
        if (this.isTransactional()) {
            const entityInstance = this.queryRunner.manager.create(this.EntityTarget, entity) as Entity & CommonEntity;
            return this.queryRunner.manager.save(entityInstance, options);
        }
        return super.save(entity, options);
    }

    saveAlt<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<Entity> {
        omit(entity);
        if (this.isTransactional()) {
            const entityInstance = this.queryRunner.manager.create(this.EntityTarget, entity) as Entity & CommonEntity;
            return this.queryRunner.manager.save(entityInstance, options);
        }
        return super.save(entity, options);
    }

    async saveBulk<T extends DeepPartial<Entity> & DeepPartial<CommonEntity>>(entities: T[], req: ReqAuth, options?: SaveOptions): Promise<Entity[]> {
        entities.forEach(entity => {
            omit(entity);
            entity.createdBy = req.user.auth.id;
            entity.updatedBy = null;
        });
        if (this.isTransactional()) {
            const entityInstance = this.queryRunner.manager.create(this.EntityTarget, entities) as (Entity & CommonEntity)[];
            return await this.queryRunner.manager.save(entityInstance, options);
        }
        return super.save(entities, options);
    }

    // noinspection JSUnusedGlobalSymbols
    async saveBulkAlt<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<Entity[]> {
        entities.forEach(entity => omit(entity));
        if (this.isTransactional()) {
            const entityInstance = this.queryRunner.manager.create(this.EntityTarget, entities) as (Entity & CommonEntity)[];
            return await this.queryRunner.manager.save(entityInstance, options);
        }
        return super.save(entities, options);
    }

    update(
        criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
        partialEntity: QueryDeepPartialEntity<Entity> & DeepPartial<CommonEntity>,
        req?: ReqAuth
    ): Promise<UpdateResult> {
        omit(partialEntity);
        if (req) {
            partialEntity.updatedBy = req.user.auth.id;
        }
        if (this.isTransactional()) {
            return this.queryRunner.manager.update(this.EntityTarget, criteria, partialEntity);
        }
        return super.update(criteria, partialEntity);
    }

    decrement(conditions: FindConditions<Entity>, propertyPath: string, value: number | string): Promise<UpdateResult> {
        if (this.isTransactional()) {
            return this.queryRunner.manager.decrement(this.EntityTarget, conditions, propertyPath, value);
        }
        return super.decrement(conditions, propertyPath, value);
    }

    find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
        const opts = options ? options : {};
        if (opts.loadRelationIds === undefined) {
            opts.loadRelationIds = true;
        }
        if (this.isTransactional()) {
            return this.queryRunner.manager.find(this.EntityTarget, opts);
        }
        return super.find(opts);
    }

    findOne(conditions?: string | number | Date | ObjectID | FindConditions<Entity>, options?: FindOneOptions<Entity>): Promise<Entity | undefined> {
        const opts = options ? options : {};
        if (opts.loadRelationIds === undefined) {
            opts.loadRelationIds = true;
        }
        if (this.isTransactional()) {
            return this.queryRunner.manager.findOne(this.EntityTarget, options);
        }
        return super.findOne(conditions, opts);
    }
}
