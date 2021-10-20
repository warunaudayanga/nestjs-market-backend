import { Controller, UseGuards, Post, Get, Patch, Body, Query, Scope, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { ProductService } from "../services/product.service";
import { ProductDto } from "../dto/product.dto";
import { Product } from "../entities/product.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";

@Controller({ path: "product", scope: Scope.REQUEST })
export class ProductController {

    constructor(private productService: ProductService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN, AuthType.STANDARD)
    @Post("create")
    create(@Body() createProductDto: ProductDto): Promise<Product> {
        return this.productService.create(new ProductDto(createProductDto));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("update")
    update(@Query("id") id: string, @Body() updateProductDto: Partial<ProductDto>): Promise<SuccessDto> {
        return this.productService.update(id, new ProductDto(updateProductDto) as Partial<ProductDto>);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("activate")
    activate(@Query("id") id: string): Promise<SuccessDto> {
        return this.productService.activate(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("deactivate")
    deactivate(@Query("id") id: string): Promise<SuccessDto> {
        return this.productService.deactivate(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string): Promise<Product> {
        return this.productService.get(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Get("getOne")
    @Roles(AuthType.ADMIN)
    getOne(@Body("filter") filter: FindConditions<Product>): Promise<Product> {
        return this.productService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard)
    @Get("getAll")
    getAll(): Promise<Product[]> {
        return this.productService.getAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.productService.delete(id);
    }

}
