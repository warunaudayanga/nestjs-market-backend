import { EntityRepository } from "typeorm";
import { Product } from "../entities/product.entity";
import { CommonRepository } from "../../../common/entity/entity.repository";

@EntityRepository(Product) export class ProductRepository extends CommonRepository<Product> {
    constructor() {
        super(Product);
    }
}
