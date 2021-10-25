import { EntityRepository, getConnection } from "typeorm";
import { CommonRepository } from "../../../common/entity/entity.repository";
import { Sale } from "../entities/sale.entity";

@EntityRepository(Sale) export class SaleRepository extends CommonRepository<Sale> {
    constructor() {
        super(Sale, getConnection().createQueryRunner());
    }

}
