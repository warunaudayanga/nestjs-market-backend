import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { Path } from "../entities/path.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Service } from "../../../common/entity/entity.service";
import { PathRepository } from "../repositories/path.repository";
import { PathErrors } from "../dto/path.errors.dto";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { SocketService } from "../../../common/services/socket.service";

@Injectable({ scope: Scope.REQUEST })
export class PathService extends Service<Path> {

    private deleteErrorHandler = (err) : Error | void => {
        if (err.errno === 1451 && err.sqlMessage?.match(/(REFERENCES `access_path`)/)) {
            return new HttpException(PathErrors.PATH_403_CONSTRAINT_ACCESS, HttpStatus.FORBIDDEN);
        }
    }

    constructor(
        @InjectRepository(PathRepository) private pathRepository: PathRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected socketService: SocketService,
        protected logger: LoggerService
    ) {
        super(["path", "path"], pathRepository, req, logger, socketService);
    }

    delete(id: string): Promise<SuccessDto> {
        return super.delete(id, this.deleteErrorHandler);
    }

}
