import { EntityRepository } from "typeorm";
import { CommonRepository } from "../../../common/entity/entity.repository";
import { Position } from "../entities/position.entity";

@EntityRepository(Position)
export class PositionRepository extends CommonRepository<Position> {}
