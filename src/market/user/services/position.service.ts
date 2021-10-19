import { Injectable } from "@nestjs/common";
import { LoggerService } from "../../../common/services/logger.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Position } from "../entities/position.entity";

@Injectable()
export class PositionService {

    constructor(@InjectRepository(Position) private positionRepository: Repository<Position>, private readonly logger: LoggerService) { }

}
