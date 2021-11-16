import { EntityRepository } from "typeorm";
import { CommonRepository } from "../../../common/entity/entity.repository";
import { Path } from "../entities/path.entity";

@EntityRepository(Path) export class PathRepository extends CommonRepository<Path> {
    constructor() {
        super(Path);
    }
}
