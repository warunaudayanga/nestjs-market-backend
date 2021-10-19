import { EntityRepository } from "typeorm";
import { User } from "../entities/user.entity";
import { CommonRepository } from "../../common/repositories/common.repository";

@EntityRepository(User)
export class UserRepository extends CommonRepository<User> {}
