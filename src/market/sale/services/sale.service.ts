import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { Sale } from "../entities/sale.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Service } from "../../../common/entity/entity.service";
import { SaleRepository } from "../repositories/sale.repository";
import { DeepPartial, FindManyOptions, FindOneOptions } from "typeorm";
import { CommonEntity } from "../../../common/entity/entity";
import { SaleErrors } from "../dto/sale.errors.dto";
import { DataService } from "../../data/services/data.service";
import { Err } from "../../../common/entity/entity.errors";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { SaleInvoiceDto } from "../dto/sale-invoice.dto";
import { SaleStockDto } from "../dto/sale-stock.dto";
import { StockService } from "../../stock/services/stock.service";
import { Stock } from "../../stock/entities/stock.entity";
import { returnError } from "../../../common/methods/errors";

@Injectable({ scope: Scope.REQUEST })
export class SaleService extends Service<Sale> {

    private writeErrorHandler = (err) : Error | void => {
        if (err.sqlMessage?.match(/(REFERENCES `stock`)/)) {
            return new HttpException(SaleErrors.SALE_404_PRODUCT, HttpStatus.NOT_FOUND);
        }
    }

    constructor(
        @InjectRepository(SaleRepository) private saleRepository: SaleRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected logger: LoggerService,
        protected dataService: DataService
    ) {
        super(["sale", "code"], saleRepository, req, logger, dataService);
    }

    getInvoiceDto(sales: Sale[]): SaleInvoiceDto {
        const saleStockList = sales.map(sale => new SaleStockDto(sale));
        return new SaleInvoiceDto(sales[0], saleStockList);
    }

    async createInvoice(saleInvoiceDto: SaleInvoiceDto): Promise<SaleInvoiceDto> {
        const code = await this.createCode("saleCode");
        let sales = await this.createBulk(saleInvoiceDto.getSaleList(code));
        if (sales && await this.saveCode("saleCode", code)) {
            return this.getInvoiceDto(sales);
        }
        throw this.gerError(Err.E_500_CREATE);
    }

    async createBulk<T extends DeepPartial<Sale> & DeepPartial<CommonEntity>>(saleList: T[]): Promise<Sale[]> {
        await this.startTransaction();
        try {
            let sales = await super.createBulk(saleList, undefined, this.writeErrorHandler);
            for await (const sale of sales) {
                const id = typeof sale.stock === "string" ? sale.stock : sale.stock.id;
                await this.repository.queryRunner.manager.decrement(Stock, { id }, "qty", sale.qty);
            }
            await this.commitTransaction();
            return sales;
        } catch (err: any) {
            await this.rollbackTransaction();
            const e = StockService.qtyErrorHandler(err);
            if (e) {
                throw e;
            }
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

    changeStatus(): Promise<SuccessDto> {
        throw this.gerError(Err.E_405);
    }

    activate(): Promise<SuccessDto> {
        throw this.gerError(Err.E_405);
    }

    deactivate(): Promise<SuccessDto> {
        throw this.gerError(Err.E_405);
    }

    async getInvoice(code: number, options?: FindOneOptions<Sale>, eh?: (err: any) => (Error | void)): Promise<Partial<SaleInvoiceDto & CommonEntity>> {
        const opts = options ? options : {};
        opts.where = { code };
        let sales = await super.getAll(undefined, opts, eh);
        if (sales.length) {
            return this.getInvoiceDto(sales);
        }
        throw this.gerError(Err.E_404_K);
    }

    async getAllInvoices(options?: FindManyOptions): Promise<(Partial<SaleInvoiceDto & CommonEntity>[])> {
        const opts = options ? options : {};
        opts.order = { code: "ASC" };
        const saleInvoiceDtoList: Partial<SaleInvoiceDto & CommonEntity>[] = [];
        let sales = await super.getAll(undefined, opts);
        const codes: number[] = [];
        sales.forEach(sale => {
            const stockDto = new SaleStockDto(sale);
            if (!codes.includes(sale.code)) {
                saleInvoiceDtoList.push(new SaleInvoiceDto(sale, [stockDto]));
                codes.push(sale.code);
            } else {
                saleInvoiceDtoList.find(s => s.code === sale.code).stocks.push(stockDto);
            }
        });
        return saleInvoiceDtoList;
    }

    deleteInvoice(code: number): Promise<SuccessDto> {
        return super.deleteMany({ code });
    }
}
