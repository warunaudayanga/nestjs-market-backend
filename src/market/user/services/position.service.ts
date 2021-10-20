import { Inject, Injectable, Scope } from "@nestjs/common";
import { Position } from "../entities/position.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Service } from "../../../common/entity/entity.service";
import { PositionRepository } from "../repositories/position.repository";

@Injectable({ scope: Scope.REQUEST })
export class PositionService extends Service<Position>{

    constructor(
        @InjectRepository(PositionRepository) private positionRepository: PositionRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected logger: LoggerService
    ) {
        super(["position", "name"], positionRepository, req, logger);
    }

}
