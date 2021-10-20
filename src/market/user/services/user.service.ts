import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { Service } from "../../../common/entity/entity.service";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { UserRepository } from "../repositories/user.repository";
import { UserErrors } from "../dto/user.errors.dto";
import { DeepPartial } from "typeorm";
import { Err } from "../../../common/entity/entity.errors";

@Injectable({ scope: Scope.REQUEST })
export class UserService extends Service<User>{

    private writeErrorHandler = (err) : Error | void => {
        if (err.sqlMessage?.match(/(REFERENCES `positions`)/)) {
            return new HttpException(UserErrors.USER_404_POSITION, HttpStatus.NOT_FOUND);
        }
    }

    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected logger: LoggerService
    ) {
        super(["user", "nic"], userRepository, req, logger);
    }

    create(): Promise<User> {
        throw this.gerError(Err.E_405);
    }

    createAlt(entity: DeepPartial<User>): Promise<User> {
        return super.createAlt(entity, this.writeErrorHandler);
    }

    changeStatus(): Promise<SuccessDto> {
        throw this.gerError(Err.E_405);
    }

    activate(): Promise<SuccessDto> {
        throw this.gerError(Err.E_405);
    }

    deactivate(): Promise<SuccessDto> {
        throw this.gerError(Err.E_405);
    }
}
