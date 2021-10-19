import { HttpException, HttpStatus, Inject, Injectable, Scope } from "@nestjs/common";
import { Category } from "../entities/category.entity";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerService } from "../../../common/services/logger.service";
import { CategoryDto } from "../dto/category.dto";
import { SuccessDto } from "../../../common/dto/success.dto";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { CategoryErrors } from "../dto/category.errors.dto";
import { REQUEST } from "@nestjs/core";
import { CategoryRepository } from "../repositories/category.repository";
import { ReqAuth } from "../../common/repositories/common.repository";

@Injectable({ scope: Scope.REQUEST })
export class CategoryService {

    constructor(
        @InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository,
        @Inject(REQUEST) protected readonly req: Request,
        private logger: LoggerService
    ) {}

    async create(createCategoryDto: CategoryDto): Promise<Category> {
        try {
            return await this.categoryRepository.saveAuth(createCategoryDto, this.req as ReqAuth);
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new HttpException(CategoryErrors.CATEGORY_409_EXIST_NAME, HttpStatus.CONFLICT);
            }
            this.logger.error(err);
            throw new HttpException(CategoryErrors.CATEGORY_500_CREATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: string, updateCategoryDto: Partial<CategoryDto>): Promise<SuccessDto> {
        if (!id) {
            return Promise.reject(new HttpException(CategoryErrors.CATEGORY_400_EMPTY_ID, HttpStatus.NOT_FOUND));
        }
        try {
            const updateResult = await this.categoryRepository.update(id, updateCategoryDto, this.req as ReqAuth);
            if (updateResult.affected > 0) {
                return new SuccessDto("Category updated successfully.");
            }
            return Promise.reject(new HttpException(CategoryErrors.CATEGORY_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            if (err.code === "ER_DUP_ENTRY") {
                throw new HttpException(CategoryErrors.CATEGORY_409_EXIST_NAME, HttpStatus.CONFLICT);
            }
            this.logger.error(err);
            throw new HttpException(CategoryErrors.CATEGORY_500_UPDATE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    changeStatus(id: string, status: boolean): Promise<SuccessDto> {
        return this.update(id, new CategoryDto({ status }));
    }

    activate(id: string): Promise<SuccessDto> {
        return this.changeStatus(id, true);
    }

    // noinspection JSUnusedGlobalSymbols
    deactivate(id: string): Promise<SuccessDto> {
        return this.changeStatus(id, false);
    }

    async get(id: string): Promise<Category> {
        if (!id) {
            return Promise.reject(new HttpException(CategoryErrors.CATEGORY_400_EMPTY_ID, HttpStatus.NOT_FOUND));
        }
        try {
            const category = await this.categoryRepository.findOne(id);
            if (category) {
                return category;
            }
            return Promise.reject(new HttpException(CategoryErrors.CATEGORY_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(CategoryErrors.CATEGORY_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getOne(filter: FindConditions<Category>): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOne(filter);
            if (category) {
                return category;
            }
            return Promise.reject(new HttpException(CategoryErrors.CATEGORY_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(CategoryErrors.CATEGORY_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll(): Promise<Category[]> {
        try {
            return await this.categoryRepository.find();
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(CategoryErrors.CATEGORY_500_RETRIEVE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string): Promise<SuccessDto> {
        try {
            const deleteResult = await this.categoryRepository.delete(id);
            if (deleteResult.affected > 0) {
                return new SuccessDto("Category deleted successfully.");
            }
            return Promise.reject(new HttpException(CategoryErrors.CATEGORY_404_ID, HttpStatus.NOT_FOUND));
        } catch (err: any) {
            this.logger.error(err);
            throw new HttpException(CategoryErrors.CATEGORY_500_DELETE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
