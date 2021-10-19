import { EntityRepository } from "typeorm";
import { Position } from "../entities/position.entity";
import { CommonRepository } from "../../common/repositories/common.repository";

@EntityRepository(Position)
export class PositionRepository extends CommonRepository<Position> {}
