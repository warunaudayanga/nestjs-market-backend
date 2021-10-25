import { EntityRepository, getConnection } from "typeorm";
import { CommonRepository } from "../../../common/entity/entity.repository";
import { Purchase } from "../entities/purchase.entity";

@EntityRepository(Purchase) export class PurchaseRepository extends CommonRepository<Purchase> {
    constructor() {
        super(Purchase, getConnection().createQueryRunner());
    }
}
