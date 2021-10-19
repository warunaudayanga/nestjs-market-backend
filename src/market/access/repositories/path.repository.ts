import { EntityRepository } from "typeorm";
import { Path } from "../entities/path.entity";
import { CommonRepository } from "../../common/repositories/common.repository";

@EntityRepository(Path)
export class PathRepository extends CommonRepository<Path> {}
