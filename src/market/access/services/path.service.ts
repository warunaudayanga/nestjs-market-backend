import { Inject, Injectable, Scope } from "@nestjs/common";
import { Path } from "../entities/path.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { PathRepository } from "../repositories/path.repository";
import { Service } from "../../../common/services/entity.service";

@Injectable({ scope: Scope.REQUEST })
export class PathService extends Service<Path> {

    constructor(
        @InjectRepository(PathRepository) private pathRepository: PathRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected logger: LoggerService
    ) {
        super("path", pathRepository, req, logger);
    }

}
