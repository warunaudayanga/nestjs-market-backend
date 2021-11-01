import { Controller, UseGuards, Post, Get, Patch, Body, Query, Scope, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { CategoryService } from "../services/category.service";
import { CategoryDto } from "../dto/category.dto";
import { Category } from "../entities/category.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { GetAllDto } from "../../../common/dto/getAllDto";
import { GetAllResponse } from "../../../common/entity/entity.interfaces";

@Controller({ path: "product/category", scope: Scope.REQUEST })
export class CategoryController {

    constructor(private categoryService: CategoryService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Post("create")
    create(@Body() createCategoryDto: CategoryDto): Promise<Category> {
        return this.categoryService.create(new CategoryDto(createCategoryDto));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("update")
    update(@Query("id") id: string, @Body() updateCategoryDto: Partial<CategoryDto>): Promise<SuccessDto> {
        return this.categoryService.update(id, new CategoryDto(updateCategoryDto) as Partial<CategoryDto>);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("activate")
    activate(@Query("id") id: string): Promise<SuccessDto> {
        return this.categoryService.activate(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("deactivate")
    deactivate(@Query("id") id: string): Promise<SuccessDto> {
        return this.categoryService.deactivate(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string): Promise<Category> {
        return this.categoryService.get(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Get("getOne")
    getOne(@Body("filter") filter: FindConditions<Category>): Promise<Category> {
        return this.categoryService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard)
    @Get("getAll")
    getAll(@Query() getAllDto: GetAllDto): Promise<GetAllResponse<Category>> {
        return this.categoryService.getAll(getAllDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.categoryService.delete(id);
    }

}
