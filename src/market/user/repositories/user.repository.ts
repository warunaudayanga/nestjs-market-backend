import { EntityRepository } from "typeorm";
import { CommonRepository } from "../../../common/entity/entity.repository";
import { User } from "../entities/user.entity";

@EntityRepository(User) export class UserRepository extends CommonRepository<User> {
    constructor() {
        super(User);
    }
}
