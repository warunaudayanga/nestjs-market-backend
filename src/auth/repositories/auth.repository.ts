import { EntityRepository } from "typeorm";
import { CommonRepository } from "../../common/entity/entity.repository";
import { Auth } from "../entities/auth.entity";

@EntityRepository(Auth)
export class AuthRepository extends CommonRepository<Auth> {
    constructor() {
        super(Auth);
    }
}
