import { EntityRepository } from "typeorm";
import { Product } from "../entities/Product.entity";
import { CommonRepository } from "../../common/repositories/common.repository";

@EntityRepository(Product)
export class ProductRepository extends CommonRepository<Product> {}
