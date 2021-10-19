import { EntityRepository } from "typeorm";
import { CommonRepository } from "../../common/repositories/common.repository";
import { Access } from "../entities/access.entity";

@EntityRepository(Access)
export class AccessRepository extends CommonRepository<Access> {}
