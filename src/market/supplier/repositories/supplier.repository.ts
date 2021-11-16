import { EntityRepository } from "typeorm";
import { Supplier } from "../entities/supplier.entity";
import { CommonRepository } from "../../../common/entity/entity.repository";

@EntityRepository(Supplier) export class SupplierRepository extends CommonRepository<Supplier> {
    constructor() {
        super(Supplier);
    }
}
