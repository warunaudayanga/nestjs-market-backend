import { Controller, UseGuards, Post, Get, Patch, Body, Query, Scope, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "../../../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../../auth/guards/roles.guard";
import { SuccessDto } from "../../../common/entity/entity.success.dto";
import { PathService } from "../services/path.service";
import { PathDto } from "../dto/path.dto";
import { Path } from "../entities/path.entity";
import { AuthType } from "../../../auth/enums/auth.enums";
import { Roles } from "../../../auth/decorators/roles.decorator";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { GetAllDto } from "../../../common/dto/getAllDto";
import { GetAllResponse } from "../../../common/entity/entity.interfaces";

@Controller({ path: "access/path", scope: Scope.REQUEST })
export class PathController {

    constructor(private pathService: PathService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Post("create")
    create(@Body() createPathDto: PathDto): Promise<Path> {
        return this.pathService.create(new PathDto(createPathDto));
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("update")
    update(@Query("id") id: string, @Body() updatePathDto: Partial<PathDto>): Promise<SuccessDto> {
        return this.pathService.update(id, new PathDto(updatePathDto) as Partial<PathDto>);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("activate")
    activate(@Query("id") id: string): Promise<SuccessDto> {
        return this.pathService.activate(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Patch("deactivate")
    deactivate(@Query("id") id: string): Promise<SuccessDto> {
        return this.pathService.deactivate(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("get")
    get(@Query("id") id: string): Promise<Path> {
        return this.pathService.get(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Get("getOne")
    getOne(@Body("filter") filter: FindConditions<Path>): Promise<Path> {
        return this.pathService.getOne(filter);
    }

    @UseGuards(JwtAuthGuard)
    @Get("getAll")
    getAll(@Query() getAllDto: GetAllDto): Promise<GetAllResponse<Path>> {
        return this.pathService.getAll(getAllDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(AuthType.ADMIN)
    @Delete("delete")
    delete(@Query("id") id: string): Promise<SuccessDto> {
        return this.pathService.delete(id);
    }

}
