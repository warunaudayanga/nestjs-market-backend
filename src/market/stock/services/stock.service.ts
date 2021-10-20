import { Stock } from "../entities/stock.entity";
import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { Service } from "../../../common/entity/entity.service";
import { DeepPartial } from "typeorm";
import { CommonEntity } from "../../../common/entity/entity";
import { StockErrors } from "../dto/stock.errors.dto";
import { StockRepository } from "../repositories/stock.repository";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { SuccessDto } from "../../../common/entity/entity.success.dto";

@Injectable({ scope: Scope.REQUEST })
export class StockService extends Service<Stock> {

    private writeErrorHandler = (err) : Error | void => {
        if (err.errno === 1452) {
            if (err.sqlMessage?.match(/(REFERENCES `auth`)/)) {
                return new HttpException(StockErrors.STOCK_404_PRODUCT, HttpStatus.NOT_FOUND);
            }
        } else if (err.errno === 1062) {
            return new HttpException(StockErrors.STOCK_409_EXIST_PRODUCT_AND_PRICE, HttpStatus.CONFLICT);
        }
    }

    constructor(
        @InjectRepository(StockRepository) private stockRepository: StockRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected logger: LoggerService
    ) {
        super(["stock"], stockRepository, req, logger);
    }

    create(entity: DeepPartial<Stock> & CommonEntity): Promise<Stock> {
        return super.create(entity, this.writeErrorHandler);
    }

    update(id: string, partialEntity: QueryDeepPartialEntity<Stock> & Partial<CommonEntity>): Promise<SuccessDto> {
        return super.update(id, partialEntity, this.writeErrorHandler);
    }

    get(id: string): Promise<Stock> {
        return super.get(id, { loadRelationIds: false });
    }

    getAll(): Promise<Stock[]> {
        return super.getAll({ loadRelationIds: false });
    }

}
