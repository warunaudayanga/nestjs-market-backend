import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { Purchase } from "../entities/purchase.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Service } from "../../../common/entity/entity.service";
import { PurchaseRepository } from "../repositories/purchase.repository";
import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";
import { CommonEntity } from "../../../common/entity/entity";
import { PurchaseErrors } from "../dto/purchase.errors.dto";
import { DataService } from "../../data/services/data.service";
import { Err } from "../../../common/entity/entity.errors";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { PurchaseInvoiceDto } from "../dto/purchase-invoice.dto";
import { PurchaseProductDto } from "../dto/purchase-product.dto";
import { Stock } from "../../stock/entities/stock.entity";
import { returnError } from "../../../common/methods/errors";
import { GetAllDto } from "../../../common/dto/getAllDto";
import { paginate, toNumber } from "../../../common/entity/entity.methods";
import { GetAllResponse } from "../../../common/entity/entity.interfaces";
import { SocketService } from "../../../common/services/socket.service";

@Injectable({ scope: Scope.REQUEST })
export class PurchaseService extends Service<Purchase> {

    private writeErrorHandler = (err) : Error | void => {
        if (err.sqlMessage?.match(/(REFERENCES `products`)/)) {
            return new HttpException(PurchaseErrors.PURCHASE_404_PRODUCT, HttpStatus.NOT_FOUND);
        } else if (err.sqlMessage?.match(/(REFERENCES `suppliers`)/)) {
            return new HttpException(PurchaseErrors.PURCHASE_404_SUPPLIER, HttpStatus.NOT_FOUND);
        }
    }

    constructor(
        @InjectRepository(PurchaseRepository) private purchaseRepository: PurchaseRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected socketService: SocketService,
        protected logger: LoggerService,
        protected dataService: DataService
    ) {
        super(["purchase", "code"], purchaseRepository, req, logger, socketService, dataService);
    }

    getInvoiceDto(purchases: Purchase[]): PurchaseInvoiceDto {
        const purchaseProductList = purchases.map(purchase => new PurchaseProductDto(purchase));
        return new PurchaseInvoiceDto(purchases[0], purchaseProductList);
    }

    async createInvoice(purchaseInvoiceDto: PurchaseInvoiceDto): Promise<PurchaseInvoiceDto> {
        const code = await this.createCode("purchaseCode");
        let purchases = await this.createBulk(purchaseInvoiceDto.getPurchaseList(code));
        if (purchases && await this.saveCode("purchaseCode", code)) {
            return this.getInvoiceDto(purchases);
        }
        throw this.gerError(Err.E_500_CREATE);
    }

    async createBulk<T extends DeepPartial<Purchase> & DeepPartial<CommonEntity>>(purchaseList: T[]): Promise<Purchase[]> {
        await this.startTransaction();
        try {
            let purchases = await super.createBulk(purchaseList, undefined, this.writeErrorHandler);
            for await (const purchase of purchases) {
                const product = typeof purchase.product === "string" ? purchase.product : purchase.product.id;
                // await this.stockService.add(purchase as Purchase);
                try {
                    await this.repository.queryRunner.manager.increment(Stock, { product, price: purchase.salePrice }, "qty", purchase.qty);
                } catch (err: any) {
                    await this.repository.queryRunner.manager.create(Stock, { product, price: purchase.salePrice, qty: purchase.qty });
                }
            }
            await this.commitTransaction();
            // TODO: emit()
            return purchases;
        } catch (err: any) {
            await this.rollbackTransaction();
            this.logger.error(err);
            if (returnError()) {
                throw err;
            }
            throw this.gerError(Err.E_500_CREATE);
        }
    }

    update(): Promise<SuccessDto> {
        throw this.gerError(Err.E_405);
    }

    activate(): Promise<SuccessDto> {
        throw this.gerError(Err.E_405);
    }

    deactivate(): Promise<SuccessDto> {
        throw this.gerError(Err.E_405);
    }

    async getInvoice(code: number, options?: FindOneOptions<Purchase>, eh?: (err: any) => (Error | void)): Promise<Partial<PurchaseInvoiceDto & CommonEntity>> {
        const opts = options ? options : {};
        opts.where = { code };
        let purchases = await super.getAll(undefined, opts, eh);
        if (purchases.entities.length) {
            return this.getInvoiceDto(purchases.entities);
        }
        throw this.gerError(Err.E_404_K);
    }

    async getInvoiceList(getAllDto?: GetAllDto): Promise<GetAllResponse<Purchase>> {
        const pagination = paginate(getAllDto);
        const purchases = await this.purchaseRepository
            .createQueryBuilder()
            .groupBy("code")
            .orderBy("code")
            .skip(pagination.skip)
            .take(pagination.take)
            .loadAllRelationIds()
            .getManyAndCount();
        return { entities: purchases[0], total: purchases[1], page: toNumber(getAllDto?.page), limit: toNumber(getAllDto?.limit) };
    }

    async getAllInvoices(options?: FindManyOptions): Promise<(Partial<PurchaseInvoiceDto & CommonEntity>[])> {
        const opts = options ? options : {};
        opts.order = { code: "ASC" };
        const purchaseInvoiceDtoList: Partial<PurchaseInvoiceDto & CommonEntity>[] = [];
        let purchases = await super.getAll(undefined, opts);
        const codes: number[] = [];
        purchases.entities.forEach(purchase => {
            const productDto = new PurchaseProductDto(purchase);
            if (!codes.includes(purchase.code)) {
                purchaseInvoiceDtoList.push(new PurchaseInvoiceDto(purchase, [productDto]));
                codes.push(purchase.code);
            } else {
                purchaseInvoiceDtoList.find(p => p.code === purchase.code).products.push(productDto);
            }
        });
        return purchaseInvoiceDtoList;
    }

    deleteInvoice(code: number): Promise<SuccessDto> {
        return super.deleteMany({ code });
    }
}
