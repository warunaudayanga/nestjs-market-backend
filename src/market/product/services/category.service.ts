import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { Category } from "../entities/category.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { REQUEST } from "@nestjs/core";
import { Service } from "../../../common/entity/entity.service";
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryErrors } from "../dto/category.errors.dto";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { SocketService } from "../../../common/services/socket.service";

@Injectable({ scope: Scope.REQUEST })
export class CategoryService extends Service<Category> {

    private deleteErrorHandler = (err) : Error | void => {
        if (err.errno === 1451 && err.sqlMessage?.match(/(REFERENCES `categories`)/)) {
            return new HttpException(CategoryErrors.CATEGORY_403_CONSTRAINT_PRODUCT, HttpStatus.FORBIDDEN);
        }
    }

    constructor(
        @InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository,
        @Inject(REQUEST) protected readonly req: Request,
        protected socketService: SocketService,
        protected logger: LoggerService
    ) {
        super(["category", "name"], categoryRepository, req, logger, socketService);
    }

    delete(id: string): Promise<SuccessDto> {
        return super.delete(id, this.deleteErrorHandler);
    }

}
