import { DeepPartial, FindManyOptions, FindOneOptions, ObjectID, Repository, SaveOptions, UpdateResult } from "typeorm";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { omit } from "../../../common/methods/omit";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Request } from "express";
import { Auth } from "../../../auth/entities/auth.entity";
import { CommonEntity } from "../entities/common.entity";

export type ReqAuth = Request & { user: { auth: Auth } }

export class CommonRepository<Entity> extends Repository<Entity> {

    save<T extends DeepPartial<Entity> & CommonEntity>(entity: T, options?: SaveOptions, req?: ReqAuth): Promise<T & Entity> {
        omit(entity);
        entity.createdBy = req.user.auth.id;
        entity.updatedBy = null;
        return super.save(entity, options);
    }

    update(
        criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
        partialEntity: QueryDeepPartialEntity<Entity> & Partial<CommonEntity>,
        req?: ReqAuth
    ): Promise<UpdateResult> {
        omit(partialEntity);
        partialEntity.updatedBy = req.user.auth.id;
        return super.update(criteria, partialEntity);
    }

    find(options?: FindManyOptions): Promise<Entity[]> {
        const opts = options ? options : {};
        opts.loadRelationIds = true;
        return super.find(opts);
    }

    findOne(conditions?: string | number | Date | ObjectID | FindConditions<Entity>, options?: FindOneOptions<Entity>): Promise<Entity | undefined> {
        const opts = options ? options : {};
        opts.loadRelationIds = true;
        return super.findOne(conditions, opts);
    }
}
