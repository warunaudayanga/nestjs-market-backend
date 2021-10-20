import { EntityRepository } from "typeorm";
import { CommonRepository } from "../../../common/entity/entity.repository";
import { Stock } from "../entities/stock.entity";

@EntityRepository(Stock) export class StockRepository extends CommonRepository<Stock> {}
