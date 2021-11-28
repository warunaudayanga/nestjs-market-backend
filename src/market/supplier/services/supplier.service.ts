import { Inject, Injectable, Scope } from "@nestjs/common";
import { Supplier } from "../entities/supplier.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Service } from "../../../common/entity/entity.service";
import { SupplierRepository } from "../repositories/supplier.repository";
import { DeepPartial } from "typeorm";
import { CommonEntity } from "../../../common/entity/entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { DataService } from "../../data/services/data.service";
import { Err } from "../../../common/entity/entity.errors";
import { SocketService } from "../../../common/services/socket.service";

@Injectable({ scope: Scope.REQUEST })
export class SupplierService extends Service<Supplier> {

    constructor(
        @InjectRepository(SupplierRepository) private supplierRepository: SupplierRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected socketService: SocketService,
        protected logger: LoggerService,
        protected dataService: DataService
    ) {
        super(["supplier"], supplierRepository, req, logger, socketService, dataService);
    }

    async create<T extends DeepPartial<Supplier> & DeepPartial<CommonEntity>>(entity: T): Promise<Supplier> {
        const code = await this.createCode("supplierCode");
        entity.code = code;
        let supplier = await super.create(entity);
        if (supplier && await this.saveCode("supplierCode", code)) {
            return supplier;
        }
        throw this.gerError(Err.E_500_CREATE);
    }

    update(id: string, partialEntity: QueryDeepPartialEntity<Supplier> & Partial<CommonEntity>): Promise<SuccessDto> {
        return super.update(id, partialEntity);
    }

}
