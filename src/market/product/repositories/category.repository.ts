import { EntityRepository } from "typeorm";
import { Category } from "../entities/category.entity";
import { CommonRepository } from "../../../common/entity/entity.repository";

@EntityRepository(Category)
export class CategoryRepository extends CommonRepository<Category> {}
