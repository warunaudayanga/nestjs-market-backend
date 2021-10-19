import { Controller, UseGuards, Post, Get, Patch, Body, Query, Scope } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/dto/success.dto";
import { AccessService } from "../services/access.service";
import { AccessDto } from "../dto/access.dto";
import { Access } from "../entities/access.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";

@Controller({ path: "access", scope: Scope.REQUEST })
export class AccessController {

    constructor(private accessService: AccessService) { }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    create(@Body() accessDto: AccessDto): Promise<Access> {
        return this.accessService.create(new AccessDto(accessDto));
    }

    @UseGuards(JwtAuthGuard)
    @Patch("update")
    update(@Query("id") id: string, @Body() accessDto: AccessDto): Promise<SuccessDto> {
        return this.accessService.update(id, new AccessDto(accessDto));
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string): Promise<Access> {
        return this.accessService.get(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getOne")
    @Roles(AuthType.ADMIN)
    getOne(@Body("filter") filter: FindConditions<Access>): Promise<Access> {
        return this.accessService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get("getAll")
    getAll(): Promise<Access[]> {
        return this.accessService.getAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.accessService.delete(id);
    }

}
