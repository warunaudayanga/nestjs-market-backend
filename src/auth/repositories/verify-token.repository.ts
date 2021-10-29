import { EntityRepository } from "typeorm";
import { CommonRepository } from "../../common/entity/entity.repository";
import { VerifyToken } from "../entities/verify-token.entity";

@EntityRepository(VerifyToken)
export class VerifyTokenRepository extends CommonRepository<VerifyToken> {}
