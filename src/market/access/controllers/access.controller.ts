import { Controller, UseGuards, Post, Get, Patch, Body, Query, Scope, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { AccessService } from "../services/access.service";
import { AccessDto } from "../dto/access.dto";
import { Access } from "../entities/access.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { GetAllDto } from "../../../common/dto/getAllDto";
import { GetAllResponse } from "../../../common/entity/entity.interfaces";

@Controller({ path: "access", scope: Scope.REQUEST })
export class AccessController {

    constructor(private accessService: AccessService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Post("create")
    create(@Body() accessDto: AccessDto): Promise<Access> {
        return this.accessService.create(new AccessDto(accessDto));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("update")
    update(@Query("id") id: string, @Body() accessDto: Partial<AccessDto>): Promise<SuccessDto> {
        return this.accessService.update(id, new AccessDto(accessDto));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("activate")
    activate(@Query("id") id: string): Promise<SuccessDto> {
        return this.accessService.activate(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("deactivate")
    deactivate(@Query("id") id: string): Promise<SuccessDto> {
        return this.accessService.deactivate(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string, @Query("eager") eager?: "true" | "false"): Promise<Access> {
        return this.accessService.get(id, { loadRelationIds: eager !== "true" });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getOne")
    @Roles(AuthType.ADMIN)
    getOne(@Body("filter") filter: FindConditions<Access>): Promise<Access> {
        return this.accessService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getAll")
    getAll(@Query() getAllDto: GetAllDto): Promise<GetAllResponse<Access>> {
        return this.accessService.getAll(getAllDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.accessService.delete(id);
    }

}
