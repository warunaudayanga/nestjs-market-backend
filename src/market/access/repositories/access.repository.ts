import { EntityRepository, getConnection } from "typeorm";
import { CommonRepository } from "../../../common/entity/entity.repository";
import { Access } from "../entities/access.entity";

@EntityRepository(Access) export class AccessRepository extends CommonRepository<Access> {
    constructor() {
        super(Access, getConnection().createQueryRunner());
    }
}
