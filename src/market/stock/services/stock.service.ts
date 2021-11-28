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
import { Purchase } from "../../purchase/entities/purchase.entity";
import { Err } from "../../../common/entity/entity.errors";
import { returnError } from "../../../common/methods/errors";
import { SocketService } from "../../../common/services/socket.service";

@Injectable({ scope: Scope.REQUEST })
export class StockService extends Service<Stock> {

    private writeErrorHandler = (err) : Error | void => {
        if (err.errno === 1452) {
            if (err.sqlMessage?.match(/(REFERENCES `products`)/)) {
                return new HttpException(StockErrors.STOCK_404_PRODUCT, HttpStatus.NOT_FOUND);
            }
        } else if (err.errno === 1062) {
            return new HttpException(StockErrors.STOCK_409_EXIST_PRODUCT_AND_PRICE, HttpStatus.CONFLICT);
        }
    }

    public static qtyErrorHandler = (err) : Error | void => {
        if (err.errno === 1264) {
            if (err.sqlMessage?.match(/(column 'qty')/)) {
                return new HttpException(StockErrors.STOCK_400_OUT_OF_RANGE_QTY, HttpStatus.NOT_FOUND);
            }
        }
    }

    constructor(
        @InjectRepository(StockRepository) private stockRepository: StockRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected socketService: SocketService,
        protected logger: LoggerService
    ) {
        super(["stock"], stockRepository, req, logger, socketService);
    }

    create<T extends DeepPartial<Stock & CommonEntity>>(stock: T): Promise<Stock> {
        return super.create(stock, undefined, this.writeErrorHandler);
    }

    update(id: string, partialEntity: QueryDeepPartialEntity<Stock> & Partial<CommonEntity>): Promise<SuccessDto> {
        return super.update(id, partialEntity, this.writeErrorHandler);
    }

    increase(id: string, qty: number): Promise<SuccessDto> {
        return super.increment({ id }, "qty", qty);
    }

    decrease(id: string, qty: number): Promise<SuccessDto> {
        return super.decrement({ id }, "qty", qty, StockService.qtyErrorHandler);
    }

    async check(product: string, price: number): Promise<boolean> {
        return await super.count({ product, price }) > 0;
    }

    async add(purchase: Purchase): Promise<void> {
        const product = typeof purchase.product === "string" ? purchase.product : purchase.product.id;
        try {
            await super.increment({ product, price: purchase.salePrice }, "qty", purchase.qty);
        } catch (err: any) {
            try {
                await this.create({ product, price: purchase.salePrice, qty: purchase.qty });
            } catch (err: any) {
                if (returnError()) {
                    throw err;
                }
                throw this.gerError(Err.E_500_UPDATE);
            }
        }
    }

}
