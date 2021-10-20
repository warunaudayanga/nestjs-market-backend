import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Service } from "../../../common/entity/entity.service";
import { ProductRepository } from "../repositories/product.repository";
import { DeepPartial } from "typeorm";
import { CommonEntity } from "../../../common/entity/entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { ProductErrors } from "../dto/product.errors.dto";
import { DataService } from "../../data/services/data.service";
import { Err } from "../../../common/entity/entity.errors";

@Injectable({ scope: Scope.REQUEST })
export class ProductService extends Service<Product> {

    private writeErrorHandler = (err) : Error | void => {
        if (err.sqlMessage?.match(/(REFERENCES `categories`)/)) {
            return new HttpException(ProductErrors.PRODUCT_404_CATEGORY, HttpStatus.NOT_FOUND);
        }
    }

    constructor(
        @InjectRepository(ProductRepository) private productRepository: ProductRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected logger: LoggerService,
        protected dataService: DataService
    ) {
        super(["product", "code"], productRepository, req, logger, dataService);
    }

    async create(entity: DeepPartial<Product> & CommonEntity): Promise<Product> {
        const code = await this.createCode();
        entity.code = code;
        let product = await super.create(entity, this.writeErrorHandler);
        if (product && await this.saveCode(code)) {
            return product;
        }
        throw new HttpException(this.errors.get(Err.E_500_CREATE), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    update(id: string, partialEntity: QueryDeepPartialEntity<Product> & Partial<CommonEntity>): Promise<SuccessDto> {
        return super.update(id, partialEntity, this.writeErrorHandler);
    }

    get(id: string): Promise<Product> {
        return super.get(id, { loadRelationIds: false });
    }

    getAll(): Promise<Product[]> {
        return super.getAll({ loadRelationIds: false });
    }

}
