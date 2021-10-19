import { EntityRepository } from "typeorm";
import { Category } from "../entities/Category.entity";
import { CommonRepository } from "../../common/repositories/common.repository";

@EntityRepository(Category)
export class CategoryRepository extends CommonRepository<Category> {}
