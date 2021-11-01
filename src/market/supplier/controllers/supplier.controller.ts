import { Controller, UseGuards, Post, Get, Patch, Body, Query, Scope, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { SupplierService } from "../services/supplier.service";
import { SupplierDto } from "../dto/supplier.dto";
import { Supplier } from "../entities/supplier.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { GetAllDto } from "../../../common/dto/getAllDto";
import { GetAllResponse } from "../../../common/entity/entity.interfaces";

@Controller({ path: "supplier", scope: Scope.REQUEST })
export class SupplierController {

    constructor(private supplierService: SupplierService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN, AuthType.STANDARD)
    @Post("create")
    create(@Body() createSupplierDto: SupplierDto): Promise<Supplier> {
        return this.supplierService.create(new SupplierDto(createSupplierDto));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("update")
    update(@Query("id") id: string, @Body() updateSupplierDto: Partial<SupplierDto>): Promise<SuccessDto> {
        return this.supplierService.update(id, new SupplierDto(updateSupplierDto) as Partial<SupplierDto>);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("activate")
    activate(@Query("id") id: string): Promise<SuccessDto> {
        return this.supplierService.activate(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("deactivate")
    deactivate(@Query("id") id: string): Promise<SuccessDto> {
        return this.supplierService.deactivate(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string, @Query("eager") eager?: boolean): Promise<Supplier> {
        return this.supplierService.get(id, { loadRelationIds: !eager });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Get("getOne")
    getOne(@Body("filter") filter: FindConditions<Supplier>): Promise<Supplier> {
        return this.supplierService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard)
    @Get("getAll")
    getAll(@Query() getAllDto: GetAllDto): Promise<GetAllResponse<Supplier>> {
        return this.supplierService.getAll(getAllDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.supplierService.delete(id);
    }

}
